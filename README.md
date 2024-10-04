# 学習中のtypescriptプロジェクト「typescript-tutorial02」の概要

1. プロジェクトフォルダを作成し、移動する:
   mkdir typescript-tutorial02
   cd typescript-tutorial02

2. package.jsonを初期化:
   npm init -y

3. TypeScriptをインストール:
   npm install --save-dev typescript

4. Express（ローカルサーバー用）をインストール:
   npm install --save-dev express

5. TypeScript設定ファイル(tsconfig.json)を作成:
   npx tsc --init

6. tsconfig.jsonの内容を以下のように更新:
   {
     "compilerOptions": {
       "target": "es5",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true
     }
   }

7. src/index.tsファイルを作成:
   mkdir src
   echo "console.log('Hello, TypeScript!');" > src/index.ts

8. server.jsファイルをプロジェクトルートに作成:
   const express = require('express');
   const path = require('path');
   const app = express();
   const port = 8080;

   app.use(express.static(path.join(__dirname, '.')));

   app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'index.html'));
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}/`);
   });

9. package.jsonにスクリプトを追加:
   {
     "scripts": {
       "build": "tsc",
       "start": "node server.js"
     }
   }

10. HTMLファイル(index.html)を作成:
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TypeScript Tutorial 02</title>
    </head>
    <body>
      <h1>Hello, TypeScript!</h1>
      <script src="dist/index.js"></script>
    </body>
    </html>

11. TypeScriptをビルド:
    npm run build

12. サーバーを起動:
    npm start

プロジェクト構造:
typescript-tutorial02/
│
├── src/
│   └── index.ts
│
├── dist/
│   └── index.js (コンパイル後に生成されます)
│
├── package.json
├── tsconfig.json
├── server.js
└── index.html