const { response, request } = require('express');
const { Producto } = require('../models')



const obtenerProductos = async (req = request, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(desde))
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .limit(Number(limite))
        ]);

        res.json({
            total,
            productos
        });

    } catch (error) {
        console.log(error);
    }

}
const obtenerProducto = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

        res.json(producto);

    } catch (error) {
        console.log(error);
    }

}
const crearProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre:body.nombre })
    try {
        if (productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre} ,ya existe `
            })
        }
        //Generar la data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id,
        }
        const producto = new Producto(data);

        //Guardar DB
        await producto.save();

        res.status(201).json(producto)

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'error'
        })
    }
}
const actualizarProducto = async (req = request, res = response) => {
    try {

        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;
        if (data.nombre) {
            data.nombre = data.nombre.toUpperCase();
        }

        data.usuario = req.usuario._id;

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

        res.json(producto);

    } catch (error) {
        console.log(error);
    }
}
const borrarProducto = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.json(productoBorrado);

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}