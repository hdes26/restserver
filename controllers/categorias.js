const { response } = require('express');
const { Categoria } = require('../models')


//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = require, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .populate('usuario', 'nombre')
                .limit(Number(limite))
        ]);

        res.json({
            total,
            categorias
        });

    } catch (error) {
        console.log(error);
    }
}
//obtenerCategoria - paginado - total - populate

const obtenerCategoria = async (req = require, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre')

        res.json(categoria);

    } catch (error) {
        console.log(error);
    }
}

const crearCategoria = async (req = require, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre })
    try {
        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ,ya existe `
            })
        }
        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }
        const categoria = new Categoria(data);

        //Guardar DB
        await categoria.save();

        res.status(201).json(categoria)

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'error'
        })
    }

}

//actualizarCategoria
const actualizarCategoria = async (req = require, res = response) => {
    try {

        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.json(categoria);

    } catch (error) {
        console.log(error);
    }
}

//borrarCategoria - estado:false
const borrarCategoria = async (req = require, res = response) => {
    try {

        const { id } = req.params;

        const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});

        res.json(categoriaBorrada)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}