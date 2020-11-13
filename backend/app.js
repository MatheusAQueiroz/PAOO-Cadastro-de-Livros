const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Livro = require('./models/livro');
const livroRoutes = require('./rotas/livros');

mongoose.connect('mongodb+srv://root:Z7xhoYRbLZhS19aY@m0-cluster.nzqhq.mongodb.net/app-mean?retryWrites=true&w=majority')
.then( () => {
  console.log('Conexão OK');
}).catch( () => {
  console.log('Conexão NOK');
})
app.use(bodyParser.json())

app.use ( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

app.use('/api/livros', livroRoutes);

module.exports = app;
