var express = require('express');

var UserController = require('../controllers/userController');

var api = express.Router();

api.get('/auth/:email/:password',UserController.ValidateUser);
api.post('/saveUser', UserController.createUser); // Ruta para crear un usuario


module.exports = api;