# README #

## this is sample  

## Mac環境構築の方法

本リポジトリにあるファイルは、「file://」では動かないので「Node.js」をインストールしてください。  
ブラウザからダウンロードして、インストールすることも可能ですが  
Macの場合「Homebrew」経由でインストールすることをオススメします。  

ターミナルを開いて下さい。  
まずはコマンドラインツール（Xcodeの一部）をインストールします。

```
$ xcode-select --install
```

そしてHomebrewをインストールします。

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

インストールできたらちゃんと動いていることを確認してください。

```
$ brew doctor
Your system is ready to brew.
```

次に、「Node.js」をインストールしてください。
まずはNode.jsパッケージ管理ツールの「nodebrew」を入れます。

```
$ brew install nodebrew
```

インストールが完了したら正しく動くかどうか、チェックします。

```
$ nodebrew -v
```

環境パスを通します。「.bash_profile」という隠しファイルに、一行書いて反映しています。

```
$ echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile
$ source ~/.bashrc
```

インストール可能なNode.jsのバージョンを取得します。

```
$ nodebrew ls-remote
```

ファイルやディレクトリにアクセス出来ない場合はディレクトリを作成して下さい。

```
$ mkdir -p ~/.nodebrew/src
```

まずは最新版をインストールします。

```
$ nodebrew install-binary latest
```

インストールされているNode.jsと、現在使っているバージョンを表示します。

```
$ nodebrew ls
v7.1.0
current: none
```

例えば「v7.1.0」を使いたい場合はこのように書きます。  
数字の部分は最新版に置き換えてください。

```
$ nodebrew use v7.1.0
```

コレでNode.jsが使えるようになっているはずですので、  
バージョンチェックしてみて下さい。

```
$ node --v
$ npm --v
```

[command not found]でなければ成功です。  
参考にしたサイトはこちらです。  
https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09


## staticなサイトを見る場合
例えばbuildされたdistの中身など、ならばコレで見えます。

```
$ npm install -g http-server
$ cd frontend //cloneしてきたディレクトリ
$ http-server
```

http://localhost:8080/

## /search/以下を確認するには
search以下は必要なモジュールがいくつかあり、
それらはgit管理外ですので集めて来る必要があります。

```
$ pwd //現在の場所を確認
$ cd  //ホームディレクトリへ戻る
$ cd frontend //cloneしてきたリポジトリへ
$ cd search //さらにnode.jsで作成されているディレクトリへ
$ npm install //node_modulesをダウンロードしてくれます。
$ vue ui
 Starting GUI...
```

これでブラウザから操作できるようになりますので、
GUI>タスクからserveして、内容を確認してください。
