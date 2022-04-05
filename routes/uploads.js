const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarArhivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');




const router = Router();


router.post('/', validarArhivoSubir,cargarArchivo);

router.put('/:coleccion/:id', [
    validarArhivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagenCloudinary);
//], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
],mostrarImagen )



module.exports = router;