---
title: ファイルサイズを取得する
date: "2019-08-16T16:00:16.000Z"
tags: ['javascript']
---

# ファイルサイズを取得する

`<input type="file">` などで取得したファイルリストには`size`というプロパティがあり、ファイルサイズが取得できます。
しかし単位がバイトなのでそのまま表示するとユーザにとってはわかりにくくなってしまいます。

ファイルサイズは他の単位とは異なり10<sup>3</sup>ごとにSI接頭辞が変わるわけではなく、1KB = 1024byteを元に計算するので少しやっかいです。
1024<sup>n</sup>ごとにひとつ大きなSI接頭辞になります。

### ソースコード

関数にするとこんな感じ。各SI接頭辞ごとの単位サイズを計算し、それをもとに振り分けるだけですけど。

小数点以下2桁以下は四捨五入していますが、関数`round`を書き換えていろいろ使えます。

```javascript:title=<span>JavaScript</span>
function fileSizeUnit (size) {

  // 1 KB = 1024 Byte
  const kb = 1024
  const mb = Math.pow(kb, 2)
  const gb = Math.pow(kb, 3)
  const tb = Math.pow(kb, 4)
  const pb = Math.pow(kb, 5)
  const round = (size, unit) => {
    return Math.round(size / unit * 100.0) / 100.0
  }

  if (size >= pb) {
    return round(size, pb) + 'PB'
  } else if (size >= tb) {
    return round(size, tb) + 'TB'
  } else if (size >= gb) {
    return round(size, gb) + 'GB'
  } else if (size >= mb) {
    return round(size, mb) + 'MB'
  } else if (size >= kb) {
    return round(size, kb) + 'KB'
  }
  return size + 'バイト'
}
```
