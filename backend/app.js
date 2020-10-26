const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const livros = [
  {
    id: '1',
    titulo: 'Vinte Mil Léguas Submarinas',
    autor: 'Júlio Verne',
    nPaginas: '242'
  },
  {
    id: '2',
    titulo: 'Da Terra à Lua',
    autor: 'Júlio Verne',
    nPaginas: '191'
  }
]

app.use ( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.post('/api/livros', (req, res, next) => {
  const livro = req.body;
  console.log(livro);
  res.status(201).json({mensagem: 'Livro inserido'});
});

app.use ('/api/livros', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK!",
    livros: livros
  });
})

module.exports = app;
