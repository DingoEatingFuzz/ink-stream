const express = require('express');
const path = require('path');
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');

const Counter = importJsx('./counter');

const app = express();

app.listen(4000, () => {
  console.log('Listening on http://localhost:4000');
});

app.get('/logs', (req, res, next) => {
  render(React.createElement(Counter), res);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
