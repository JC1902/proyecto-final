const EsquemaVideojuego = require('../modelos/Videojuego');
const Calificacion = require('../modelos/Calificacion');
const EsquemaResena = require('../modelos/Resena');
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

  app.post('/videojuegos/resena/:id', (req, res) => {
    const resena = new EsquemaResena({
      videojuego_id: req.params.id,
      user_id: req.params.user_id,
      resena: req.body.resena,
    });

    resena.save()
    .then((error, rese) => {
      if (error) {
        console.log(error);
      }
      res.send(resena);
    });
  });

  app.get('/videojuegos/resena/:id', (req, res) => {
    const videojuegoId = req.params.id;

    Resena.find({videojuego_id: videojuegoId}, (error, resenas) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al intentar obtener las reseñas');
      }
      res.send(resenas);
    });
  });
}