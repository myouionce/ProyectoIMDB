var express = require('express');

var ActorController = require('../controllers/actorController');

var api = express.Router();
/*Rutas para el servicio de actores*/

//Metodos GET
api.get('/Actors', ActorController.getActors);
api.get('/Actors/:id', ActorController.getActorById);
api.get('/ActorsFiltered', ActorController.getActorByFilters);
api.get('/getReparto/:id',ActorController.getReparto)

//Metodos POST
api.post('/saveActor', ActorController.createActor);

//Metodos PUT
api.put('/Actors/:id', ActorController.editActorById);

//Metodos DELETE
api.delete('/deleteActor',ActorController.deleteActor);


module.exports = api;