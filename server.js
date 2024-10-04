const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

//app.use(express.static(path.join(__dirname, '.')));
//app.use(express.static(path.join(__dirname, 'public')));
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