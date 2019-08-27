---
title: CouchDBをUbuntuにインストールして試してみる
date: "2019-08-27T18:00:00.000Z"
tags: ['couchdb', 'database']
---

# CouchDBとは

唐突にCouchDBを試すことにしました。
いま、ブラウザで使うDBとうまく連携できるDBを探しています。

<a href='http://docs.couchdb.org' target='_blank'>CouchDB</a>はオープンソースで提供されているNoSQLデータベースです。

特徴などは公式をご覧ください
(ここでは省略)

## インストール

公式にも<a href='http://docs.couchdb.org/en/stable/install/index.html' target='_blank'>インストール手順</a>があります。素直にその手順に従ってインストールします。

インストール先のOSは Ubuntu 18.04 です。

### パッケージ情報の追加

以下でパッケージ情報を追加します。

```shell:title=<span>shell</span>
# echo "deb https://apache.bintray.com/couchdb-deb bionic main" | tee -a /etc/apt/sources.list
```

これでパッケージ情報が`/etc/apt/sources.list`に追記されます。

`bionic`は<a href='http://docs.couchdb.org/en/stable/install/unix.html' target='_blank'>公式</a>より、Linuxディストリビューションによって異なります。

### リポジトリキーをインストール

以下でリポジトリキーがインストールされます。

```shell:title=<span>shell</span>
# curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | apt-key add -
```

### パッケージのインストール

その後、リポジトリキャッシュとパッケージのインストールをします。

```shell:title=<span>shell</span>
# apt-get update && apt-get install couchdb
```

パッケージのインストール中に実行モードの選択とAdminのパスワードを設定します。

実行モードは`Single Node`と`Clustered`があるみたいですが、まだよくわかりません。

とりあえず`Single Node`を選択。

これで一応インストールは完了。

```shell:title=<span>shell</span>
# service couchdb status
```

## Fauxtonへのアクセス

CouchDBにはブラウザ上からDBの操作ができるphpMyAdminのようなものがあります。
phpMyAdminほど高機能ではないようです。

Linux上でGUIがある場合は、ブラウザから`http://127.0.0.1:5984/_utils`でアクセスできます。

初期状態では外部からのアクセスはできないようになっているようで、ローカルLANなどからアクセスする場合は設定を行います。

CouchDBは`/opt/couchdb`にインストールされています。

設定ファイルは適宜バックアップを取ってください。

`[chttpd]`の`bind_address = 127.0.0.1`を変更します。

```shell{3}:title=<span>/opt/couchdb/etc/local.ini</span>
[chttpd]
;port = 5984
bind_address = 0.0.0.0
; Options for the MochiWeb HTTP server.
;server_options = [{backlog, 128}, {acceptor_pool_size, 16}]
; For more socket options, consult Erlang's module 'inet' man page.
;socket_options = [{sndbuf, 262144}, {nodelay, true}]
```

これで再起動。

```shell:title=<span>shell</span>
# service couchdb restart
```

これでLAN内の他のPCのブラウザからアクセスできます。