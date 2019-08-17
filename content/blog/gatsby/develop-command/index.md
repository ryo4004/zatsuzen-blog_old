---
title: Gatsby DevelopにローカルLAN上からアクセスする
date: "2019-08-16T16:00:03.000Z"
tags: ['gatsby', 'tips']
---

## Gatsby開発コマンド
Reactベースの静的サイトジェネレータのGatsbyで通常の開発コマンドでローカルLAN上でアクセスできなかったのでメモ。
```shell
# gatsby develop
```
すると、`http://localhost:8000/`にてアクセスできるが、ローカルサーバで開発し他のPCからアクセスなどはできない。
この場合は以下のコマンドでローカルLAN上に展開できる。
```shell
# gatsby develop -H ローカルIPアドレス -p ポート番号
```

`192.168.1.2`で開発している場合は以下のようになる。
```shell
# gatsby develop -H 192.168.1.2 -p 8000
```
