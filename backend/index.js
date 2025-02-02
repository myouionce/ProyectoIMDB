const mongoose = require("mongoose");
var server = require('./server');
const config = require('./config.js');

// Cadena de conexión a MongoDB Atlas
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB}/${config.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos se ha realizado correctamente");

        // CREAR EL SERVIDOR WEB CON NODEJS
        server.listen(config.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
        });
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));