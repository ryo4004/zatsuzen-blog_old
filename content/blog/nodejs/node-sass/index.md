---
title: node-sassで"Arbitrary File Overwrite"が出る
date: "2019-08-16T16:00:20.000Z"
tags: ['nodejs']
---

# audit コマンドで high severity vulnerability が出る

久々にnode-sassを使おうと思ったらauditでつまづいた。

## 問題

`npm i -D node-sass`したら以下の警告が出た

```
found 1 high severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
```

早速 `npm audit` を行うと、以下のようになる。

```

                       === npm audit security report ===

┌──────────────────────────────────────────────────────────────────────────────┐
│                                Manual Review                                 │
│            Some vulnerabilities require your attention to resolve            │
│                                                                              │
│         Visit https://go.npm.me/audit-guide for additional guidance          │
└──────────────────────────────────────────────────────────────────────────────┘
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ Arbitrary File Overwrite                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ tar                                                          │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Patched in    │ >=4.4.2                                                      │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ node-sass [dev]                                              │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ node-sass > node-gyp > tar                                   │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/803                             │
└───────────────┴──────────────────────────────────────────────────────────────┘
found 1 high severity vulnerability in 8468 scanned packages
  1 vulnerability requires manual review. See the full report for details.

```

これは node-tar の4.4.2より前のバージョンは任意ファイルの上書きに関して脆弱性があるとのこと。

## 修正

原因は`node-gyp`にあります。`node-gyp@4.x.x`にアップデートする必要があります。

`package-lock.json`を修正します。

`node-gyp`の項目を探し、`requires`以下の`tar`の項目を削除し、`dependencies`に`tar`を追加します。

```javascript{17,26-30}:title=<span>package-lock.json</span>
  "node-gyp": {
    "version": "3.8.0",
    "resolved": "https://registry.npmjs.org/node-gyp/-/node-gyp-3.8.0.tgz",
    "integrity": "sha512-3g8l...",
    "dev": true,
    "requires": {
      "fstream": "^1.0.0",
      "glob": "^7.0.3",
      "graceful-fs": "^4.1.2",
      "mkdirp": "^0.5.0",
      "nopt": "2 || 3",
      "npmlog": "0 || 1 || 2 || 3 || 4",
      "osenv": "0",
      "request": "^2.87.0",
      "rimraf": "2",
      "semver": "~5.3.0",
-     "tar": "^2.0.0",
      "which": "1"
    },
    "dependencies": {
      "semver": {
        "version": "5.3.0",
        "resolved": "https://registry.npmjs.org/semver/-/semver-5.3.0.tgz",
        "integrity": "sha1-myzl...",
        "dev": true
-     }
+     },  
+     "tar": {
+       "version": "^4.4.2"
+     }
    }
  },
```

修正後、`node_modules`を削除し`npm i`を実行します。