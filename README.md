## 疑問点
**TypeScriptでの環境変数の正しい環境変数の取り扱い方が分からない**

環境変数で隠蔽する方法は
- `.zshrc`に環境変数を定義して、ソースファイルから参照する方法(Shellはzsh)
- dotenvパッケージを利用して、`.env`ファイルに環境変数を定義。ソースファイルから参照する方法  
の2通りがあると思います。

プロジェクトごとに環境変数が管理できること,   
`.env`ファイルに記述する方が分かりやすいこと、から  
今回はdotenvパッケージを利用を採用しています。

## 実現したいこと

**APIキーを環境変数で隠蔽したい**

外部のAPIなどを利用する場合は、APIキーを環境変数等で隠蔽すると思いますが  
Webpackでビルド・バンドルすると隠蔽したはずのAPIキーの値が、  
出力後のファイル`bundle.js`に記述されてしまいます。(`./dist/bundle.js` 2480行目)
  
---
**APIキーの値を隠蔽する.envファイル** 
`　.env` 1行目
```
TEST_ENV_VAR='環境変数で隠蔽したいキー'
```
**ビルドされるtsファイル**  
`　./src/app.ts` 6行目
```
const GOOGLE_API_KEY = process.env.TEST_ENV_VAR;
```
**ビルド後の出力ファイル**  
`./dist/bundle.js` 2480行目
```
const GOOGLE_API_KEY = "環境変数で隠蔽したいキー";

// 期待しているコード
// const GOOGLE_API_KEY = process.env.TEST_ENV_VAR;
```  
  
Webpackでビルドせずに、tscコンパイラでコンパイルすると正しく環境変数に隠蔽されて出力されます。  
➡︎ Webpackの設定が違う？？  
  
そもそものTypeScriptでの環境変数の取り扱い方が間違っているのでしょうか？  
原因や他のやり方があれば、教えて頂きたいです。

## 開発環境

- TypeScript 4.7.4  
- Webpack 5.74.0  

### パッケージ
- dotenv
- dotenv-webpack
その他は`package.json`を参照



