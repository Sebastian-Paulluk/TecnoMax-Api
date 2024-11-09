const Fabricante = require('../models/fabricante.model');
const Producto = require('../models/producto.model');

const obtenerFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante.find().select('-__v');
        res.status(200).json(fabricantes);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los fabricantes.',
            detalles: error.message
        });
    }
}


const obtenerFabricante = async (req, res) => {
    const id = req.params.id
    try {
        const fabricante = await Fabricante.findById(id).select('-__v');
        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`});
        }
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el fabricante.',
            detalles: error.message
        });
    }
}


const agregarFabricante = async (req, res) => {
    const datosFabricante = req.body;

    try {
        const nuevoFabricante = await new Fabricante(datosFabricante).save();
        res.status(200).json(nuevoFabricante);
    } catch (error) {
        res.status(500).json({
            error: 'Error al crear el fabricante.',
            detalles: error.message
        });
    }
}


const actualizarFabricante = async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;

    try {
        const fabricanteActualizado = await Fabricante.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true, runValidators: true }
        );
        if (!fabricanteActualizado) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`});
        }
        res.status(202).json(fabricanteActualizado);
    } catch (error) {
        res.status(500).json({
            error: 'Error al modificar el fabricante.',
            detalles: error.message
        });
    }
}


const borrarFabricante = async (req, res) => {
    const id = req.params.id;
    try {
        const fabricanteEliminado = await Fabricante.findByIdAndDelete(id);
        if (!fabricanteEliminado) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`});
        }
        res.status(200).json({ message: `Fabricante eliminado con éxito.`});
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el fabricante.',
            detalles: error.message
        });
    } 
}


const obtenerProductosDeFabricante = async (req, res) => {
    const id = req.params.id;

    try {
        const fabricante = await Fabricante
            .findById(id)
            .populate('productos')

        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`});
        }
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los productos del fabricante.',
            detalles: error.message
        });
    }
}

const crearFabricanteConProducto =  async (req, res) => {
    const  id  = req.params.id;
    const productosIds  = req.body.productos;
    try {
        const productos = await Producto.find({ _id: { $in: productosIds } });
        if (productos.length === 0) {
            return res.status(404).json({ error: `El ID ${productosIds} no corresponde a ningún productos.`});
        }
        const fabricante = await Fabricante.findById(id);
        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`});
        }
        for (const producto of productos) {
            fabricante.productos.push(producto);
        }
        await fabricante.save();
        const fabricanteActualizado = await Fabricante.findById(id);
        return res.status(201).json({message: 'El fabricante fue asociado correctamente.', fabricanteActualizado});
    } catch (error) {
        return res.status(400).json({message:'Hubo un error al asociar el producto con el fabricante.'});
    }
}
const fabricanteController = {
    obtenerFabricantes,
    obtenerFabricante,
    agregarFabricante,
    actualizarFabricante,
    borrarFabricante,
    obtenerProductosDeFabricante,
    crearFabricanteConProducto
}


module.exports = fabricanteController;
