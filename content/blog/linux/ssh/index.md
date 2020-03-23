---
title: sshでログインするときにパスワードを入力するのが面倒
date: "2020-03-23T23:00:00.000Z"
tags: ['shell', 'ssh', 'ssh-keygen']
---

# ssh-keygenで鍵を作って簡単ログイン

サーバのコンソールにアクセスするときって、毎回パスワードを入力する必要があるので面倒ですよね。

最初の作業だけ手間ですがssh鍵を使うことでだいぶ楽になります。

## 鍵を作成する

クライアント側で以下を実行します。  
(どちら側で作ってもOKらしい)  
すべて空欄でもOKです。

```shell
$ ssh-keygen -t rsa 
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/user/.ssh/id_rsa):
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
```

### 保存場所

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/user/.ssh/id_rsa):
```

任意の場所に保存したい場合はここでパスを入力します。

初期値は`/Users/user/.ssh/id_rsa`です。

### パスフレーズ

```shell
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
```

パスフレーズは設定すると秘密鍵を使うときに必要になります。

## 鍵の確認

作成がうまくいくと`id_rsa`と`id_rsa.pub`というファイルができます。

`.pub`がついている方が公開鍵でついていない方が秘密鍵です。

クライアント側で作成した場合は公開鍵をリモート側(サーバ側)に置きます。

リモート側のユーザのホームディレクトリの`.ssh`ディレクトリ以下に配置します。

すでに`authorized_keys`ファイルがある場合は追記します。

```shell
$ cd ~/.ssh
$ cat id_rsa.pub >> authorized_keys
```

ない場合はファイル名を`authorized_keys`に変更するだけです。

```shell
$ cd ~/.ssh
$ chmod 600 id_rsa.pub
$ cat id_rsa.pub >> authorized_keys
```

## ログインする

```ssh
ssh user@remote -i [秘密鍵パス]
```

秘密鍵を`~/.ssh/id_rsa`に保存している場合は`-i`オプションは特につける必要はないみたい。