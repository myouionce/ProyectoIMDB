var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var MovieSchema = Schema({
    "id": Number,
    "nombre": String,
    "nacimiento": Date,
    "biografia": String,
    "fotoPrincipal": String,
    "fotosExtra":[String]
});

module.exports = mongoose.model('peliculas', MovieSchema);