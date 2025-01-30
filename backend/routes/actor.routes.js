var express = require('express');

var ActorController = require('../controllers/actorController');

var api = express.Router();
/*Rutas para el servicio de actores*/
api.get('/Actors', ActorController.getActors);
api.get('/Actors/:id', ActorController.getActorById);
api.put('/Actors/:id', ActorController.editActorById);
api.get('/ActorsFiltered', ActorController.getActorByFilters);
api.post('/saveActor', ActorController.createActor);


module.exports = api;