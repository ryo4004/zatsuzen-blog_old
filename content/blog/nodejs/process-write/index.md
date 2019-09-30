---
title: 改行なしで出力する 
date: "2019-09-30T23:00:00.000Z"
tags: ['nodejs', 'console', 'process']
---

# 改行なしで出力する

何かの処理をNode.JSで書いていて、途中の経過が知りたいときによく`console.log`を使いますが、これは改行込みで出力されてしまいます。

改行なしで出力する場合は`process.stdout.write`を使います。

```javascript:title=<span>app.js</span>
process.stdout.write('something')
```

特に何かを`import`する必要もないので便利です。