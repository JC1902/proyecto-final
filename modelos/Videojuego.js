const mongoose = require('mongoose');
const Esquema = mongoose.Schema;
const EsquemaVideojuego = new Esquema({
  nombre: String, 
  sinopsis: String,
  anhopub: Number,
  desarrolladora: String,
  genero: String,
  urlImg: String,
});

const Videojuego = mongoose.model('Videojuego', EsquemaVideojuego);
module.exports = Videojuego;