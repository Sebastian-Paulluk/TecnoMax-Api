const Fabricante = require('../models/fabricante.model');


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


const fabricanteController = {
    obtenerFabricantes,
    obtenerFabricante,
    agregarFabricante,
    actualizarFabricante,
    borrarFabricante,
    obtenerProductosDeFabricante
}


module.exports = fabricanteController;
