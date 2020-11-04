const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Livro = require('./models/livro');

mongoose.connect('mongodb+srv://root:Z7xhoYRbLZhS19aY@m0-cluster.nzqhq.mongodb.net/app-mean?retryWrites=true&w=majority')
.then( () => {
  console.log('Conexão OK');
}).catch( () => {
  console.log('Conexão NOK');
})
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
  const livro = new Livro({
    titulo: req.body.titulo,
    id: req.body.id,
    autor: req.body.autor,
    nPaginas: req.body.nPaginas
  });
  livro.save()
  .then(livroInserido => {
    res.status(201).json({
      mensagem: 'Livro inserido',
      _id: livroInserido._id
    });
  })
});

app.delete('/api/livros/:id', (req, res, next) => {
  Livro.deleteOne({_id: req.params.id}).then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Livro removido"});
  })
})

app.use ('/api/livros', (req, res, next) => {
  Livro.find().then( documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK!",
      livros: documents
    });
  })
})

module.exports = app;
