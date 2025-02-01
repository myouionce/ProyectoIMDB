var mongoose =  require('mongoose');

var Schema = mongoose.Schema;
/**
 * @typedef {Object} Actor
 * @property {string} nombre - Nombre del actor
 * @property {Date} nacimiento - Fecha de nacimiento del actor
 * @property {string} biografia - Biografía del actor
 * @property {string} fotoPrincipal - URL de la foto principal del actor
 * @property {string[]} fotosExtra - URLs de fotos adicionales del actor
 */
var actorSchema = Schema({
    "nombre": { type: String, required: true },
    "nacimiento": { type: Date, required: true },
    "biografia": { type: String, required: true },
    "fotoPrincipal": { type: String, required: true },
    "fotosExtra":{ type: [String], required: true }
});

module.exports = mongoose.model('actores', actorSchema);