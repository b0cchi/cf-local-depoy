# Cloudflare Local Deploy - サンプルプロジェクト

ℹ️ **このプロジェクトについて**

このプロジェクトは、Next.jsアプリケーションをCloudflare Workersにデプロイするサンプルプロジェクトです。

> **⚠️ 注意：このプロジェクトはローカルからの直接デプロイメント方式を使用しています。本番環境では、GitHub等のCI/CDパイプラインとの連携を強く推奨します。**

## ⚡ デプロイ方式について

### 現在の方式（ローカルからのデプロイ）

このプロジェクトで使用している `npm run deploy` コマンドは、ローカルマシンから直接Cloudflareにデプロイします。

**ローカルデプロイのリスク：**

- 環境変数がビルド時にバンドルされ、成果物に含まれる可能性がある
- デプロイを実行した人のマシン環境に依存する
- デプロイプロセスが記録されにくい
- アクセス制御が難しい

### 推奨方式（GitHub/GitLabとの連携）

**本番環境では、GitHub ActionsなどのCI/CDパイプラインでのデプロイを強く推奨します：**

**CI/CDパイプラインのメリット：**

- ✅ 環境変数をシークレットとして厳密に管理
- ✅ デプロイプロセスが記録される（監査トレイル）
- ✅ デプロイの自動化と品質保証
- ✅ アクセス制御とロールベースの権限管理
- ✅ 本番環境との環境分離

## プロジェクト構成

- **Next.js 16** - フロントエンド
- **OpenNext** - Next.jsアプリケーションをCloudflare Workers互換の形式にビルド
- **Wrangler** - Cloudflare Workers用CLI
- **Tailwind CSS** - スタイリング

## 環境構成

| 変数名       | 用途             | 設定場所                   | 注意           |
| ------------ | ---------------- | -------------------------- | -------------- |
| `SECRET_KEY` | デモ用の秘密キー | `.env.local` / `.dev.vars` | ローカル開発用 |
| `NEXTJS_ENV` | Next.js環境      | `.dev.vars`                | ローカル開発用 |

## コマンド一覧

### ローカル開発

```bash
npm run dev
```

Next.js開発サーバーを起動します。 [http://localhost:3000](http://localhost:3000) でアクセス可能です。

### ビルド

```bash
npm run build
```

本番用にプロジェクトをビルドします。

### プレビュー

```bash
npm run preview
```

Cloudflareランタイムでアプリケーションをローカルでプレビューします。

### デプロイ（ローカルから）

```bash
npm run deploy
```

⚠️ ローカルマシンからCloudflareに直接デプロイします。本番環境ではCI/CDの使用を推奨します。

### 型生成

```bash
npm run cf-typegen
```

Cloudflare環境の型定義ファイルを生成します。

## 実装例

トップページ (`src/app/page.tsx`) では、環境変数の値を表示しています：

```tsx
const secretKey = process.env.SECRET_KEY || 'SECRET_KEYが設定されていません';
```

## 本番環境でのベストプラクティス

### 推奨される構成

1. **GitHub/GitLab上でのコード管理**
   - リポジトリにコードをプッシュ

2. **CI/CDパイプラインの構築**
   - GitHub ActionsやGitLab CIを使用
   - 自動テストの実行
   - Cloudflareへの自動デプロイ

3. **Cloudflareでのシークレット管理**

   ```bash
   # Cloudflare DashboardまたはWrangler CLIでシークレットを設定
   wrangler secret put SECRET_KEY --env production
   ```

4. **環境ファイルの管理**
   `.gitignore` に以下を追加：
   ```
   .env.local
   .dev.vars
   .env*.local
   *.secret
   ```

### ローカルデプロイを使う場合の注意事項

もしローカルからのデプロイが必要な場合：

- 環境変数の値は本番環境用の安全な値に置き換える
- デプロイ前に `.env.local` を確認する
- 重要な機密情報は含めない
- デプロイ後、コンソールで成果物を検査する

## ディレクトリ構造

```
local-deploy/
├── src/
│   └── app/
│       ├── layout.tsx      # ルートレイアウト
│       ├── page.tsx        # トップページ
│       └── globals.css     # グローバルスタイル
├── public/
│   └── _headers            # Cloudflareの設定
├── .dev.vars               # Wrangler開発環境変数（.gitignoreに追加）
├── .env.local              # Next.js開発環境変数（.gitignoreに追加）
├── wrangler.jsonc          # Wrangler設定
├── next.config.ts          # Next.js設定
└── open-next.config.ts     # OpenNext設定
```

## 参考リンク

- [Next.js 環境変数](https://nextjs.org/docs/basic-features/environment-variables)
- [Cloudflare Workers - Secrets](https://developers.cloudflare.com/workers/platform/environment-variables/)
- [GitHub Actions で Cloudflare にデプロイ](https://developers.cloudflare.com/workers/platform/ci-cd/)
- [OpenNext Documentation](https://open-next.js.org/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

---

**作成日:** 2026年1月27日 | **サンプルプロジェクト：** ローカルからのデプロイメント方式を実証（本番環境ではCI/CD推奨）
npm run cf-typegen

````

Cloudflare環境の型定義ファイルを生成します。

## 実装例

トップページ (`src/app/page.tsx`) では、環境変数の値をクライアント側で表示しています：

```tsx
const secretKey = process.env.SECRET_KEY || 'SECRET_KEYが設定されていません';
````

## 本番環境での推奨事項

**実際の本番環境では、以下の対策を講じてください：**

### 1. 機密情報をクライアントに含めない

```tsx
// ❌ 悪い例：クライアントに機密情報が含まれる
const apiKey = process.env.API_KEY;

// ✅ 良い例：サーバーサイドのみで使用
// API呼び出しはサーバーアクションで実行
```

### 2. Cloudflare Secretsを使用

Wrangler CLIでSecretを設定：

```bash
wrangler secret put SECRET_KEY
```

### 3. 環境ファイルの適切な管理

`.gitignore` に以下を追加：

```
.env.local
.dev.vars
.env*.local
```

### 4. Cloudflare Workers KVストレージの活用

機密情報をKVストレージで管理し、ランタイムに取得します。

## ディレクトリ構造

```
local-deploy/
├── src/
│   └── app/
│       ├── layout.tsx      # ルートレイアウト
│       ├── page.tsx        # トップページ（SECRET_KEYを表示）
│       └── globals.css     # グローバルスタイル
├── public/
│   └── _headers            # Cloudflareの設定
├── .dev.vars               # Wrangler開発環境変数
├── .env.local              # Next.js開発環境変数
├── wrangler.jsonc          # Wrangler設定
├── next.config.ts          # Next.js設定
└── open-next.config.ts     # OpenNext設定
```

## 参考リンク

- [Next.js 環境変数](https://nextjs.org/docs/basic-features/environment-variables)
- [Cloudflare Workers - Secrets](https://developers.cloudflare.com/workers/platform/environment-variables/)
- [OpenNext Documentation](https://open-next.js.org/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

---

**作成日:** 2026年1月27日 | **目的:** Cloudflare環境変数とビルド成果物の関係を実証するサンプルプロジェクト
