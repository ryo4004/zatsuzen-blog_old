---
title: gatsby buildでメモリが足りないエラー
date: "2019-11-22T10:00:00.000Z"
tags: ['gatsby', 'tips']
---

# gatsby build

本番環境のサーバで`gatsby build`したらエラーが出ました。

```

 ERROR

UNHANDLED REJECTION spawn ENOMEM



  Error: spawn ENOMEM

  - child_process.js:358 ChildProcess.spawn
    internal/child_process.js:358:11

  - index.js:204 module.exports
    [project]/[imagemin-pngquant]/[execa]/index.js:204:26

  - index.js:52 input
    [project]/[imagemin-pngquant]/index.js:52:13

  - index.js:71 Function.module.exports.buffer
    [project]/[imagemin]/index.js:71:31

  - process-file.js:198 pipeline.toBuffer.then.sharpBuffer
    [project]/[gatsby-plugin-sharp]/process-file.js:198:105

```

調べてみるとメモリが足りないエラーのようです。  
画像のサムネイルを生成してるときに止まりやすいみたい。

本番環境はメモリちょっとしかないので、まぁしかたないのかな。  
スワップメモリで対応します。

スワップファイルを作成してパーミッションを設定します。

```
# fallocate -l 2G /swap
# chmod 600 /swap
```

スワップスペースにします。

```
# mkswap /swap
```

スワップを有効にします。

```
# swapon /swap
```

これでとりあえず`gatsby build`が通るか確認。

OKなら再起動後もスワップファイルを保持します。

```
# echo "/swap none swap sw 0 0" | tee -a /etc/fstab
```

以上です。