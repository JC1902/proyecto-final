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
      genero: req.body.genero
    });

    nuevoJuego.save()
      .then((error,videojuego) => {
        if(error){
          console.log(error);
        }
        res.send(videojuego);
      });
  });

  //Obtener un videojuego
  app.get('/api/videojuegos/calif/:id', (req, res) =>{
    const calificacion = new Rating({
      videojuego_id: req.params.id,
      user_id: req.params.user_id,
      calif: req.body.calif,
    });

    calificacion.save(function(error, calif) {
      if(error) { console.log(error); }

      res.send({
        videojuego_id: calificacion.pelicula_id,
        user_id: calificacion.user_id,
        calif: calificacion.calif,
      });
    });
  });

  //Eliminar un videojuego por id
  app.delete('/videojuegos/:id', (req, res) => {
    EsquemaVideojuego.deleteOne({_id: req.params.id})
      .then((error, videojuego) => {
        if(error){
          console.error(error);
          res.send(error);
        } else {
          res.end({estado: eliminado});
        }
      });
  });

  app.delete('videojuegos', (req, res) => {
    EsquemaVideojuego.deleteMany({})
      .then((error) => {
        if(error) {
          console.error(error);
          res.send(error);
        } else {
          res.end({estado: eliminado});
        }
      });
  });
}