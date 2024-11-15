const Fabricante = require('../models/fabricante.model');
const Producto = require('../models/producto.model');

const productoController = {};

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().select('-__v');
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json({message: 'Hubo un error al obtener los productos.', messageError: error})
    }
}
productoController.obtenerProductos = obtenerProductos;

const obtenerProductoById = async (req, res) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id).select('-__v');
        if (!producto) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.` });
        }        
        return res.status(200).json(producto);
    } catch (error) {
        return res.status(404).json({message: 'Hubo un error al obtener el producto', messageError: error});
    }
}
productoController.obtenerProductoById = obtenerProductoById;

const agregarProducto = async (req, res) => {
    const datosProducto = req.body; 
    try {
        const producto = await new Producto(datosProducto).save();
        return res.status(201).json(producto);
    } catch (error) {
        return res.status(400).json({message: 'Hubo un error al crear producto', messageError: error});
    }
}
productoController.agregarProducto = agregarProducto;

const modificarProducto = async (req, res) => {
    const id = req.params.id;
    const datosProducto = req.body;
    try {
        const obtenerProducto = await Producto.findById(id).select('-__v');
        if (!obtenerProducto) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`});
        }
        await Producto.findByIdAndUpdate(
            id,
            datosProducto,
            { new: true, runValidators: true }
        );
        const productoActualizado = await Producto.findById(id).select('-__v');
        return res.status(200).json(productoActualizado);
    } catch (error) {
        return res.status(404).json({message: 'Hubo un error al actualizar el producto', messageError: error});
    }
}
productoController.modificarProducto = modificarProducto;

const eliminarProducto = async (req, res) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findByIdAndDelete(id);
        if(!producto){
            res.status(404).json({message: 'El producto no existe'});
        }
        return res.status(200).json({message: `El producto fue con id: ${id} fue eliminado correctamente`})
    } catch (error) {
        return res.status(500).json({message: 'Hubo un error al eliminar el producto', messageError: error});
    }
}
productoController.eliminarProducto = eliminarProducto;

const crearProductoConFabricante =  async (req, res) => {
    const  id  = req.params.id;
    const fabricanteIds  = req.body.fabricantes;
    try {
        const fabricantes = await Fabricante.find({ _id: { $in: fabricanteIds } });
        if (fabricantes.length === 0) {
            return res.status(404).json({ error: `El ID ${fabricanteId} no corresponde a ningún fabricante.`});
        }
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`});
        }
        for (const fabricante of fabricantes) {
            producto.fabricantes.push(fabricante);
        }
        await producto.save();
        const productoActualizado = await Producto.findById(id);
        return res.status(201).json({message: 'El fabricante fue asociado correctamente.', productoActualizado});
    } catch (error) {
        console.log('Martoo',error);
        return res.status(400).json({message:'Hubo un error al asociar el fabribante con el producto.'});
    }
}

productoController.crearProductoConFabricante = crearProductoConFabricante;

const obtenerFabricantesDeProducto = async (req, res) => {
    const id = req.params.id
    try {
        const fabricantesDeProducto = await Producto.findById(id).select('-componentes').populate('fabricantes')
        if (!fabricantesDeProducto) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`})
        }
        return res.status(200).json(fabricantesDeProducto)
    } catch (error) {
        return res.status(500).json({ error: 'Error obtener los productos del fabricante.'})
    }
}
productoController.obtenerFabricantesDeProducto = obtenerFabricantesDeProducto;

