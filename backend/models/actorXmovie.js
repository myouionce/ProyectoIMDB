var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var actorXmovieSchema = Schema({
    "idPelicula":{type: String,required:true},
    "idActor":{type: String,required:true}
});

module.exports = mongoose.model('peliculasxactores', actorXmovieSchema);