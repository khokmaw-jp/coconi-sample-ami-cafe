import Image from "next/image";
import Link from "next/link";
import { navItems } from "../data/siteContent";
import { siteConfig } from "../siteConfig";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label={`${siteConfig.shopName}のトップへ`}>
        <Image
          src="/images/common/logo-main.svg"
          alt="Ami Cafe"
          width={220}
          height={64}
          priority
        />
      </Link>
      <nav className="desktop-nav" aria-label="主要ナビゲーション">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <details className="mobile-nav">
        <summary aria-label="メニューを開閉する">
          <span />
          <span />
          <span />
        </summary>
        <div>
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
      </details>
    </header>
  );
}
