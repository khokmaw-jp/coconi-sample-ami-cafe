import Image from "next/image";
import { ContactForm } from "./components/ContactForm";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { TitleLines } from "./components/TitleLines";
import { faqs, menuItems, ways } from "./data/siteContent";
import { images, siteConfig } from "./siteConfig";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero">
          <Image
            className="hero-image"
            src={images.heroImage}
            alt="自然光が入るAmi Cafeの店内"
            fill
            sizes="100vw"
            priority
            />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">New open soon</p>
            <TitleLines as="h1" lines={["自然光が差し込む", "柔らかな空間で"]} />
            <p>
              本を読む時間も、誰かと話す時間も、ひとりでほっとする時間も。
              {siteConfig.shopName}は、それぞれの過ごし方を大切にする小さなカフェです。
            </p>
            <div className="button-row">
              <a className="button primary" href="#stay">
                過ごし方を見る
              </a>
              <a className="button secondary" href="#contact">
                お問い合わせする
              </a>
            </div>
          </div>
        </section>

        <section id="concept" className="section two-column">
          <div>
            <p className="eyebrow">Concept</p>
            <TitleLines lines={["ふわっと立ち寄れて", "自然体でいられる場所"]} />
            <p>
              Ami Cafeが大切にしたいのは、毎日の中にある小さな休憩です。
              木のぬくもりと白を基調に、淡いグリーンを添えた落ち着いた空間で、
              読書や会話、静かな打ち合わせをゆっくり楽しめる場所を目指します。
            </p>
            <a className="text-link" href="#contact">
              オープン準備について問い合わせる
            </a>
          </div>
          <Image
            className="rounded-image"
            src={images.conceptImage}
            alt="本とコーヒーが置かれた自然光のテーブル"
            width={900}
            height={650}
            sizes="(min-width: 900px) 44vw, 100vw"
          />
        </section>

        <section id="stay" className="section soft-band">
          <div className="section-heading">
            <p className="eyebrow">How to stay</p>
            <TitleLines lines={["その日の気分に合わせて", "過ごしてください"]} />
          </div>
          <div className="way-grid">
            {ways.map((way) => (
              <article className="small-card" key={way.title}>
                <h3>{way.title}</h3>
                <p>{way.text}</p>
              </article>
            ))}
          </div>
          <div className="center-cta">
            <a className="button primary" href="#space">
              店内の雰囲気を見る
            </a>
          </div>
        </section>

        <section id="space" className="section media-section">
          <div className="section-heading">
            <p className="eyebrow">Space</p>
            <TitleLines lines={["窓際席、会話の席", "小さな集まりの席"]} />
            <p>
              一人でも、数人でも使いやすいレイアウトを準備中です。
              席の間隔や通路にも余白を持たせ、初めての方にも入りやすい空気感を大切にします。
            </p>
          </div>
          <div className="image-grid">
            <Image
              src={images.cafeSpaceImage}
              alt="窓際席と少人数用テーブルがある明るいカフェ空間"
              width={960}
              height={680}
              sizes="(min-width: 900px) 58vw, 100vw"
            />
            <Image
              src={images.readingSeatImage}
              alt="本とコーヒーを置いた静かな窓際の一人席"
              width={680}
              height={680}
              sizes="(min-width: 900px) 34vw, 100vw"
            />
          </div>
          <div className="center-cta">
            <a className="button secondary" href="#contact">
              来店について相談する
            </a>
          </div>
        </section>

        <section id="menu" className="section two-column reverse">
          <div>
            <p className="eyebrow">Menu</p>
            <TitleLines lines={["いつもの一杯と", "少しうれしい焼き菓子"]} />
            <p>
              メニューは、コーヒー・カフェラテ・紅茶・焼き菓子を中心に準備しています。
              派手さよりも、また飲みたくなるやさしい味わいを大切にします。
            </p>
            <div className="menu-list">
              {menuItems.map(([name, text]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <a className="button primary" href="#contact">
              メニューを見る
            </a>
          </div>
          <Image
            className="rounded-image"
            src={images.menuImage}
            alt="コーヒーとハーブティーと焼き菓子を並べたメニュー"
            width={900}
            height={650}
            sizes="(min-width: 900px) 44vw, 100vw"
          />
        </section>

        <section className="section latte-band">
          <div className="latte-copy">
            <p className="eyebrow">Latte art</p>
            <h2>カップの上に、少しだけ気持ちがほどける時間を</h2>
            <p>
              ラテアートは、写真のためだけではなく、手に取った瞬間が少しやわらかくなるように。
              ひとつずつ丁寧にお作りします。
            </p>
            <a className="text-link" href="#contact">
              ラテやメニューについて聞いてみる
            </a>
          </div>
        </section>

        <section className="section two-column" id="workshop">
          <Image
            className="rounded-image"
            src={images.workshopImage}
            alt="読書会やワークショップに使える小さなテーブル席"
            width={900}
            height={650}
            sizes="(min-width: 900px) 44vw, 100vw"
          />
          <div>
            <p className="eyebrow">Small gathering</p>
            <TitleLines lines={["読書会やワークショップも", "小さく心地よく"]} />
            <p>
              少人数の集まり、静かな打ち合わせ、近い距離で話せるワークショップなど、
              カフェの空気に合う使い方を一緒に考えます。
            </p>
            <a className="button primary" href="#contact">
              小さな集まりについて相談する
            </a>
          </div>
        </section>

        <section id="access" className="section access-section">
          <div>
            <p className="eyebrow">Access</p>
            <h2>オープンに向けて準備中です</h2>
            <dl className="info-list">
              <div>
                <dt>住所</dt>
                <dd>{siteConfig.address}</dd>
              </div>
              <div>
                <dt>アクセス</dt>
                <dd>{siteConfig.access}</dd>
              </div>
              <div>
                <dt>営業時間</dt>
                <dd>{siteConfig.hours}</dd>
              </div>
              <div>
                <dt>定休日</dt>
                <dd>{siteConfig.closed}</dd>
              </div>
            </dl>
          </div>
          <div className="map-placeholder" aria-label="地図の仮表示">
            <span>Map</span>
            <p>正式な住所が決まり次第、地図を掲載します。</p>
          </div>
        </section>

        <section className="section soft-band" id="faq">
          <div className="section-heading">
            <p className="eyebrow">Q&A</p>
            <h2>よくあるご質問</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>来店前のご質問や、小さな集まりのご相談はこちらから</h2>
            <p>
              オープン前の確認、メニューのこと、読書会やワークショップ利用など、
              気になることがあればお気軽にお送りください。
            </p>
          </div>
          <ContactForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
