---
title: 再生時間を表示する
date: "2019-08-16T16:00:17.000Z"
tags: ['javascript']
---

# 再生時間を表示する

`<audio>`や`<video>`を使うと再生時間を表示したいときがあります。 
でもだいたい単位が秒なので、時と分は計算しなくてはいけません。

簡単ですが時間データから文字列に変換するスクリプトを書きました。

### ソースコード

```javascript:title=<span>JavaScript</span>
function playTime (t) {
  let hms = ''
  const h = t / 3600 | 0
  const m = t % 3600 / 60 | 0
  const s = t % 60
  const z2 = (v) => {
    const s = '00' + v
    return s.substr(s.length - 2, 2)
  }
  if (h != 0) {
    hms = h + ':' + z2(m) + ':' + z2(s)
  } else if (m != 0) {
    hms = z2(m) + ':' + z2(s)
  } else {
    hms = '00:' + z2(s)
  }
  return hms
}
```

こんな感じ。