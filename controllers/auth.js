const { response, request } = require('express');


const login = async (req = request, res = response) => {
    try {
        res.json( {
                msg: 'Hola'
            })
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    login
}
