var Movie = require('../models/movie');
var actorXmovie = require('../models/actorXmovie');

const movieCtrl = {};

//Controlador que contiene la lógica de negocio de las películas.


/**
 * @description Recupera todas las películas del catálogo
 * @route GET /Movies
 * @returns {Object} 200 - Lista de películas
 * @returns {Error} 500 - Error al obtener las películas
 */
movieCtrl.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});

        if (!movies) {
            return res.status(404).send({ error: { name: "instanceNotFFoundError", "message": "No se encontraron peliculas" } });
        }
        return res.status(200).send({ movies });
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener las películas' });
    }
}

/**
 * @description Recupera todas las peliculas de un actor
 * @route GET /getTrabajos
 * @returns {Object} 200 - Lista de trabajos
 * @returns {Error} 404 - No se encontraron peliculas
 * @returns {Error} 500 - Error al obtener los peliculas
 */
movieCtrl.getTrabajos = async (req, res) => {
    try {
        const actorId = req.params.id;
        const trabajos = await actorXmovie.find({ "idActor": actorId });

        if (!trabajos || trabajos.length === 0) {
            return res.status(404).send({ message: 'No se encontraron trabajos para este actor' });
        }

        const peliculas = [];
        for (const movie of trabajos) {
            const trabajo = await Movie.findById(movie.idPelicula);
            if (trabajo) {
                peliculas.push(trabajo);
            }
        }

        return res.status(200).send({ peliculas });
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener los trabajos' });
    }
}

/**
 * @description Recupera una película por su ID
 * @route GET /Movies/:id
 * @param {string} id - ID de la película
 * @returns {Object} 200 - Película encontrada
 * @returns {Error} 404 - Película no encontrada
 * @returns {Error} 500 - Error al obtener la película
 */
movieCtrl.getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;

        const movies = await Movie.findById(movieId);

        if (!movies) {
            return res.status(404).send({ error: { name: "instanceNotFFoundError", "message": "Pelicula no encontrada.", details: { item: "pelicula", "id": movieId } } });
        }
        return await res.status(200).send({ movies });
    } catch (err) {

        return res.status(500).send({ message: 'Error al obtener las películas' });
    }
}
/**
 * @description Edita una película por su ID
 * @route PUT /Movies/:id
 * @param {string} id - ID de la película
 * @param {Object} updateData - Datos a actualizar
 * @returns {Object} 200 - Película actualizada
 * @returns {Error} 404 - Película no encontrada
 * @returns {Error} 500 - Error al actualizar la película
 */
movieCtrl.editMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const updateData = req.body;

        const movie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });

        if (!movie) {
            return res.status(404).send({ error: { name: "instanceNotFFoundError", "message": "Pelicula no encontrada.", details: { item: "pelicula", "id": movieId } } });
        }
        return res.status(200).send({ movie });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al actualizar la película' });
    }
}
/**
 * @description Busca n cantidad de peliculas dependiendo de multiples filtrados
 * @route get /MoviesFiltered
 * @param {Object} updateData - Datos de filtrado -genero,palabra,anno,rating,ordenar por, tipo de orden
 * @returns {Array} 200 - Lista de peliculas
 * @returns {Error} 404 - No existen peliculas con estos filtros
 * @returns {Error} 500 - Error al encontrar las película
 */
movieCtrl.getMovieByFilters = async (req, res) => {
    try {
        const { genre, keywords, year, rating, sortBy, order } = req.query;

        // Construir el objeto de filtros
        let filters = {};
        if (genre) {
            filters.genero = { $in: genre.split(',') }; // Permite múltiples géneros separados por comas
        }
        if (keywords) {
            filters.titulo = { $regex: keywords, $options: 'i' }; // Búsqueda insensible a mayúsculas
        }
        if (year) {
            filters.lanzamiento = { $regex: `${year}$`, $options: 'i' }; // Filtrar por año de lanzamiento al final de la cadena
        }
        if (rating) {
            filters.calificacion = { $gte: rating }; // Filtrar por clasificación mínima
        }

        // Construir el objeto de ordenación
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1; // Orden ascendente o descendente
        }



        const movies = await Movie.find(filters).sort(sortOptions);

        if (!movies || movies.length === 0) {
            return res.status(404).send({ error: { name: "instanceNotFFoundError", "message": "No se encontraron peliculas con estas caracteristicas" } });
        }
        return res.status(200).send({ movies });
    } catch (err) {
        console.error('Error al obtener las películas:', err); // Agregar log para depuración
        return res.status(500).send({ message: 'Error al obtener las películas,error interno del servidor', error: err.message });
    }
}

