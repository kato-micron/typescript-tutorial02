# TypeScript Project: typescript-tutorial02

## プロジェクト概要
このプロジェクトは、TypeScriptを使用した簡単なWebアプリケーションです。ユーザーがフォームに入力した内容を処理し、別のページに結果を表示します。サーバーサイドはNode.js + Expressで実装されています。

## セットアップ手順

1. プロジェクトフォルダを作成し移動:
   ```
   mkdir typescript-tutorial02
   cd typescript-tutorial02
   ```

2. package.jsonを初期化:
   ```
   npm init -y
   ```

3. 必要なパッケージをインストール:
   ```
   npm install --save-dev typescript express body-parser
   ```

4. TypeScript設定ファイル(tsconfig.json)を作成:
   ```
   npx tsc --init
   ```

5. tsconfig.jsonを以下のように更新:
   ```json
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
   ```

6. プロジェクト構造を作成:
   ```
   mkdir src public dist
   ```

7. package.jsonにスクリプトを追加:
   ```json
   {
     "scripts": {
       "build": "tsc",
       "start": "node server.js"
     }
   }
   ```

## プロジェクト構造
```
typescript-tutorial02/
│
├── public/
│   ├── form.html
│   └── result.html
│
├── src/
│   ├── form.ts
│   └── result.ts
│
├── dist/
│   ├── form.js
│   └── result.js
│
├── package.json
├── tsconfig.json
└── server.js
```

## 主要ファイルの内容

### src/form.ts
```typescript
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inputForm') as HTMLFormElement;
    const input = document.getElementById('inputText') as HTMLInputElement;

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const inputValue = input.value;
        
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputValue }),
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = `/result.html?text=${encodeURIComponent(data.text)}`;
        })
        .catch(error => console.error('Error:', error));
    });
});
```

### src/result.ts
```typescript
document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get('text') || '';

    let resultText = text;
    if (!isNaN(Number(text))) {
        resultText += '<br>これは数字です';
    }

    resultDiv.innerHTML = resultText;
});
```

### server.js
```javascript
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/form.html'));
});

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/result.html'));
});

app.post('/submit', (req, res) => {
  const { text } = req.body;
  res.json({ text });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

### public/form.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Input Form</title>
</head>
<body>
    <h1>Input Form</h1>
    <form id="inputForm">
        <input type="text" id="inputText" name="inputText" required>
        <button type="submit">Submit</button>
    </form>
    <script src="/dist/form.js"></script>
</body>
</html>
```

### public/result.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Result</title>
</head>
<body>
    <h1>Result</h1>
    <div id="result"></div>
    <script src="/dist/result.js"></script>
</body>
</html>
```

## 実行手順

1. TypeScriptファイルをコンパイル:
   ```
   npm run build
   ```

2. サーバーを起動:
   ```
   npm start
   ```

3. ブラウザで `http://localhost:8080` にアクセスすると、フォームが表示されます。

このプロジェクトでは、TypeScriptを使用してクライアントサイドのロジックを実装し、Express.jsを使用してサーバーサイドの処理を行っています。フォームからの入力を受け取り、その結果を別のページに表示する基本的な機能が実装されています。