const { Router } = require('express');
const { check } = require('express-validator');


const { esRoleValido, emailExiste, existeUsuarioiPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarioController');

const router = Router();



router.get('/', usuariosGet);
router.put('/:id', [

    // Validaciones
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom((id) => existeUsuarioiPorId(id)),
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos

], usuariosPut);

router.post('/', [

    // Validaciones
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe terner mas de 6 digitos').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom((correo) => emailExiste(correo)),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos

], usuariosPost);
router.delete('/:id', [
    // Validaciones
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom((id) => existeUsuarioiPorId(id)),
    validarCampos

], usuariosDelete);




module.exports = router;