/**
 * @description Agrega una nueva pelicula
 * @route POST /saveMovie
 * @param {body} id - datos para agregar una pelicula- titulo,fotos,genero,director,lanzamiento,calificacion
 * @returns {Object} 201 - Película creada 
 * @returns {Error} 500 - Error al crear la película
 */

movieCtrl.createMovie = async (req, res) => {
    try {
        const { titulo, descripcion, genero, director, lanzamiento, calificacion, portada, fotosExtra } = req.body;
        const newMovie = new Movie({ titulo, descripcion, genero, director, lanzamiento, calificacion, portada, fotosExtra });
        const datanewMovie = await newMovie.save();
        return res.status(201).send({ message: 'Pelicula creada correctamente' ,"id":datanewMovie._id});
    } catch (err) {
        return res.status(500).send({ message: 'Error al crear la pelicula' });
    }
}
/**
 * @description Elimina una película por su ID
 * @route DELETE /Movies/:id
 * @param {string} id - ID de la película
 * @returns {Object} 200 - Película eliminada
 * @returns {Error} 404 - Película no encontrada
 * @returns {Error} 500 - Error al eliminar la película
 */
movieCtrl.deleteMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        await actorXmovie.deleteMany({ "idPelicula": movieId });
        const answerDelete = await Movie.findByIdAndDelete(movieId);

        if (!answerDelete) {
            return res.status(404).send({ error: { name: "instanceNotFFoundError", "message": "La pelicula no existe en el catalogo", details: { item: "pelicula", "id": movieId } } });
        }
        return res.status(200).send({ message: 'Pelicula eliminada correctamente', "pelicula": { "id": answerDelete._id, "titulo": answerDelete.titulo } });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar la pelicula' });
    }
}
/**
 * @description Agrega actores a una película
 * @route POST /addActorMovie
 * @param {string} idPelicula - ID de la película
 * @param {Array} listaActor - Lista de actores a agregar
 * @returns {Object} 200 - Actores agregados a la película
 * @returns {Error} 400 - Actor ya relacionado con la película
 * @returns {Error} 500 - Error al agregar actores a la película
 */
movieCtrl.addActorMovie = async (req, res) => {
    try {
        const { idPelicula, listaActor } = req.body;
        
        for (const actor of listaActor) {
            const existingRelation = await actorXmovie.findOne({ idPelicula, idActor: actor._id });
            if (existingRelation) {
                return res.status(400).send({ message: `El actor: ${actor.nombre} ya está relacionado con la película` });
            }

            const newActorXMovie = new actorXmovie({ idPelicula, idActor: actor._id });
            await newActorXMovie.save();
        }

        return res.status(200).send({ message: 'Actores agregados a la película correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al agregar actores a la película' });
    }
}
/**
 * @description Borrar actores a una película
 * @route POST /deleteActorsMovie
 * @param {string} idPelicula - ID de la película
 * @param {Array} listaActor - Lista de actores a agregar
 * @returns {Object} 200 - Actores eliminados a la película
 * @returns {Error} 400 - Actor ya relacionado con la película
 * @returns {Error} 500 - Error al agregar actores a la película
 */
movieCtrl.deleteActorMovie = async (req, res) => {
    try {
        const { idPelicula, listaActor } = req.body;
       

        for (const actor of listaActor) {


            await actorXmovie.findOneAndDelete({ idPelicula, idActor: actor._id });
        }

        return res.status(200).send({ message: 'Actores eliminados de la película correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al agregar actores a la película' });
    }
}

module.exports = movieCtrl;