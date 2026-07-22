# sasaki-tsconfig

佐々木のTypeScript／Node.jsプロジェクトで共通利用する、ESM・`moduleResolution: "Bundler"`・厳格な型検査を前提とした共有TSConfigです。

## 方針

- ESMの`import`／`export`を維持する
- `moduleResolution: "Bundler"`を使用する
- `strict`を基礎として、安全性の高い検査を追加する
- `@/*`を継承先プロジェクトの`src/*`へ割り当てる
- Node.jsとWebの環境型を分離する
- 実行コードやruntime依存関係を持たない

## 公開範囲

このリポジトリは公開で問題ありません。収録するのは汎用的なコンパイラ設定、検証用fixture、READMEのみであり、秘密情報やプロジェクト固有データは含めません。

## 必要環境

- TypeScript 5.9以上、8未満
- Node.js向け設定では`@types/node`

## インストール

npm公開後は次のように導入します。

```powershell
npm install -D @sasa-sasa-ki/tsconfig typescript
```

Node.jsプロジェクトではNode.jsの型定義も追加します。

```powershell
npm install -D @types/node
```

npmへ公開する前にGitHubから試す場合は、次を使用できます。

```powershell
npm install -D github:sasa-sasa-ki/sasaki-tsconfig typescript @types/node
```

## 設定一覧

| 設定 | 用途 | 主な内容 |
| --- | --- | --- |
| `base` | 共通基盤 | ESM、Bundler解決、strict、noEmit |
| `app` | aliasを使うアプリ | `base`に`@/*` → `src/*`を追加 |
| `node` | Node.js／tsx | `app`にES2024とNode.js型を追加 |
| `web` | Astro／Vue／Vite | `app`にDOM型を追加 |

## Node.js／tsx

プロジェクト側の`tsconfig.json`を次のようにします。

```json
{
  "extends": "@sasa-sasa-ki/tsconfig/node",
  "include": [
    "src/**/*.ts",
    "types/**/*.d.ts"
  ]
}
```

次のようなimportが型検査時に解決されます。

```ts
import { loadConfig } from "@/modules/config";
```

`tsx`で直接実行する場合は、通常どおり次のように起動できます。

```powershell
npx tsx src/index.ts
```

## Astro／Vue／Vite

```json
{
  "extends": "@sasa-sasa-ki/tsconfig/web",
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "src/**/*.astro"
  ]
}
```

フレームワークが独自のTSConfigを提供する場合は、TypeScriptの複数継承を利用できます。後に記述した設定ほど優先されます。

```json
{
  "extends": [
    "astro/tsconfigs/strict",
    "@sasa-sasa-ki/tsconfig/web"
  ]
}
```

## `paths`の仕組み

`app`、`node`、`web`では次のaliasを定義しています。

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": [
        "${configDir}/src/*"
      ]
    }
  }
}
```

`${configDir}`により、インストールされた共有パッケージの場所ではなく、実際にこの設定を継承するプロジェクトのディレクトリを基準にします。

`paths`はTypeScriptの型検査上の解決方法を指定するものであり、生成JavaScriptのimport文字列を書き換えません。`tsx`やViteなど、同じaliasを理解する実行環境またはbundlerと組み合わせて使用してください。

## 設定の上書き

各プロジェクト固有の設定は、継承側で必要な項目だけ上書きします。

```json
{
  "extends": "@sasa-sasa-ki/tsconfig/node",
  "compilerOptions": {
    "noUnusedLocals": true
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

## 検証

```powershell
npm install
npm test
```

`npm test`はNode.js用とWeb用のfixtureを`tsc`で型検査し、`@/*`が継承先の`src/*`を参照できることも確認します。

## 公開時の注意

このパッケージ自体は公開して問題ありませんが、npm公開には`@sasa-sasa-ki`スコープを利用できるnpmアカウントまたはOrganizationが必要です。初回公開時は次を実行します。

```powershell
npm login
npm publish
```

`publishConfig.access`は`public`に設定済みです。

## ライセンス

MIT
