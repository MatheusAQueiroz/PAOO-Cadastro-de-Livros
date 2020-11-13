const express = require('express');
const router = express.Router();
const Livro = require('../models/livro');

router.post('', (req, res, next) => {
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

router.get('', (req, res, next) => {
  Livro.find().then( documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK!",
      livros: documents
    });
  })
})

router.delete('/:id', (req, res, next) => {
  Livro.deleteOne({_id: req.params.id}).then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Livro removido"});
  })
})

router.get('/:id', (req, res, next) => {
  Livro.findById(req.params.id).then(liv => {
    if (liv) {
      res.status(200).json(liv);
    }
    else res.status(404).json({mensagem: "Livro não encontrado!"})
  })
})

router.put('/:id', (req, res, next) => {
  const livro = new Livro({
    _id: req.params.id,
    titulo: req.body.titulo,
    id: req.body.id,
    autor: req.body.autor,
    nPaginas: req.body.nPaginas,
  });
  Livro.updateOne({_id: req.params.id}, livro)
  .then ((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({mensagem: 'Atualização realizada com sucesso!'});
})

module.exports = router;
