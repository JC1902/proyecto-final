const mongoose = require('mongoose');
const Esquema = mongoose.Schema;

const EsquemaAlbum = new Esquema ({
  nombre: String,
  artista: String,
  genero: String,
  picker: Date,
  imagen: String,
  categorias: [String],
});

const Album = mongoose.model('Album', EsquemaAlbum);
module.exports = Album;