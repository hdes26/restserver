const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    //Verificar si el rol existe
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}


const emailExiste = async(correo='') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya esta registrado`);
    }
}

const existeUsuarioiPorId = async(id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioiPorId
}