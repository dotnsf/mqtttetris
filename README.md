# MQTT Tetris

## 概要

オープンソースで公開されている HTML5 版のテトリスに IBM IoT Platform の MQTT ブローカーと Node-RED 環境を使った WebSocket メッセージングによるカスタマイズを加えたものです。スマートフォンの傾きでテトリスのゲーム制御を行います。


## 使い方

- スマートフォンで publish.html ファイルにアクセスすると、このページ内に埋め込まれた MQTT パブリッシャー機能によって、スマートフォンのジャイロ情報が IBM IoT Platform に送られます。

- 送られたジャイロ情報を Node-RED で受取り、同じサーバー上の /ws/sensor という WebSocket パスに送信するよう Node-RED を定義します。

- ゲーム画面(tetris.html)では、/ws/sensor に送信されるジャイロ情報を読み取り、その傾きに合わせてブロックが動くよう作られています。スマホを左右に傾けてゲームを楽しんでください。

    - tetris.html をブラウザで開く際の URL は https ではなく http をお使いください。


## HTML5 Tetris

テトリスはこのオープンソース版を使っています。controller.js にのみ変更を加えて使っています：

http://coderecipe.jp/recipe/iHjJBJx9Si/


