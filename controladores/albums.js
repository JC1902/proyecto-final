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
      categorias: req.body.categorias,
    });

    nuevoAlbum.save()
    .then((error, album) => {
      if(error) {
        console.log(error);
      }
      res.send(album);
    })
  });

  // Obtener un álbum por categoría
  app.get('/musica/:categoria', (req, res) => {
    EsquemaAlbum.find({categorias: { $in: [req.params.categoria] }}, 'nombre artista picker genero imagen categorias')
    .then((albumes) => {
      res.send(albumes);
    })
    .catch((error) => {
      console.log(error);
    });
  });


  // Obtener todos los albumes ,passport.authenticate('jwt', { session: false }),
  app.get('/musica', (req, res) => {
    EsquemaAlbum.find({}, 'nombre artista picker genero imagen categorias')
    .then((albumes) => {
      res.send(albumes);
    })
    .catch((error) => {
      console.log(error);
    });
  });

}
