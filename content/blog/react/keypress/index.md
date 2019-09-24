---
title: ReactでonKeyPressを取得する
date: "2019-09-24T12:00:00.000Z"
tags: ['react', 'onkeypress']
---

# onKeyPress を取得する

onKeyPressはブラウザでキー入力されたときの動作を制御するために使います。

## input で onKeyPress を取得する

例えば、`input`タグで、入力後Enterを押して確定する動きをReactで実装すると以下のようになります。

```javascript:title=<span>React</span>
const Component = ({text, changeText, sendText}) => {

  const keyPress = (e) => {
    if (e.which === 13) sendText()
  }

  return (
    <React.Fragment>
      <input type='text' value={text} onChange={(e) => changeText(e)} onKeyPress={(e) => keyPress(e)}>
    </React.Fragment>
  )
}
```

この例では、入力後Enterを入力すると入力された文字列が送信されます。IME変換確定時のEnterは無視されます。

## div で onKeyPress を取得する

上記`input`のような場合は通常フォーカスされた状態で使用するのでOKですが、そうではない場合は注意が必要です。

キーボードによる画面制御やメディアの再生、停止をキーボードでも操作できるようにするには親要素(`div`など)でイベントを拾わなければなりません。
この場合は、`tabIndex`を指定してフォーカスします。

```javascript:title=<span>React</span>
const Component = ({mediaControl}) => {

  const keyPress = (e) => {
    if (e.which === 32) mediaControl()
  }

  return (
    <React.Fragment>
      <div onKeyPress={(e) => keyPress(e)} tabIndex='0'>
        <AppComponent />
      </div>
    </React.Fragment>
  )
}
```

上記例では、スペースキーでメディアの再生を停止します。
しかし、`AppComponent`内に`input`や`textarea`がある場合、イベントはバブリングするので文字列入力時のスペース入力も拾ってしまいます。

フォーム要素での入力に`event.stopPropagation()`メソッドを使うか、以下のように`div`でイベントを拾ったときに除外します。

```javascript:title=<span>React</span>
const keyPress = (e) => {
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') return false
  if (e.which === 32) mediaControl()
}
```
