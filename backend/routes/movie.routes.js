var express = require('express');

var MovieController = require('../controllers/movieController');

var api = express.Router();
/*Rutas para el servicio de peliculas*/
api.get('/Movies', MovieController.getMovies);
api.get('/Movies/:id', MovieController.getMovieById);
api.put('/Movies/:id', MovieController.editMovieById);
api.get('/MoviesFiltered', MovieController.getMovieByFilters);
api.post('/saveMovie', MovieController.createMovie);



module.exports = api;