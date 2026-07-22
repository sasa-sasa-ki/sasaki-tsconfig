# sasaki-tsconfig

my tsconfig settings


## environment

- TypeScript >5.9,<8
- for Node.js setting, put `@types/node`

## install


```powershell
npm install -D @sasa-sasa-ki/tsconfig typescript
```

in node.js project, needed to add @types/node module

```powershell
npm install -D @types/node
```

## Node.js／tsx

input your tsconfig following properties:

```json
{
  "extends": "@sasa-sasa-ki/tsconfig/node",
  "include": [
    "src/**/*.ts",
    "types/**/*.d.ts"
  ]
}
```

you can use `@/` aliases

```ts
import { loadConfig } from "@/modules/config";
```

if you use tsx, you can run directly like bellow:

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

if framework destributes specifical tsconfig, you can use multiple extends last config is most followed

```json
{
  "extends": [
    "astro/tsconfigs/strict",
    "@sasa-sasa-ki/tsconfig/web"
  ]
}
```

## ライセンス

MIT
