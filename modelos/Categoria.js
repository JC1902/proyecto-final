const mongoose = require('mongoose');
const Esquema = mongoose.Schema;

const EsquemaCategoria = new Esquema({
  nombre: String,
  referencias: [String],
});

const Categoria = mongoose.model('Categoria', EsquemaCategoria);
module.exports = Categoria;