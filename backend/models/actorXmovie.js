var mongoose =  require('mongoose');

var Schema = mongoose.Schema

/**
 * @typedef {Object} ActorXMovie
 * @property {string} idActor - ID del actor
 * @property {string} idPelicula - ID de la película
 */

var actorXmovieSchema = Schema({
    "idPelicula":{type: String,required:true},
    "idActor":{type: String,required:true}
});

module.exports = mongoose.model('peliculasxactores', actorXmovieSchema);