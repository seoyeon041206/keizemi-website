# KEIZEMI コンテンツ編集ガイド

このサイトでは、デザイン・レイアウトと更新コンテンツを分離しています。将来 Decap CMS を有効化したとき、管理画面から各データを編集できる構成です。

## 管理コンテンツ

- `content/seminars/*.json`: 日本語研究会。1研究会につき1ファイルです。
- `content/pearl-seminars/*.json`: PEARL / DD 向け研究会。2026年度の受入可否・条件・使用言語を含みます。
- `content/news/*.json`: お知らせ。1記事につき1ファイルです。
- `content/faqs/*.json`: FAQ。1質問につき1ファイルです。
- `content/about.json`: 「委員会について」ページ。
- `content/committee.json`: 年度別の常任委員・担当・紹介文。
- `content/home.json`: ホームの入ゼミ日程（日英併記）とPEARL向けボタン。
- `content/admissions/pearl-schedule.json`: PEARL / DD向け入ゼミスケジュール。
- `content/admissions/previous-results-ja.json`: 日本語の過去試験結果・PDFリンク。
- `content/admissions/previous-results-en.json`: 英語のPrevious Year Results・PDFリンク。

`content/generated/*.json` はサイト表示用に自動生成されます。直接編集しないでください。

## 研究会の主要フィールド

- `name`: 研究会名
- `professorName`: 教授名
- `field`: 分野（A〜J、その他）
- `pearl`: PEARL生の受け入れ
- `dd`: Double Degree生の受け入れ
- `languages`: 使用言語
- `description`: 一覧・検索用の紹介文
- `contentHtml`: 詳細ページ本文
- `seminarImage`: ゼミ紹介に表示する研究会写真
- `seminarImageAlt`: 研究会写真の短い説明
- `professorImage`: 教員紹介に表示する教授写真
- `professorImageAlt`: 教授写真の短い説明
- `professorMessage`: 教授からの一言
- `url`: 研究会公式URL
- `status`: 募集状況

写真は `public/uploads/` に保存し、JSONには `/uploads/...` から始まるパスを書きます。写真が未登録の場合も詳細ページは準備中表示になるため、仮の人物写真を入れる必要はありません。

PEARL / DD 向け研究会では、`pearlStatus`、`ddStatus`、`language`、`sourceYear` が公式年度リストの表示に使われます。カードの受入可否を研究会名から推測せず、これらのフィールドを更新してください。英語ページ用に `professorName`、`professorNameLocal`、写真、教授メッセージ、SNS URLも個別に編集できます。

## Decap CMS 導入時

コレクション定義は `public/admin/config.yml` に用意済みです。実際に管理画面を公開する段階で、`public/admin/index.html`、GitHub認証、公開権限を設定してください。CMSを有効化するまでは、JSONファイルをGitHub上で直接編集できます。

ビルド時に `scripts/content-pipeline.mjs` が各ファイルを読み込み、サイト用データを自動生成します。
