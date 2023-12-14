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
      imagen: req.body.imagen,
    });

    nuevoAlbum.save()
    .then((error, album) => {
      if(error) {
        console.log(error);
      }
      res.send(album);
    })
  });

  // Obtener todos los albumes ,passport.authenticate('jwt', { session: false }),
  app.get('/musica', (req, res) => {
    EsquemaAlbum.find({}, 'nombre artista picker genero imagen')
    .then((albumes) => {
      res.send(albumes);
    })
    .catch((error) => {
      console.log(error);
    });
  });
}
