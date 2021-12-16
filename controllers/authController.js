const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        //Verificar si email existe
        //Findone encuentra en la coleccion de objetos un objeto que tenga el correo enviado
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false'
            });
        }


        //Verificar contraseña
        //comparesync compara la contraseña recibida con la contraseña del usuario en la bd
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }


        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            msg: 'Login ok',
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}





module.exports = {
    login
}