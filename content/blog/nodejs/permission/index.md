---
title: nodeでパーミッションエラー 
date: "2019-09-24T13:00:00.000Z"
tags: ['nodejs', 'permission', 'error']
---

# gatsbyのアップデートでエラーになった

`gatsby-cli`をアップデートするためにrootで`npm i -g gatsby-cli`を実行したところ、`sh: 1: node: Permission denied`というエラーが出ました。

アップデート失敗どころか`gatsby`コマンドも使えなくなってしまったので解決法を探しました。

こちらにありました: <a href='https://codehex.hateblo.jp/entry/2017/04/18/000000' target='_blank'>参考</a>

```shell:title=<span>shell</span>
# npm config set user 0
# npm config set unsafe-perm true
```

## 元に戻すには

なにをやっているのかよくわからないけど、たぶんパーミッションを無視する設定でしょう。
セキュリティ的に少し怖いので元に戻す方法も書いておきます。

この設定はホームディレクトリの`.npmrc`に記録されているので、これを編集します。

rootの場合は`/root/.npmrc`です。

```text:title=<span>/root/.npmrc</span>
user=0
unsafe-perm=true
```

この2行を削除すれば元通り。