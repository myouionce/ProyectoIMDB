var express = require('express');

var UserController = require('../controllers/userController');

var api = express.Router();

/*Rutas para el servicio de actores*/

api.get('/auth/:email/:password',UserController.ValidateUser);//Ruta para autentificar usuario
api.post('/saveUser', UserController.createUser); // Ruta para crear un usuario


module.exports = api;