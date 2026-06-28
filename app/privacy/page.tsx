import Link from "next/link";
import { siteConfig } from "../siteConfig";

export const metadata = {
  title: `プライバシーポリシー | ${siteConfig.shopName}`,
  description: `${siteConfig.shopName}のお問い合わせフォームに関する個人情報の取り扱いについて。`
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <Link className="back-link" href="/">
        トップページへ戻る
      </Link>
      <h1>プライバシーポリシー</h1>
      <p>
        {siteConfig.shopName}
        は、お問い合わせを通じてお預かりする個人情報を、適切に取り扱います。
      </p>

      <section>
        <h2>利用目的</h2>
        <p>
          入力いただいたお名前、メールアドレス、電話番号、お問い合わせ内容は、
          お問い合わせへの回答、自動返信メールの送信、来店や小さな集まりに関する連絡のために利用します。
        </p>
      </section>

      <section>
        <h2>第三者提供</h2>
        <p>
          法令に基づく場合を除き、ご本人の同意なく個人情報を第三者へ提供することはありません。
        </p>
      </section>

      <section>
        <h2>スパム対策</h2>
        <p>
          お問い合わせフォームでは、迷惑送信を防ぐためCloudflare Turnstileを使用します。
          Turnstileの利用により、送信時の検証情報がCloudflareへ送信される場合があります。
        </p>
      </section>

      <section>
        <h2>お問い合わせ</h2>
        <p>
          個人情報の取り扱いに関するご質問は、トップページのお問い合わせフォームよりご連絡ください。
        </p>
      </section>
    </main>
  );
}
