const mongoose = require('mongoose');
const Esquema = mongoose.Schema;
const EsquemaResena = new Esquema ({
    videojuego_id: String,
    user_id: String,
    resena: String,
});

const Resena = mongoose.model('Resena', EsquemaResena);
module.exports = Resena;