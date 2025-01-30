var Actor = require('../models/actor');

const actorCtrl ={};

actorCtrl.getActors = async (req, res) => {
    try{
        const actores = await Actor.find({});

        if (!actores){
            return res.status(404).send({ message: 'No se encontraron actores '});
        }
        return res.status(200).send({ actores });

    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener los actores' });
    }
}

actorCtrl.getActorById = async (req, res) => {
    try {
        const actorID = req.params.id;
        const actores = await Actor.findById(actorID);

        if (!actores) {
            return res.status(404).send({ message: 'No se encontraron actores' });
        }
        return await res.status(200).send({actores});
    } catch (err) {
        return res.status(500).send({ message: 'Error al obtener los actores'});
    }
}

actorCtrl.editActorById = async (req, res) => {
    try {
        const actorID = req.params.id;
        const updateData = req.body;

        const actor = await Actor.findByIdAndUpdate(actorID, updateData, { new: true });
        if (!actor){
            return res.status(404).send({ message: 'Actor no encontrado' });
        }
        return res.status(200).send({ actor });
    } catch (err) {
        return res.status(500).send({ message: 'Error al actualizar al actor' });
    }
}

actorCtrl.getActorByFilters = async (req, res) => {
    try {
        const { keywords } = req.query;
        let filters = {};

        filters.nombre = { $regex: keywords, $options: 'i'};

        const actores = await Actor.find(filters);
        if(!actores || actores.length === 0) {
            return res.status(404).send({ message: 'No se encontraron actores' });
        }
        return res.status(200).send({actores});
    } catch (err){
        return res.status(500).send({ message: 'Error al obtener los actores', error: err.message});
    }
}

actorCtrl.createActor = async (req, res) => {
    try {
        const { nombre, nacimiento, biografia, fotoPrincipal, fotosExtra } = req.body;
        const newActor = new Actor({nombre, nacimiento, biografia, fotoPrincipal, fotosExtra});
        await newActor.save();
        return res.status(201).send({ message: 'Actor creado correctamente' });
    } catch (err) {
        return res.status(500).send({message: 'Error al crear al actor' });
    }
}
module.exports = actorCtrl;
