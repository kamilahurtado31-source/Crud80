/*const { listarProductos } = require('../models/productosModel.js');

const listarProductos = async (req, res) => {
    try {
        const productos = await listarProductos();
        return res.status(200).json({
            ListadoProductos: productos
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al listar los productos",
            detalle: error.message
        });
    }
};*/
const {listar} = require('../models/productosModel.js');
const listarProductos = async (req, res)=>{
    try {
        //obtener listado de productos, utilizando el servicio 
        const productos = await listar()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
}
const listarUnProducto = (req, res)=>{
    res.json ({mensaje : "Ruta de listar un producto"})
}
const crearProducto = (req, res)=>{
    res.json ({mensaje: "Ruta para crear un producto"})
}
const eliminarProducto = ()=>{
    res.json ({mensaje: "Ruta para eliminar un producto"})
}

module.exports = {listarProductos, listarUnProducto, crearProducto, eliminarProducto}