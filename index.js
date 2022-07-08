const express = require('express');
const path = require('path');
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const stream = require('stream');

class B64Stream extends stream.Transform {
  _transform(chunk, enc, next) {
    this.push(JSON.stringify({ frame: chunk.toString('base64') }) + '\n');
    next();
  }
}

const Counter = importJsx('./counter');

const app = express();

app.listen(4000, () => {
  console.log('Listening on http://localhost:4000');
});

app.get('/logs', (req, res, next) => {
  render(React.createElement(Counter), res);
});

app.get('/logs-b64', (req, res, next) => {
  const b64 = new B64Stream();
  b64.pipe(res);

  render(React.createElement(Counter), b64);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
