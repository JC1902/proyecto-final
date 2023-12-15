const EsquemaCategoria = require('../modelos/Categoria');

module.exports.controller = (app) => {

  // Agregar una nueva categoría
  app.post('/musica/categorias', (req, res) => {
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
  app.get('/musica/categorias', (req, res) => {
    EsquemaCategoria.find({}, 'nombre referencias')
      .then((categorias) => {
        res.send(categorias);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // Obtener categorias especificas
  app.get('/musica/categorias/:nombre', (req, res) => {
    EsquemaCategoria.find({ nombre: req.params.nombre }, 'nombre referencias')
      .then((categorias) => {
        res.send(categorias);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.put('/musica/categorias/:id', (req, res) => {
    const { id } = req.params;
    const nuevosDatos = req.body;

    EsquemaCategoria.findByIdAndUpdate(id, nuevosDatos, { new: true })
      .then((registro) => {
        res.send(registro);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}