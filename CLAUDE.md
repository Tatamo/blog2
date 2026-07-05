# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

Docusaurus 3 で構築された日本語の個人ブログ「わたしろぐ2」。docs 機能を無効化したブログ専用構成で、ブログ一覧がサイトルート（`routeBasePath: '/'`）に置かれている。GitHub Pages（https://tatamo.github.io/blog2/ ）で公開している。

## コマンド

```bash
npm run start      # 開発サーバー起動（ホットリロード付き）
npm run build      # 本番ビルド（build/ に出力）
npm run serve      # ビルド結果をローカルで配信
npm run typecheck  # TypeScript の型チェック
USE_SSH=true npm run deploy  # ビルドして gh-pages ブランチに push（公開）
```

- テストはない。変更の検証は `npm run build` で行う。`onBrokenLinks: 'throw'` 設定なのでリンク切れはビルドエラーになる。
- 検証のためにビルドした場合、`build/` は残さず削除してよい（gitignore 済み）。

## 記事の書き方・運用ルール

- 記事は `blog/*.mdx`。frontmatter には **`date` を時刻・タイムゾーン付きで必ず書く**（例: `date: 2026-07-05T18:58:56+09:00`）。同日複数記事の並び順を保証するための運用ルール。記事は date の降順で並ぶ。
- **`authors` は書かない**。一人で執筆するブログなので著者表示は意図的に削除済み（`blog/authors.yml` も存在しない）。
- タグは `blog/tags.yml` に定義してから使う（`onInlineTags: 'warn'`）。
- 一覧ページでの表示を区切る位置に `{/* truncate */}` を入れる。
- 記事ではない単発ページ（About など）は `src/pages/` に置く。

## 意図的な設定（元に戻さない）

`docusaurus.config.ts` の以下はデザイン上の決定事項:

- ライトテーマのみ（`disableSwitch: true`、切り替え UI なし、dark 用 CSS も削除済み）
- 記事ページに目次（toc）は表示しない（swizzle した `src/theme/BlogLayout/` が意図的に描画していない）
- 読了時間の表示なし（`showReadingTime: false`）
- 1ページあたり5記事（`postsPerPage: 5`）
- トップページと RSS/Atom フィードのタイトルはサイト名「わたしろぐ2」に統一（`blogTitle` と `feedOptions.title`。Docusaurus はページタイトル == サイト名のとき重複表示しない仕様を利用）
- ロゴ・favicon・OGP 画像は置いていない（`static/img/` ごと削除済み）

## デプロイ・git に関する注意

- `static/.nojekyll` は GitHub Pages に必須。消さないこと。
- `baseUrl: '/blog2/'` はプロジェクトページ配信のため。独自ドメインのルートに移す場合は `url` とセットで変更し、`static/CNAME` を追加する。
