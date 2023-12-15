const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Esquema = mongoose.Schema;
const EsquemaUsuario = new Esquema ({
    nombre: String,
    email: String,
    contrasenha: String,
});

const Usuario = mongoose.model('Usuario', EsquemaUsuario);
module.exports = Usuario;

module.exports.crearUsuario = (nuevoUsuario, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        if (err) {
            return callback(err);
        }

        bcryptjs.hash(nuevoUsuario.contrasenha, salt, (error, hash) => {
            if (error) {
                return callback(error);
            }

            // Almacenar la contraseña encriptada
            const nuevoRecursousuario = new Usuario({
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                contrasenha: hash,
            });

            // Guardar el nuevo usuario en la base de datos
            nuevoRecursousuario.save()
                .then(savedUsuario => {
                    callback(null, savedUsuario);
                })
                .catch(saveError => {
                    callback(saveError);
                });
        });
    });
};

module.exports.obtenerUsuarioPorEmail = (email, callback) => {
    const consulta = { email: email };
    console.log(email);
    Usuario.findOne(consulta)
        .then((usuarioEncontrado) => {
            console.log('Usuario encontrado:', usuarioEncontrado); // Add this line
            callback(null, usuarioEncontrado);
        })
        .catch((error) => {
            console.error('Error en la consulta a la base de datos:', error);
            callback({ mensaje: 'Error en la consulta a la base de datos' });
        });
};

module.exports.comparaContrasenha = (contrasenhaCandidato, hash, callback) => {
    bcryptjs.compare(contrasenhaCandidato, hash, (err, coincide) => {
        if (err) throw err;
        callback(null, coincide);
    });
};