# coconi sample Ami Cafe

`coconi by Khokmaw` のカフェ向けホームページ提案用サンプルLPです。

ブランドメッセージは「いつもあなたのそばに。」です。このサイトは、coconiがお客様へご提案するカフェ向けホームページの雰囲気、導線、問い合わせフォームの実装例を確認するためのサンプルとして運用します。

## 運用方針

- GitHubリポジトリを正本として管理します。
- `main` ブランチへのpushをVercelの自動デプロイ対象にします。
- Vercelプロジェクトは既存の `ami-cafe-lp` を継続利用します。
- 公開URLは `https://sample-cafe.coconi.khok-maw.com` を最終URLとします。
- サンプルLPのため、ニュース、メニュー、イベント、Q&A、店舗写真、営業時間は現時点では固定データで管理します。

## GitHub

- Organization: `khokmaw-jp`
- Repository: `coconi-sample-ami-cafe`
- Visibility: Private
- Default branch: `main`

## Vercel自動デプロイ

このリポジトリをVercelプロジェクトへ接続し、以後は次の流れで公開します。

```txt
GitHub main へ push
↓
Vercel が自動ビルド
↓
Production へ反映
```

## ディレクトリ構成

```txt
app/
  api/contact/route.ts        お問い合わせAPI
  components/                 共通コンポーネント
  data/siteContent.ts         LP内の固定表示データ
  privacy/page.tsx            プライバシーポリシー
  globals.css                 全体スタイル
  layout.tsx                  SEO・OGPなどのメタデータ
  page.tsx                    トップページ
  siteConfig.ts               店舗名・ブランド・画像パスなどの設定
public/
  images/                     サイト画像
  favicon.svg                 favicon
```

## 開発手順

```bash
npm install
npm run dev
```

ローカル確認:

```txt
http://localhost:3000
```

品質確認:

```bash
npm run lint
npm run typecheck
npm run build
```

## 環境変数

`.env.example` を参照して、Vercel側に必要な環境変数を設定します。

```txt
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
CONTACT_REPLY_TO=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

`.env`、`.env.*`、`.vercel` はGit管理しません。

## デプロイ手順

1. GitHubの `main` ブランチへ変更をpushします。
2. VercelのGit連携により自動でビルドが実行されます。
3. VercelのDeploymentsでビルド成功を確認します。
4. 本番URLで表示確認を行います。

## Cloudflare DNS

最終公開URL:

```txt
sample-cafe.coconi.khok-maw.com
```

Cloudflareでは `DNS only` で以下のCNAMEを設定します。

```txt
Type: CNAME
Name: sample-cafe.coconi
Target: cname.vercel-dns.com
Proxy status: DNS only
TTL: Auto
```

Cloudflareのゾーンが `khok-maw.com` の場合、`Name` は `sample-cafe.coconi` です。ゾーンを `coconi.khok-maw.com` として管理している場合は、`Name` を `sample-cafe` にしてください。
