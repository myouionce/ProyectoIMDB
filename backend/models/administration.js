var mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema

var administrationSchema = new Schema({
    "name": { type: String, required: true },
    "correo": { type: String, required: true },
    "contrasena": { type: String, required: true }
});

administrationSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

/**
 * Compara la contraseña ingresada con la contraseña en la base de datos.
 * @param {string} password - Contraseña ingresada por el usuario
 * @returns {Promise<boolean>} - Resultado de la comparación
 */
administrationSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.contrasena);
}


module.exports = mongoose.model('administrations', administrationSchema);