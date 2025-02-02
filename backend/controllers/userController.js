var user = require('../models/user');
var admin = require('../models/administration');

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
        const adminSearch = await admin.findOne({correo:userEmail});
        

        if (adminSearch) {
            const isMatchAdmin = await adminSearch.matchPassword(userPass);
            if (!isMatchAdmin) {
                return res.status(401).send({ message: 'Contraseña o usuario  incorrecto',"flag":false});
            }
            return res.status(200).send({ message:"Login exitoso","flag":true,"rol":1});
        }

        const userSearch = await user.findOne({correo:userEmail});
        
        if (!userSearch) {
            return res.status(404).send({ message: 'El usuario no existe',"flag":false});
        }
        
        const isMatch = await userSearch.matchPassword(userPass);
        
        if (!isMatch) {
            return res.status(401).send({ message: 'Contraseña o usuario  incorrecto',"flag":false });
        }

        return res.status(200).send({ message:"Login exitoso","flag":true,"rol":0});
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

userCtrl.createAdmin = async (req, res) => {
    try {
        const { name, correo, contrasena } = req.body;
        const userExists = await admin.findOne({ correo });

        if (userExists) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }

        const newUser = new admin({ name, correo, contrasena });
        newUser.contrasena = await newUser.encrypPassword(contrasena); // Encriptar la contraseña

        await newUser.save();
        return res.status(201).send({ message: 'Usuario creado correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al crear el usuario' });
    }
}

module.exports = userCtrl;