var mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

/**
 * @typedef {Object} User
 * @property {string} name - Nombre del usuario
 * @property {string} correo - Correo electrónico del usuario
 * @property {string} contrasena - Contraseña del usuario
 */

var UserSchema = new Schema({
    "name": { type: String, required: true },
    "correo": { type: String, required: true },
    "contrasena": { type: String, required: true }
});

/**
 * Encripta la contraseña del usuario.
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<string>} - Contraseña encriptada
 */
UserSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

/**
 * Compara la contraseña ingresada con la contraseña en la base de datos.
 * @param {string} password - Contraseña ingresada por el usuario
 * @returns {Promise<boolean>} - Resultado de la comparación
 */
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.contrasena);
}

module.exports = mongoose.model('usuarios', UserSchema);