import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../siteConfig";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Image src="/images/common/logo-main.svg" alt="Ami Cafe" width={180} height={52} />
      <p>{siteConfig.description}</p>
      <nav aria-label="フッターナビゲーション">
        <Link href="/privacy">プライバシーポリシー</Link>
        <a href="#contact">お問い合わせ</a>
      </nav>
      <small>&copy; {new Date().getFullYear()} {siteConfig.shopName}</small>
    </footer>
  );
}
