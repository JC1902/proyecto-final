const EsquemaVideojuego = require('../modelos/Videojuego');
const Calificacion = require('../modelos/Calificacion');
const passport = require('passport');

module.exports.controller = (app) => {
  //Agregar videojuego
  app.post('/videojuegos', (req, res) => {
    const nuevoJuego = new EsquemaVideojuego ({
      nombre: req.body.nombre,
      sinopsis: req.body.sinopsis,
      anhopub: req.body.anhopub,
      desarrolladora: req.body.desarrolladora, 
      genero: req.body.genero,
      imagen: req.body.imagen,
    });

    nuevoJuego.save()
      .then((error,videojuego) => {
        if(error){
          console.log(error);
        }
        res.send(videojuego);
      });
  });

  app.get('/videojuegos', (req, res) => {
    EsquemaVideojuego.find({}, 'nombre sinopsis anhopub genero imagen')
    .then((videojuegos) => {
      res.send(videojuegos);
    })
    .catch((error) => {
      console.log(error);
    });
  });

  app.get('/videojuegos/:id', (req, res) => {
    EsquemaVideojuego.findById(req.params.id, 'nombre sinopsis anhopub desarrolladora genero imagen')
    .then((videojuego) => {
      res.send(videojuego);
      console.log(videojuego);
    })
    .catch((error) => {
      console.log(error);
    });
  });
}