var express = require('express');

var ActorController = require('../controllers/actorController');

var api = express.Router();
/*Rutas para el servicio de actores*/

// Métodos GET
api.get('/Actors', ActorController.getActors);
api.get('/Actors/:id', ActorController.getActorById);
api.get('/ActorsFiltered', ActorController.getActorByFilters);
api.get('/getReparto/:id', ActorController.getReparto);

// Métodos POST
api.post('/saveActor', ActorController.createActor);
api.post('/addActorMovie', ActorController.addAMovieActor); // Ruta que vincula películas con un actor

// Métodos PUT
api.put('/Actors/:id', ActorController.editActorById);

// Métodos DELETE
api.delete('/deleteActor/:id', ActorController.deleteActor);
api.delete('/deleteActorMovies', ActorController.deleteMovieActor); // Ruta que borra la relación entre películas y un actor


module.exports = api;