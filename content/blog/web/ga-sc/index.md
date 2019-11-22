---
title: Google AnalyticsとSearch Consoleの連携でつまづいた
date: "2019-11-22T09:00:00.000Z"
tags: ['google analytics', 'search console', 'tips']
---

# GA と SC の連携でつまづいた

Google Analytics と Search Console の連携時にずっとよくわからないまま放置してたけどやっと原因がわかった。

Search Consoleにページを追加しているのに、 Google アナリティクスで Search Console のデータを使用する ページで "確認済みのサイトはありません。" と表示されるのはSearch Consoleにドメインプロパティで追加しているためです。
プロパティの追加をURLプレフィックスで行うとGoogle アナリティクス側に表示されます。

# Google Analytics

Googleアナリティクスの 集客 メニューから Search Console を開くと、ユーザーがどういった検索クエリで、どんなデバイスでページを見ているか調べることができます。

この機能はSearch Consoleとの連携が必要です。

Search Console のデータ共有を設定をクリック。

![001](001.png "001")

プロパティの設定が開くので、Search Console の Search Console を調整 をクリック。

![002](002.png "002")

![003](003.png "003")

Search Consoleの設定ページが開きます。

追加 をクリック。

![004](004.png "004")

Search Consoleで追加したページ一覧が表示されます。

ここで Search Console のサイト が 確認済みのサイトはありません。 と表示される場合は 下の Search Console にサイトを追加 をクリックします。

あらかじめ Search Console にページを追加していても、ドメインプロパティで設定した場合はここには表示されません。

![005](005.png "005")

Search Console のページへとびます。

左上のメニューから プロパティを追加 でモーダルウィンドウが開きます。

URLプレフィックスを選択してGoogle Analyticsを使用しているページのフルURLを入力します。

![006](006.png "006")

追加完了しました。

![007](007.png "007")

Google Analytics の先ほどの画面を更新すると表示されます。

保存 で登録完了です。

![008](008.png "008")

Search Console にページを追加した直後はすぐにデータが反映されないので気を付けてください。

以上です。