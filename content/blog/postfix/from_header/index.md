---
title: Postfixで送信したメールの送信元を変更する
date: "2019-08-16T16:00:21.000Z"
tags: ['postfix', 'from header']
---

# Postfix を使って送信したメールにLinuxユーザ名が入る

Postfixはmailコマンドで送信したメールのヘッダー情報を変更することができます。

環境によっては送信したメールのFromヘッダが以下のようになります。

```
From: username <username@example.com>
```

メールアドレス部分の`username`は`sender_canonical`を使って変更できますが、表示名の変更でつまづいたのでそのメモです。

Postfixのバージョンは以下の通り
```
$ postconf | grep mail_version
mail_version = 3.1.0
```

## header_checksを使う

Fromヘッダーは`header_checks`を使って変更できます。

### `header_checks`を作成

ここでヘッダーの置換処理は`sender_canonical`の処理の後に行われるようです。

置換処理前のFromヘッダーは以下のようになっています。

```shell
From: username@example.com (username)
```

これを次のように置換します。

```shell
From: info <username@example.com>
```

`/etc/postfix/`以下に`header_checks`ファイルを作成します。

```shell:title=<span>header_checks</span>
/^From:[[:space:]](.*@.*)[[:space:]].*$/ REPLACE From: info <${1}>
```

このファイルは正規表現が使えますが、少し変則的です。
スペースは`\s`ではなく`[[:space:]]`を指定します。
また、変数は`()`で囲ったものを`${1}`で使用できます。

### `header_checks.db`を作成

次に、以下のコマンドを実行します。

```shell
postmap /etc/postfix/header_checks
```

`/etc/postfix/header_checks.db`が生成されます。

### `main.cf`に設定を追加

最後に、`/etc/postfix/main.cf`に以下2行を追加します。

```shell:title=<span>main.cf</span>
header_checks = regexp:/etc/postfix/header_checks
smtp_header_checks = regexp:/etc/postfix/header_checks
```

`header_checks`がコメントアウトされている場合は解除してください。
`.db`は書かなくていいみたいです。

再起動で完了です。

```shell
/etc/init.d/postfix restart
```

ちなみにこの設定は受信時にも適用されるので正規表現で書く場合は注意が必要ですね。