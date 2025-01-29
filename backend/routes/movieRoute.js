var express = require('express');

var MovieController = require('../controllers/movieController');

var api = express.Router();

api.get('/Movies',MovieController.getMovies);


module.exports = api;