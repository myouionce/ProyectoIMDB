const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var movies_routes = require('./routes/movie.routes');
var user_routes = require('./routes/user.routes');
var actor_routes = require('./routes/actor.routes')

app.use(cors());
app.use(bodyParser.json());
app.use(movies_routes);
app.use(user_routes);
app.use(actor_routes);

module.exports = app;

