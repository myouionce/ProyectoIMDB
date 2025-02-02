var express = require('express');

var collectionsController = require('../controllers/collectionsController');

var api = express.Router();

api.get('/getGenders',collectionsController.getGender);

module.exports = api;