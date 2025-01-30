var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var actorSchema = Schema({
    "nombre": { type: String, required: true },
    "nacimiento": { type: Date, required: true },
    "biografia": { type: String, required: true },
    "fotoPrincipal": { type: String, required: true },
    "fotosExtra":{ type: [String], required: true }
});

module.exports = mongoose.model('actores', actorSchema);