---
title: olタグでオリジナルマーカーをつける
date: "2019-11-18T10:00:00.000Z"
tags: ['web', 'html', 'css']
---

# olタグ

HTMLで番号付きのリストを使いたい場合は`<ol>`タグを使います。

自動で上から採番されるのでとっても便利。

こういうやつですね。

<ol class='sample'>
  <li>aaa</li>
  <li>bbb</li>
  <li>ccc</li>
</ol>

<style>
ol.sample {
  list-style: decimal inside;
}
</style>

```html:title=<span>HTML</span>
<ol>
  <li>aaa</li>
  <li>bbb</li>
  <li>ccc</li>
</ol>
```

このマーカーはわりと好きなように変更できます。標準で用意されているマーカーは以下を参照。

<a href='https://developer.mozilla.org/ja/docs/Web/CSS/list-style-type' target='_blank'>list-of-type | MDN</a>

# オリジナルマーカー

以下のような採番をしたいときのサンプルです。

<ol class='sample2'>
  <li>aaa</li>
  <li>bbb</li>
  <li>ccc</li>
</ol>

<style>
ol.sample2 {
  list-style: none;
}
ol.sample2 li {
  counter-increment: li;
}
ol.sample2 li::before {
  content: 'a-' counter(li) '. ';
}
</style>

```css:title=<span>CSS</span>
ol {
  list-style: none;
}
ol li {
  counter-increment: li;
}
ol li::before {
  content: 'a-' counter(li) '. ';
}
```

SCSSで書くと以下のような感じ。

```scss:title=<span>SCSS</span>
ol {
  list-style: none;

  & > li {
    counter-increment: li;

    &::before {
      content: 'a-' counter(li) '. ';
    }
  }
}
```

`li`に疑似要素`::before`や`::after`を使うことでいろいろなオリジナルマーカーを作れます。