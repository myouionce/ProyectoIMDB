var Movie = require('../models/movie');

async function getMovies(req, res) {
    try {
        const movies = await Movie.find({});
        if (!movies) {
            return res.status(404).send({ message: 'No se encontraron películas' });
        }
        return res.status(200).send({ movies });
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener las películas' });
    }
}


module.exports = {
    getMovies
};