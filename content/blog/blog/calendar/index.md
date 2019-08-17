---
title: iCalendar形式とiOS
date: "2019-08-16T16:00:22.000Z"
tags: ['ics', 'icalendar', 'ios']
---

# icsという拡張子

icsという拡張子のファイルがあります。
中身はただのテキストファイルなのですが、これを使ってiOSカレンダーアプリへスケジュールなどを反映することができます。

個人で利用するのもいいですが、グループで利用するときに力を発揮するかなと思います。
グループ(なんかの集まり)のメンバーにスケジュールを配布したいときに、メールなどで通知したりWebサイトなどを経由して確認してもらったり、いくつか方法があると思います。
ics形式のファイルをWeb上で公開することでメンバーにリンクしてもらい、iOSカレンダーアプリ上のスケジュールを自動更新することができます。

iCalendar形式は標準フォーマットなので、本当はiOSに限らずAndroidやWindowsでも参照することができます。
ですが、Androidの同期はよくわからなくて、Windowsは調べてないです。

# iCalendarフォーマット

[Wikipedia](https://ja.wikipedia.org/wiki/ICalendar)によると、規格自体は古くからあるようです。

フォーマットは以下のようになっています。

```ics:title=<span>iCalendar</span>
BEGIN:VCALENDAR
PRODID:-//Zatsuzen//Zatsuzen Schedule//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:スケジュール
X-WR-TIMEZONE:Asia/Tokyo
X-WR-CALDESC:スケジュール

--- ここにイベント情報 ---

END:VCALENDAR
```

`BEGIN:VCALENDAR`と`END:VCALENDAR`で囲い、その中に概要を書いていきます。

スケジュールの概要に続いてイベント情報を書きます。
イベント情報は以下のようなフォーマットで、複数ある場合はこれを繰り返して書きます。

```ics:title=<span>iCalendar</span>
BEGIN:VEVENT
DTSTART:20190728T090000Z
DTEND:20190728T130000Z
DTSTAMP:20190101T000000Z
UID:314df8aa7b930c5287ef3ca4d536f874
LOCATION:日本のどこか
SUMMARY:なにかのイベント
END:VEVENT
```
