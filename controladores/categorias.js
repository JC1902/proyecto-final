const EsquemaCategoria = require('../modelos/Categoria');

module.exports.controller = (app) => {

  // Agregar una nueva categoría
  app.post('/categorias', (req, res) => {
    const nuevaCategoria = new EsquemaCategoria({
      nombre: req.body.nombre,
      referencias: req.body.referencias,
    });

    nuevaCategoria.save()
      .then((categoria) => {
        res.send(categoria);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Obtener todas las categorias
  app.get('/categorias', (req, res) => {
    EsquemaCategoria.find({}, 'nombre referencias')
      .then((categorias) => {
        console.log("Todo bien");
        res.status(200).send(categorias);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error al obtener las categorías');
      });
  });

  // Obtener categorias especificas
  app.get('/categorias/:nombre', (req, res) => {
    EsquemaCategoria.find({ nombre: req.params.nombre }, 'nombre referencias')
      .then((categorias) => {
        res.send(categorias);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.put('/categorias', (req, res) => {
    EsquemaCategoria.updateOne({nombre: req.body.nombre}, { $push: { referencias: req.body.nuevo_valor } })
      .then((registro) => {
        res.send(registro);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}