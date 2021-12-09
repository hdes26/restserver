const { response, request } = require('express')



const usuariosGet = (req = request, res = response) => {

    const { nombre = 'no name', apellido, apikey, page = 1, limit } = req.query;

    res.status(401).json({
        msg: "get API - controlador",
        nombre,
        apellido,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: "put API - controlador",
        id: id
    });
}

const usuariosPost = (req, res) => {

    const body = req.body;

    res.json({
        msg: "post API - controlador",
        body: body
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete API - controlador"
    });
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}