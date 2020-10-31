const mongoose = require ('mongoose');

const livroSchema = mongoose.Schema ({
  titulo: {type: String, required: true},
  id: {type: String, required: true},
  autor: {type: String, required: true},
  nPaginas: {type: String, required: true}
})

module.exports = mongoose.model('Livro',livroSchema);
