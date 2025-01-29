const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var movies_routes = require('./routes/movieRoute'); 


app.use(cors());
app.use(bodyParser.json());
app.use('/admin', movies_routes);

module.exports = app;

