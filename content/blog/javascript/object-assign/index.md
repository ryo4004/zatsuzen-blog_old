---
title: オブジェクトのコピーのやっかいなところ
date: "2019-08-16T16:00:19.000Z"
tags: ['javascript']
---

# オブジェクトのコピー

JavaScriptではオブジェクトのコピーに気をつかいます。  
変数をコピーする場合は書いた通りですが、オブジェクトではそう簡単ではないのです。

```javascript:title=<span>JavaScript</span>
let a = 0
console.log(a) // 0
let b = a
b = 1
console.log(a) // 0
```

`b`という変数に`a`を代入し、`b`を書き換えても、`a`の中身は変わりません。

これをオブジェクトでやってみます。

```javascript:title=<span>JavaScript</span>
let obj1 = { a: 0 }
console.log(obj1.a) // 0
let obj2  = obj1
obj2.a = 1
console.log(obj1.a) // 1
```

このように、オブジェクトのコピー先でプロパティの値を変更するとコピー元のオブジェクトのプロパティの値も変更されます。

これは、オブジェクトの場合はコピーではなく、オブジェクトへのリンクを共有しているだけだからです。

上記の例では`{ a: 0 }`というオブジェクトの位置を`obj1`が保持し、それを`obj2`にコピーしているので、`obj1.a`も`obj2.a`も同じオブジェクトを指します。

> ちなみにオブジェクトは`let`だろうと`const`だろうとプロパティの書き換えはできます笑

## Object.assign()を使う方法

オブジェクトを変数と同じようにコピーするには`Object.assign()`を使ってオブジェクトを新しく作成する必要があります。
`Object.assign()`はES6以降で使用できます。

```javascript:title=<span>JavaScript</span>
let obj1 = { a: 0 }
console.log(obj1.a) // 0
let obj2  = Object.assign({}, obj1)
obj2.a = 1
console.log(obj1.a) // 0
```

<a href='https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign' target='_blank'>Object.assign() - JavaScript | MDN</a>

ただ、`Object.assign()`にも問題があって、コピー元のオブジェクトを展開してはくれないのです。
プロパティに配列やオブジェクトを含む多層のオブジェクトだと、2層目以下はまたメモリ位置のみのコピーになります。

```javascript:title=<span>JavaScript</span>
let obj1 = { a: [0] }
console.log(obj1.a[0]) // 0
let obj2  = Object.assign({}, obj1)
obj2.a[0] = 1
console.log(obj1.a[0]) // 1
```

こうなってしまいます。

これをシャローコピーというそうです。

調べてみるとJavaScriptにディープコピーしてくれる関数はまだ用意されていないようです。

## JSON.parseとJSON.stringifyを使う方法

```javascript:title=<span>JavaScript</span>
let obj1 = { a: [0] }
console.log(obj1.a[0]) // 0
let obj2 = JSON.parse(JSON.stringify(obj1))
obj2.a[0] = 1
console.log(obj1.a[0]) // 0
```

`JSON.parse`と`JSON.stringify`は一度jsonに展開してまたオブジェクトに戻す関数です。ただ、プロパティの値にfunctionやundefinedがあるとそのプロパティそのものが消えてしまうので注意してください。

## Object.freeze()について

ちなみにオブジェクトは`let`だろうと`const`だろうとプロパティの書き換えはできます笑
あとからコピー先でプロパティの書き換えをされても変更しないようにするには`Object.freeze()`を使います。
```javascript:title=<span>JavaScript</span>
let obj1 = { a: 0 }
Object.freeze(obj1)
```

<a href='https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze' target='_blank'>Object.freeze() - JavaScript | MDN</a>