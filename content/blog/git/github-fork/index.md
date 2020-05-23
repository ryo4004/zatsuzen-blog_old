---
title: GitHubでforkしたリポジトリをfork元と同期する
date: "2020-05-23T15:00:00.000Z"
tags: ['github', 'git']
---

# forkしたリポジトリ

forkしたリポジトリはforkした時点のものになります。  
有名OSSなどは日々更新されておりすぐに差分が発生してしまいます。  
これまでは自分のリポジトリを消してまたforkしてとりあえず同期したような感じにしてましたが、ちゃんと同期をすることにしました。

## ローカルにclone

forkしたリポジトリを更新するには、ローカルで作業を行います。

まずローカルにcloneします。

```shell
$ git clone https://github.com/{username}/{repository-name}.git
```

## ローカルのリポジトリにfork元を登録

fork元のリポジトリを登録します。

```shell
$ git remote add root https://github.com/{forked-username}/{repository-name}.git
$ git remote -v // 登録したremoteを表示(originとrootが表示されます)
```

fork元のリポジトリを取得して、masterブランチにmergeします。

```shell
$ git fetch root
$ git checkout master
$ git merge root/master
```

あとはリモートにpushするだけ。

```shell
$ git push
```

これでリモートリポジトリもfork元リポジトリと同一になります。

一度ローカルにcloneする必要があるのが少し手間ですね。