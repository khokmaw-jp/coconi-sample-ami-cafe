"use client";

import Link from "next/link";
import Script from "next/script";
import { FormEvent, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const inquiryTypes = [
  "来店について",
  "メニューについて",
  "小さな集まり・ワークショップ利用について",
  "取材・その他",
  "その他"
];

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [widgetId, setWidgetId] = useState<string>();
  const turnstileRef = useRef<HTMLDivElement>(null);

  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADm5EjAnZ67rwcRT";

  const renderTurnstile = () => {
    if (!turnstileRef.current || !window.turnstile || widgetId) {
      return;
    }

    const id = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken("")
    });
    setWidgetId(id);
  };

  const resetTurnstile = () => {
    setTurnstileToken("");
    window.turnstile?.reset(widgetId);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("privacyConsent")) {
      setState("error");
      setMessage("プライバシーポリシーに同意のうえ送信してください。");
      return;
    }

    if (!turnstileToken) {
      setState("error");
      setMessage(
        "確認に失敗しました。お手数ですが、ページを再読み込みしてもう一度送信してください。"
      );
      return;
    }

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...payload,
          turnstileToken,
          sourcePage: window.location.href
        })
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message);
      }

      setState("success");
      setMessage("お問い合わせを受け付けました。控えのメールをご確認ください。");
      form.reset();
      resetTurnstile();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "送信できませんでした。時間をおいてもう一度お試しください。"
      );
      resetTurnstile();
    }
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <div className="form-grid">
          <label>
            <span>お名前</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            <span>メールアドレス</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>電話番号</span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            <span>お問い合わせ種別</span>
            <select name="inquiryType" required defaultValue="">
              <option value="" disabled>
                選択してください
              </option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          <span>お問い合わせ内容</span>
          <textarea name="message" rows={7} required />
        </label>

        <p className="privacy-note">
          入力いただいた情報は、お問い合わせ対応と自動返信メールの送信に利用します。
          第三者へ無断で提供することはありません。スパム対策としてCloudflare
          Turnstileを使用しています。詳しくは
          <Link href="/privacy">プライバシーポリシー</Link>
          をご確認ください。
        </p>

        <label className="check-field">
          <input name="privacyConsent" type="checkbox" required />
          <span>
            <Link href="/privacy">プライバシーポリシー</Link>
            に同意します
          </span>
        </label>

        <div
          ref={turnstileRef}
          className="turnstile-box"
          role="group"
          aria-label="Cloudflare Turnstileによる確認"
        />

        {message ? (
          <p className={`form-message ${state}`} role="status" aria-live="polite">
            {message}
          </p>
        ) : null}

        <button className="button primary form-button" disabled={state === "sending"}>
          {state === "sending" ? "送信中です" : "お問い合わせする"}
        </button>
      </form>
    </>
  );
}
