var express = require('express');

var MovieController = require('../controllers/movieController');

var api = express.Router();
/*Rutas para el servicio de peliculas*/

//Metodos get 
api.get('/Movies', MovieController.getMovies); //ruta para recuperar todas la peliculas
api.get('/Movies/:id', MovieController.getMovieById);// ruta para recuperar la informacion de una sola pelicula por Id
api.get('/MoviesFiltered', MovieController.getMovieByFilters);// ruta confiltrados
api.get('/getTrabajos/:id', MovieController.getTrabajos);

//Metodos post
api.post('/saveMovie', MovieController.createMovie);// ruta que guarda una nueva pelicula

//Metodos put
api.put('/Movies/:id', MovieController.editMovieById);// ruta que modifica una pelicula
api.put('/addActorsMovie', MovieController.addActorMovie);//ruta que vincula actores con las peliculas

//Metodos delete
api.delete('/deleteMovie/:id', MovieController.deleteMovieById);//ruta que borra pelicualas del catalogo
api.delete('/deleteActorsMovie', MovieController.deleteActorMovie);//ruta que borra la relacion entre peliculas y actores



module.exports = api;