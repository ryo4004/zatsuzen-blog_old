---
title: lameで特定のディレクトリ以下のファイルをmp3にする
date: "2019-08-16T16:00:06.000Z"
tags: ['lame', 'audio', 'linux']
---

# LAME MP3 Encoder
Linuxでディレクトリ内のwavファイルをすべてmp3ファイルに変換するシェルスクリプトです。

```shell:title=<span>lame.sh</span>
#!/bin/sh

find ~/music/ -name *.wav | while read file; do
 lame -V2 "$file" "${file%.wav}.mp3"
 rm -v "$file"
done
```

このスクリプトは指定ディレクトリ(`~/music/`)以下の`*.wav`ファイルを探し、ひとつずつ`lame`を実行します。
実行後、もとの`*.wav`ファイルは削除します。
この例ではVBRのオプション(`-V2`)を指定しています。

### `lame`のオプション

#### 固定ビットレート(CBR)
`-b`に続いてビットレートを指定する
```shell
lame -b 192 sample.wav
```

#### 可変ビットレート(ABR)
`--abr`に続いてビットレートを指定する。
```shell
lame --abr 192 sample.wav
```
#### 可変ビットレート(VBR)
`-V`に続いてスペースを挟まず品質を指定する。品質は0から10までで小数点以下まで指定可能。0が最も品質が高く容量が多くなる。

```shell
lame -V2 sample.wav
```
