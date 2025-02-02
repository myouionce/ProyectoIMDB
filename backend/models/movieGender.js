var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var genderSchema = Schema({
    "genero": { type: String, required: true }
});

module.exports = mongoose.model('generopeliculas', genderSchema);