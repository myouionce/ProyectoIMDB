var user = require('../models/user');

const userCtrl ={};

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

userCtrl.createUser = async (req, res) => {
    try {
        const { name, correo, contrasena } = req.body;
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