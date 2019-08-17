---
title: Ubuntu Server 18.04にNode.jsをインストールする
date: "2019-08-16T16:00:02.000Z"
tags: ['nodejs', 'ubuntu']
---

# Ubuntu 18.04 LTSにNode.jsの実行環境を用意する
Ubuntu 18.04 LTSにNode.jsの環境を作るメモ
Ubuntu 16.04でもこの方法でOKです

nvmを使った構築手順です。

## nvmとは
Node.jsは頻繁にアップデートがされており、逐次更新するのは大変です。  
そこで、Node.jsのインストールやアップデートを管理するためのアプリがいくつかあります。  
そのうちのひとつがnvmで、nvmはNode Version Managerの略です。

ちなみにapt経由でもNode.jsのインストールは可能ですが、かなり古いバージョンになっております。(未確認)

## 使用するライブラリをインストール
まず、関連するライブラリをapt経由でインストールします。  
(文頭の#はrootでコマンド実行すること意味します)

```shell:title=<span>shell</span>
# apt-get install build-essential libssl-dev
# apt-get install curl
```

## nvmのインストール

これだけです。

```shell:title=<span>shell</span>
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
# source ~/.bashrc
```

これでnvmコマンドが使えるようになりました。

```shell:title=<span>shell</span>
# nvm --version
v0.33.1
```

ダウンロードできるNode.jsのバージョンは以下のコマンドで確認できます。

```shell:title=<span>shell</span>
# nvm ls-remote
```

ひたすら大量のバージョンリストが表示されます。

```shell:title=<span>shell</span>
# nvm install v10.14.2
```

バージョン番号の後にLTSと書かれている最新の安定版です。
初めてインストールを行った場合は自動でデフォルトのバージョンとして扱われます。

これでNode.jsの実行環境が用意できました。
Node.js用パッケージ管理ツールの`npm`もインストールされています。

```shell:title=<span>shell</span>
# node -v
v10.14.2
# npm -v
```

`nvm`と`npm`は一文字違いですが、全く別のツールです。  
npmはアプリを作成するときなどプロジェクト単位で頻繁に使いますが、nvmは基本的にNode.jsのインストールやバージョン切り替えでしか使いません。私はその都度使い方を調べています笑

## nvmの使い方

インストール済みのバージョンの一覧の確認や使用するバージョンを変更するコマンドです。

```shell:title=<span>shell</span>
# nvm ls // インストールしているバージョン一覧
# nvm use v10.14.2 // 使用するバージョンを指定
```

`use`コマンドでは一時的にバージョンが変更になり、再起動などを行うとデフォルトで設定されたバージョンに戻ります。  
デフォルトのバージョンを変更したい場合は以下のコマンドを使います。

```shell:title=<span>shell</span>
# nvm alias default v10.14.2
```