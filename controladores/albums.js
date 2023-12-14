const EsquemaAlbum = require('../modelos/Album');
const Calificacion = require('../modelos/Calificacion');
const passport = require('passport');

module.exports.controller = (app) => {

  // Agregar un álbum
  app.post('/musica', (req, res) => {
    const nuevoAlbum = new EsquemaAlbum ({
      nombre: req.body.nombre,
      artista: req.body.artista,
      picker: req.body.picker,
      genero: req.body.genero,
    });

    nuevoAlbum.save()
    .then((error, album) => {
      if(error) {
        console.log(error);
      }
      
      res.send(album);
      
    })
  });
}
