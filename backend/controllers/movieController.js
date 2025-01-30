var Movie = require('../models/movie');

const movieCtrl ={};

movieCtrl.getMovies = async (req, res) => {
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

movieCtrl.getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        
        const movies = await Movie.findById(movieId);
        
        if (!movies) {
            return res.status(404).send({ message: 'No se encontraron películas' });
        }
        return await res.status(200).send({ movies });
    } catch (err) {
        
        return res.status(500).send({ message: 'Error al obtener las películas' });
    }
}

movieCtrl.editMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const updateData = req.body;

        const movie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });

        if (!movie) {
            return res.status(404).send({ message: 'Película no encontrada' });
        }
        return res.status(200).send({ movie });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al actualizar la película' });
    }
}

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
            filters.lanzamiento = { $regex: `^${year}`, $options: 'i' }; // Filtrar por año de lanzamiento
        }
        if (rating) {
            filters.calificacion = { $gte: rating }; // Filtrar por clasificación mínima
        }

        // Construir el objeto de ordenación
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1; // Orden ascendente o descendente
        }

        console.log('Filters:', filters); // Agregar log para depuración
        console.log('Sort Options:', sortOptions); // Agregar log para depuración

        const movies = await Movie.find(filters).sort(sortOptions);

        if (!movies || movies.length === 0) {
            return res.status(404).send({ message: 'No se encontraron películas' });
        }
        return res.status(200).send({ movies });
    } catch (err) {
        console.error('Error al obtener las películas:', err); // Agregar log para depuración
        return res.status(500).send({ message: 'Error al obtener las películas', error: err.message });
    }
}

//TODO borrar pelicula Reminder: Hacer un metodo para vincular actores con pelicula pero en el controlador respectivo

movieCtrl.createMovie = async (req, res) => {
    try {
        const { titulo, descripcion, genero, director, lanzamiento, calificacion, portada, fotosExtra } = req.body;
        const newMovie = new Movie({ titulo, descripcion, genero, director, lanzamiento, calificacion, portada, fotosExtra });
        await newMovie.save();
        return res.status(201).send({message: 'Pelicula creada correctamente'});
    } catch (err) {
        return res.status(500).send({message: 'Error al crear la pelicula'});
    }
}

module.exports = movieCtrl;