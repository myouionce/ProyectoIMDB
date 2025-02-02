var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * @typedef {Object} Movie
 * @property {string} titulo - Título de la película
 * @property {string} descripcion - Descripción de la película
 * @property {string[]} genero - Géneros de la película
 * @property {string} director - Director de la película
 * @property {string} lanzamiento - Año de lanzamiento de la película
 * @property {number} calificacion - Calificación de la película
 * @property {string} portada - URL de la portada de la película
 * @property {string[]} fotosExtra - URLs de fotos adicionales de la película
 */

var MovieSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    genero: { type: [String], required: true },
    director: { type: String, required: true },
    lanzamiento: { type: String, required: true },
    calificacion: { type: Number, required: true },
    portada: { type: String, required: true },
    fotosExtra: { type: [String], required: false }
});

module.exports = mongoose.model('peliculas', MovieSchema);