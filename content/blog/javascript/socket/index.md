---
title: socket.ioでidが取得できない
date: "2019-08-16T16:00:13.000Z"
tags: ['react', 'javascript', 'socket.io']
---

# socket.id-clientを使っていてsocket接続後IDが取得できない

socket.ioを使ってクライアントとサーバの接続状態を確認するコードを書いていた。
`console.log`にて`socket`を出力していて、こちらの`connected`プロパティは`true`になっているが、`socket.id`を出力すると`undefined`になってしまう。

```javascript:title=<span>JavaScript</span>
import socketio from 'socket.io-client'

const socket = await socketio.connect('https://192.168.1.2:3000/', {secure: true})
console.log(socket, socket.id)
```

## よくわからないが接続できていない

詳しく調べていないのでよくわからないままだが、`connect`イベントをひろってやると取得できた。

```javascript:title=<span>JavaScript</span>
import socketio from 'socket.io-client'

const socket = await socketio.connect('https://192.168.1.2:3000/', {secure: true})
socket.on('connect', () => {
  console.log(socket, socket.id)
})
```
`connected`プロパティが`true`でも繋がっていないことがあるのだろうか。