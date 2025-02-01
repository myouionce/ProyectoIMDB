var user = require('../models/user');

const userCtrl ={};

/**
 * @description Valida las credenciales de un usuario
 * @route GET /validateUser/:email/:password
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Object} 200 - Usuario autenticado correctamente
 * @returns {Error} 401 - Contraseña incorrecta
 * @returns {Error} 404 - El usuario no existe
 * @returns {Error} 500 - Error al validar el usuario
 */

userCtrl.ValidateUser = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const userPass = req.params.password;
        const userSearch = await user.findOne({correo:userEmail});

        
        
        if (!userSearch) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }
        
        const isMatch = await userSearch.matchPassword(userPass);
        
        if (!isMatch) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }

        return res.status(200).send({ message: 'Usuario autenticado correctamente' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al obtener las películas' });
    }
}
/**
 * @description Crea un nuevo usuario
 * @route POST /createUser
 * @param {Object} req.body - Datos del usuario a crear
 * @param {string} req.body.name - Nombre del usuario
 * @param {string} req.body.correo - Correo electrónico del usuario
 * @param {string} req.body.contrasena - Contraseña del usuario
 * @returns {Object} 201 - Usuario creado correctamente
 * @returns {Error} 500 - Error al crear el usuario
 */
userCtrl.createUser = async (req, res) => {
    try {
        const { name, correo, contrasena } = req.body;
        const userExists = await user.findOne({ correo });

        if (userExists) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }

        const newUser = new user({ name, correo, contrasena });
        newUser.contrasena = await newUser.encrypPassword(contrasena); // Encriptar la contraseña

        await newUser.save();
        return res.status(201).send({ message: 'Usuario creado correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al crear el usuario' });
    }
}

module.exports = userCtrl;