const obtenerComponentesDeProducto = async (req, res) => {
    const id = req.params.id
    try {
        const componentesDeProducto = await Producto.findById(id).select('-fabricantes').populate('componentes');
        if (!componentesDeProducto) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`})
        }
        return res.status(200).json(componentesDeProducto)
    } catch (error) {
        return res.status(500).json({ error: 'Error obtener los productos del componente.'})
    }
}
productoController.obtenerComponentesDeProducto = obtenerComponentesDeProducto;

const obtenerComponenteDeProducto = async (req, res) => {
    const { idProducto, idComponente } = req.params;
    try {
        const producto = await Producto.findById(idProducto).select('componentes');
        if (!producto) {
            return res.status(404).json({ error: `El ID ${idProducto} no corresponde a ningún producto.` });
        }
        const componente = producto.componentes.id(idComponente);
        if (!componente) {
            return res.status(404).json({ error: `El ID ${idComponente} no corresponde a ningún componente en el producto.` });
        }
        return res.status(200).json(componente);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el componente del producto.', detalles: error.message });
    }
};
productoController.obtenerComponenteDeProducto = obtenerComponenteDeProducto;

const agregarComponenteAProducto = async (req, res) => {
    const idProducto = req.params.id;
    const datosComponente = req.body;
    try {
        const producto = await Producto.findById(idProducto);
        if (!producto) {
            return res.status(404).json({ error: `El ID ${idProducto} no corresponde a ningún producto.` });
        }
        producto.componentes.push(datosComponente);
        await producto.save();
        return res.status(201).json(producto);
    } catch (error) {
        return res.status(400).json({ message: 'Hubo un error al agregar el componente al producto.', detalles: error.message });
    }
};
productoController.agregarComponenteAProducto = agregarComponenteAProducto;

const modificarComponenteDeProducto = async (req, res) => {
    const { idProducto, idComponente } = req.params;
    const datosActualizados = req.body;
    try {
        const producto = await Producto.findById(idProducto).select('componentes');
        if (!producto) {
            return res.status(404).json({ error: `El ID ${idProducto} no corresponde a ningún producto.` });
        }
        const componente = producto.componentes.id(idComponente);
        if (!componente) {
            return res.status(404).json({ error: `El ID ${idComponente} no corresponde a ningún componente en el producto.` });
        }
        componente.set(datosActualizados);
        await producto.save();
        return res.status(200).json(componente);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el componente del producto.', detalles: error.message });
    }
};
productoController.modificarComponenteDeProducto = modificarComponenteDeProducto;

const eliminarComponenteDeProducto = async (req, res) => {
    const { idProducto, idComponente } = req.params;
    try {
        const producto = await Producto.findById(idProducto).select('componentes');
        if (!producto) {
            return res.status(404).json({ error: `El ID ${idProducto} no corresponde a ningún producto.` });
        }
        const componente = producto.componentes.id(idComponente);
        if (!componente) {
            return res.status(404).json({ error: `El ID ${idComponente} no corresponde a ningún componente en el producto.` });
        }
        producto.componentes.pull(idComponente);
        await producto.save();
        return res.status(200).json({ message: 'Componente eliminado con éxito.', producto });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el componente del producto.', detalles: error.message });
    }
};
productoController.eliminarComponenteDeProducto = eliminarComponenteDeProducto;

const obtenerProductosDeComponente = async (req, res) => {
    const idComponente = req.params.idComponente;
    try {
        const productos = await Producto.find({ 'componentes._id': idComponente });
        if (productos.length === 0) {
            return res.status(404).json({ error: `No se encontraron productos que contengan el componente con ID ${idComponente}.` });
        }
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los productos del componente.', detalles: error.message });
    }
};
productoController.obtenerProductosDeComponente = obtenerProductosDeComponente;

//ESTA NO SE SI DEBERIA SEGUIR ESTANDO:
const crearProductoConComponentes =  async (req, res) => {
    const id  = req.params.id;
    const componentesIds = req.body.componentes;
    try {
        const componentes = await Componente.find({ _id: { $in: componentesIds } });
        if (componentes.length === 0) {
            return res.status(404).json({ error: `El ID ${componentesIds} no corresponde a ningún componente.`});
        }
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`});
        }
        for (const componente of componentes) {
            producto.componentes.push(componente);
        }
        await producto.save();
        const productoActualizado = await Producto.findById(id);
        return res.status(201).json({message: 'El componente fue asociado correctamente.', productoActualizado});
    } catch (error) {
        return res.status(400).json({message:'Hubo un error al asociar el componente con el producto.'});
    }
}

productoController.crearProductoConComponentes = crearProductoConComponentes;

module.exports = productoController;