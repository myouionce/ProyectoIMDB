/**
 * @file actorController.js
 * @description Controlador que contiene la lógica de negocio de los actores.
 */

var Actor = require('../models/actor');
var actorXmovie = require('../models/actorXmovie');

const actorCtrl = {};

/**
 * @description Recupera todos los actores del catálogo
 * @route GET /Actors
 * @returns {Object} 200 - Lista de actores
 * @returns {Error} 500 - Error al obtener los actores
 */
actorCtrl.getActors = async (req, res) => {
    try {

        const actores = await Actor.find({});

        if (!actores) {
            return res.status(404).send({ message: 'No se encontraron actores' });
        }
        return res.status(200).send({ actores });
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener los actores' });
    }
}
/**
 * @description Recupera todos los actores de una pelicula
 * @route GET /getReparto
 * @returns {Object} 200 - Lista de reparto
 * @returns {Error} 404 - No se encontraron actores
 * @returns {Error} 500 - Error al obtener los actores
 */
actorCtrl.getReparto = async (req, res) => {
    try {
        const movieId = req.params.id;

        const repartoX = await actorXmovie.find({ "idPelicula": movieId });

        if (!repartoX || repartoX.length === 0) {
            return res.status(404).send({ message: 'No se encontraron actores' });
        }

        let actores = [];
        for (const reparto of repartoX) {
            let actor = await Actor.findById(reparto.idActor);
            if (actor) {
                actores.push(actor);
            }
        }

        return res.status(200).send({ actores });
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener los actores' });
    }
}

/**
 * @description Recupera un actor por su ID
 * @route GET /Actors/:id
 * @param {string} id - ID del actor
 * @returns {Object} 200 - Actor encontrado
 * @returns {Error} 404 - Actor no encontrado
 * @returns {Error} 500 - Error al obtener el actor
 */
actorCtrl.getActorById = async (req, res) => {
    try {
        const actorID = req.params.id;
        const actores = await Actor.findById(actorID);

        if (!actores) {
            return res.status(404).send({ message: 'No se encontraron actores' });
        }
        return await res.status(200).send({ actores });
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener los actores' });
    }
}

/**
 * @description Edita un actor por su ID
 * @route PUT /Actors/:id
 * @param {string} id - ID del actor
 * @param {Object} updateData - Datos a actualizar
 * @returns {Object} 200 - Actor actualizado
 * @returns {Error} 404 - Actor no encontrado
 * @returns {Error} 500 - Error al actualizar el actor
 */
actorCtrl.editActorById = async (req, res) => {
    try {
        const actorID = req.params.id;
        const updateData = req.body;

        const actor = await Actor.findByIdAndUpdate(actorID, updateData, { new: true });
        if (!actor) {
            return res.status(404).send({ message: 'Actor no encontrado' });
        }
        return res.status(200).send({ actor });
    } catch (err) {
        return res.status(500).send({ message: 'Error al actualizar al actor' });
    }
}

/**
 * @description Recupera actores por filtros
 * @route GET /ActorsFiltered
 * @param {string} keywords - Palabras clave para buscar actores
 * @returns {Object} 200 - Lista de actores filtrados
 * @returns {Error} 404 - No se encontraron actores
 * @returns {Error} 500 - Error al obtener los actores
 */
actorCtrl.getActorByFilters = async (req, res) => {
    try {
        const { keywords } = req.query;
        let filters = {};

        filters.nombre = { $regex: keywords, $options: 'i' };

        const actores = await Actor.find(filters);
        if (!actores || actores.length === 0) {
            return res.status(404).send({ message: 'No se encontraron actores' });
        }
        return res.status(200).send({ actores });
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener los actores', error: err.message });
    }
}

/**
 * @description Crea un nuevo actor
 * @route POST /saveActor
 * @param {Object} actorData - Datos del actor a crear
 * @returns {Object} 201 - Actor creado
 * @returns {Error} 500 - Error al crear el actor
 */
actorCtrl.createActor = async (req, res) => {
    try {
        const { nombre, nacimiento, biografia, fotoPrincipal, fotosExtra } = req.body;
        const newActor = new Actor({ nombre, nacimiento, biografia, fotoPrincipal, fotosExtra });
        const savedActor = await newActor.save();
        return res.status(201).send({ message: 'Actor creado correctamente', _id: savedActor._id });
    } catch (err) {
        return res.status(500).send({ message: 'Error al crear al actor' });
    }
}

/**
 * @description Elimina un actor por su ID
 * @route DELETE /Actors/:id
 * @param {string} id - ID del actor
 * @returns {Object} 200 - Actor eliminado
 * @returns {Error} 404 - Actor no encontrado
 * @returns {Error} 500 - Error al eliminar el actor
 */
actorCtrl.deleteActor = async (req, res) => {
    try {
        const actorId = req.params.id;
        await actorXmovie.deleteMany({ "idActor": actorId });
        const answerDelete = await Actor.findByIdAndDelete(actorId);

        if (!answerDelete) {
            return res.status(404).send({ error: { name: "instanceNotFFoundError", "message": "El actor no existe en el catálogo", details: { item: "actor", "id": actorId } } });
        }
        return res.status(200).send({ message: 'Actor eliminado correctamente', "actor": { "id": answerDelete._id, "nombre": answerDelete.nombre } });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar el actor' });
    }
}
/**
 * @description Agrega películas a actor
 * @route POST /addActorMovie
 * @param {string} idActor - ID del actor
 * @param {Array} listaPeliculas - Lista de IDs de películas a agregar
 * @returns {Object} 200 - Películas agregadas al actor
 * @returns {Error} 400 - Película ya relacionada con el actor
 * @returns {Error} 500 - Error al agregar películas al actor
 */
actorCtrl.addAMovieActor = async (req, res) => {
    try {
        
        const { idActor, listaPeliculas } = req.body;
        console.log(req.body);
        for (const idPelicula of listaPeliculas) {
            const existingRelation = await actorXmovie.findOne({ idPelicula, idActor });
            if (existingRelation) {
                return res.status(400).send({ message: `La película con ID: ${idPelicula} ya está relacionada con el actor` });
            }

            const newActorXMovie = new actorXmovie({ idPelicula, idActor });
            await newActorXMovie.save();
        }

        return res.status(200).send({ message: 'Películas agregadas al actor correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al agregar películas al actor' });
    }
}

/**
 * @description Borrar películas de un actor
 * @route DELETE /deleteActorMovies
 * @param {string} idActor - ID del actor
 * @param {Array} listaPeliculas - Lista de IDs de películas a eliminar
 * @returns {Object} 200 - Películas eliminadas del actor
 * @returns {Error} 500 - Error al eliminar películas del actor
 */
actorCtrl.deleteMovieActor = async (req, res) => {
    try {
        const { idActor, listaPeliculas } = req.body;

        for (const idPelicula of listaPeliculas) {
            await actorXmovie.findOneAndDelete({ idPelicula, idActor });
        }

        return res.status(200).send({ message: 'Películas eliminadas del actor correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al eliminar películas del actor' });
    }
}
module.exports = actorCtrl;