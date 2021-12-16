const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');






const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    //asi se desestructura un arreglo
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.status(401).json({
        msg: "Usuario recibidos",
        total,
        usuarios
    });

}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    //Aislar datos y extraer el resto
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: Validar contrase;a base de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "Usuario actualizado",
        usuario
    });
}


const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en BD
    await usuario.save();

    res.json({
        msg: "Usuario creado",
        usuario
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: "Usuario eliminado",
        usuario,
    });
    
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}