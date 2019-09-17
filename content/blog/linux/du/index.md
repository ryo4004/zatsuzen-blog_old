---
title: ファイルやディレクトリのサイズを確認するコマンド
date: "2019-09-17T14:00:00.000Z"
tags: ['linux', 'command', 'du']
---

# ファイルやディレクトリのサイズを確認する

Windowsでは右クリック→プロパティでサイズの確認ができますが、CUIではコマンドを使って確認します。

```shell
du -sh ./*
```

こんな感じで出力されます。

```shell
8.0K    ./app.js
4.7M    ./client
103M    ./node_modules
4.0K    ./package.json
324K    ./package-lock.json
4.0K    ./README.md
48K     ./server
4.0K    ./webpack.js
```

コマンドの構成はこんな感じ。

```shell
du -[option] [directory || file]
```

## オプション

`-s`はサブディレクトリを表示しないオプションです。
これをつけないとサブディレクトリの内容もずらずら出てきます。

`-h`はサイズに合わせて読みやすく単位を変えて表示してくれます。

`-k`をつけると、1KBを単位として計算します。