const Fabricante = require('../models/fabricante.model');
const Producto = require('../models/producto.model');


const obtenerFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante
            .find()
            .select('-__v');

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
        const fabricante = await Fabricante
            .findById(id)
            .select('-__v');

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
        const fabricanteActualizado = await Fabricante
            .findByIdAndUpdate(
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


const asociarFabricanteConProductos =  async (req, res) => {
    const idFabricante  = req.params.id;
    const idsProductos  = req.body.productos;

    try {
        const fabricante = await Fabricante.findById(idFabricante);
        if (!fabricante) {
            return res.status(404).json({ error: `El ID no corresponde a ningún fabricante.`});
        }

        const productos = await Producto.find({ _id: { $in: idsProductos } });
        if (productos.length === 0) {
            return res.status(404).json({ error: `El(los) ID('s) no corresponde(n) a ninguno de los productos.`});
        }

        for (const producto of productos) {
            if (!fabricante.productos.includes(producto._id)) {
                fabricante.productos.push(producto._id);
            }

            if(!producto.fabricantes.includes(idFabricante)) {
                producto.fabricantes.push(fabricante._id);
                await producto.save();
            }
        }
        
        await fabricante.save();

        return res.status(201).json({message: 'Asociación entre el fabricante y el(los) producto(s) creada con éxito.'});
    } catch (error) {
        return res.status(400).json({
            error: 'Hubo un error al asociar el(los) producto(s) con el fabricante.',
            detalles: error.message
        });
    }
}


const eliminarAsociacionesDeFabricante = async(req, res) => {
    const id = req.params.id;
    try {
        const fabricante = await Fabricante.findById(id);
        
        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`});
        }

        fabricante.productos = [];
        await fabricante.save();

        await Producto.updateMany(
            { fabricantes: id },
            { $pull: { fabricantes: id }}
        )

        return res.status(201).json({message: 'Referencias entre el fabricante y los productos eliminadas con éxito.'});
    } catch (error) {
        return res.status(400).json({
            error: 'Hubo un error al eliminar las referencias a productos del fabricante.',
            detalles: error.message
        });
    }
}


const desasociarFabricanteConProducto = async(req, res) => {
    const {idFabricante, idProducto} = req.params
    try {
        const fabricante = await Fabricante.findById(idFabricante);
        if (!fabricante) {
            return res.status(404).json({ error: `El ID no corresponde a ningún fabricante.`});
        }

        const indexProducto = fabricante.productos.findIndex(
            (prod) => prod.toString() === idProducto
        );
        if (indexProducto === -1) {
            return res.status(404).json({ error: `Referencia del producto en fabricante no encontrada.` });
        }
        
        fabricante.productos.splice(indexProducto, 1);
        await fabricante.save();

        await Producto.findByIdAndUpdate(
            idProducto,
            { $pull:{ fabricantes: idFabricante } },
            { new: true }
        )

        return res.status(201).json({message: 'Referencias entre el fabricante y el producto eliminadas con éxito.'});
    } catch (error) {
        return res.status(400).json({
            error:'Hubo un error al eliminar el producto de la lista de productos del fabricante especificado.',
            detalles: error.message
        });
    }
}


const eliminarFabricante = async (req, res) => {
    const id = req.params.id;
    try {
        const fabricanteAEliminar = await Fabricante.findById(id);
        
        if (!fabricanteAEliminar) {
            return res.status(404).json({
                error: `El ID ${id} no corresponde a ningún fabricante.`
            });
        }

        const productosAsociadosAlFabricante = fabricanteAEliminar.productos.length

        if (productosAsociadosAlFabricante > 0) {
            return res.status(404).json({
                error: `No se puede eliminar el fabricante porque tiene ${productosAsociadosAlFabricante} productos asociados.`
            });
        }
        
        await Fabricante.findByIdAndDelete(id);
        res.status(200).json({ message: `Fabricante eliminado con éxito.`});
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el fabricante.',
            detalles: error.message
        });
    } 
}


const fabricanteController = {
    obtenerFabricantes,
    obtenerFabricante,
    agregarFabricante,
    actualizarFabricante,
    eliminarFabricante,
    obtenerProductosDeFabricante,
    asociarFabricanteConProductos,
    eliminarAsociacionesDeFabricante,
    desasociarFabricanteConProducto
}


module.exports = fabricanteController;
