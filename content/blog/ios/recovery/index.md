---
title: iOSのiTunesバックアップの解析
date: "2019-12-29T23:00:00.000Z"
tags: ['ios', 'backup']
---

# iOSのバックアップからファイルを復元

iPhoneやiPadなどのiOS端末は(Windowsの場合)iTunesでバックアップが取れます。

> MacはiTunesが廃止になったんでしたっけ。
> 今はどうバックアップ取るのよくわかってない笑

"このコンピュータ"でバックアップしてある場合は、バックアップディレクトリからデータを直接復元できるらしいので、その方法を紹介したいと思います。

## バックアップの構成

以下の場所にバックアップディレクトリがあります。

Windows: `\Users\AppData\Roaming\Apple Computer\MobileSync\Backup`  
Mac: `/Users/Library/Application Support/MobileSync/Backup`(後で確認する)

### ディレクトリの構成

バックアップディレクトリはデバイスごとにハッシュされた名前がつけられています。

その中は`00`-`ff`の大量のディレクトリと`Info.plist`、`Manifest.db`、`Manifest.plist`、`Status.plist`から成ります。

バックアップするときに暗号化を有効にしていても、`.plist`ファイルは暗号化されないみたいです(未確認)

`.plist`ファイルのAppleのドキュメントはこちら  
<a href='https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html' target='_blank'>About Information Property List Files</a>

### Info.plistファイル

Info.plistはバックアップの情報が入っています。
バックアップした日時や端末の情報が確認できます。

普通にテキストエディタでも開けます。

- バックアップ日: `Last Backup Date`
- 端末の名前: `Product Name`もしくは`Product Type`
- iOSのバージョン: `Product Version`

`Ctrl` + `F`とかで探してみてください。

### Manifest.plistとStatus.plist

開き方がわからない。

`Status.plist`の方はすごく軽いです。
バックアップ時の状態を記録しているのかな(未確認)

### Manifest.db

SQLiteデータベースです。  
すべてのファイルの情報がここに記録されています。

<a href='https://sqlitebrowser.org/' target='_blank'>DB Browser for SQLite</a>などを使って読むことができます。

ひとことでいうと、iOS内のファイルはバックアップ時にハッシュ化された(ランダムな?)名前で保存され、その名前と元のファイル名との関係がここに記録されています。

- fileID
- domain
- relativePath
- falgs
- file

`relativePath`が元のファイル名で、`fileID`の名前でバックアップに保存されています。

`domain`ではそのファイルを使用しているアプリがわかります。

`flags`は1がファイル、2がディレクトリ、4は不明です。

## 復元

Manifest.dbを使ってバックアップファイルを直接復元することができます。

`fileID`をバックアップフォルダで検索し、そのファイルを`relativePath`の名前に書き換えると開けるようになると思います。

`fileID`の最初の2文字のディレクトリにファイルの本体が保存されています。

一気に戻すには、`flag`が`2`のデータを元に、`domain`/`relativePath`となるようにディレクトリを作成し、そこに含まれるファイルを復元していきます。

`flag`が`1`のデータを読みだしてきてファイル名を変更していけばバックアップファイルを再構成することができると思います。