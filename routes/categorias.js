const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, esAdminRole } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

//Crear categoria  - privado - Cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],
    crearCategoria
);
//Actualizar - privado - cualquier con token valido 
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligarorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],
    actualizarCategoria
);

//Borrar una categoria - privado - cualquier con token valido 
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],
    borrarCategoria
);





module.exports = router;