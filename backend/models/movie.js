var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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