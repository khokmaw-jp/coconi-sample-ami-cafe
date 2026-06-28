import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "../../siteConfig";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
  privacyConsent?: string;
  turnstileToken?: string;
  sourcePage?: string;
};

type TurnstileResult = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
};

const turnstileFailMessage =
  "確認に失敗しました。お手数ですが、ページを再読み込みしてもう一度送信してください。";

function requiredString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function validatePayload(payload: ContactPayload) {
  if (
    !requiredString(payload.name) ||
    !requiredString(payload.email) ||
    !requiredString(payload.inquiryType) ||
    !requiredString(payload.message) ||
    !requiredString(payload.turnstileToken) ||
    !payload.privacyConsent
  ) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email ?? "");
}

async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return {
      success: false,
      "error-codes": ["missing-input-secret"]
    } satisfies TurnstileResult;
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData
    }
  );

  return (await response.json()) as TurnstileResult;
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });
}

function createAdminText(payload: Required<ContactPayload>, result: TurnstileResult) {
  return [
    "Ami Cafeサイトからお問い合わせがありました。",
    "",
    `お名前: ${payload.name}`,
    `メールアドレス: ${payload.email}`,
    `電話番号: ${payload.phone || "未入力"}`,
    `お問い合わせ種別: ${payload.inquiryType}`,
    `お問い合わせ内容:`,
    payload.message,
    "",
    `送信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
    `送信元ページ: ${payload.sourcePage}`,
    `Turnstile検証結果: ${JSON.stringify(result)}`
  ].join("\n");
}

function createAutoReplyText(payload: Required<ContactPayload>) {
  return [
    `${payload.name} 様`,
    "",
    "Ami Cafeへお問い合わせいただき、ありがとうございます。",
    "内容を確認のうえ、担当者より返信いたします。",
    "返信の目安は通常2-3営業日以内です。",
    "",
    "以下、お問い合わせ内容の控えです。",
    "",
    `お名前: ${payload.name}`,
    `メールアドレス: ${payload.email}`,
    `電話番号: ${payload.phone || "未入力"}`,
    `お問い合わせ種別: ${payload.inquiryType}`,
    `お問い合わせ内容:`,
    payload.message,
    "",
    "Ami Cafe",
    "このメールは自動送信です。"
  ].join("\n");
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  if (!validatePayload(payload)) {
    return NextResponse.json(
      { message: "入力内容をご確認ください。" },
      { status: 400 }
    );
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for");
  const turnstileResult = await verifyTurnstile(payload.turnstileToken as string, ip);

  if (!turnstileResult.success) {
    return NextResponse.json({ message: turnstileFailMessage }, { status: 400 });
  }

  const transporter = createTransporter();
  if (!transporter) {
    return NextResponse.json(
      { message: "メール送信設定が未完了です。" },
      { status: 503 }
    );
  }

  const normalizedPayload: Required<ContactPayload> = {
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim() ?? "",
    phone: payload.phone?.trim() ?? "",
    inquiryType: payload.inquiryType?.trim() ?? "",
    message: payload.message?.trim() ?? "",
    privacyConsent: payload.privacyConsent ?? "",
    turnstileToken: payload.turnstileToken ?? "",
    sourcePage: payload.sourcePage ?? "不明"
  };

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  const replyTo = process.env.CONTACT_REPLY_TO || normalizedPayload.email;

  if (!from) {
    return NextResponse.json(
      { message: "メール差出人設定が未完了です。" },
      { status: 503 }
    );
  }

  await transporter.sendMail({
    to,
    from,
    replyTo,
    subject: `【${siteConfig.shopName}】お問い合わせ: ${normalizedPayload.inquiryType}`,
    text: createAdminText(normalizedPayload, turnstileResult)
  });

  await transporter.sendMail({
    to: normalizedPayload.email,
    from,
    replyTo: process.env.CONTACT_REPLY_TO || to,
    subject: `【${siteConfig.shopName}】お問い合わせを受け付けました`,
    text: createAutoReplyText(normalizedPayload)
  });

  return NextResponse.json({ ok: true });
}
