const Fabricante = require('../models/fabricante.model');
const Componente = require('../models/componente.model');

const productoController = {};

const obtenerProductos = async (request, response) => {
    try {
        const productos = await Producto.find().select('-__v');
        return response.status(200).json(productos);
    } catch (error) {
        return response.status(500).json({message: 'Hubo un error al obtener los productos.', messageError: error})
    }
}
productoController.obtenerProductos = obtenerProductos;

const obtenerProductoById = async (request, response) => {
    const {id} = new mongoose.request.params;
    try {
        const producto = await Producto.findByPk(id).select('-__v');
        if (!producto) {
            return response.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.` });
        }        
        return response.status(200).json(producto);
    } catch (error) {
        return response.status(404).json({message: 'Hubo un error al obtener el producto', messageError: error});
    }
}
productoController.obtenerProductoById = obtenerProductoById;

const agregarProducto = async (request, response) => {
    const datosProducto = request.body;
    try {
        const producto = await new Producto(datosProducto).save()
        return response.status(201).json(producto);
    } catch (error) {
        return response.status(400).json({message: 'Hubo un error al crear producto', messageError: error});
    }
}
productoController.agregarProducto = agregarProducto;

const modificarProducto = async (request, response) => {
    const id = request.params;
    const datosProducto = request.body;
    try {
        const obtenerProducto = await Producto.findByPk(id).select('-__v');
        if (!obtenerProducto) {
            return response.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`});
        }
        await Producto.findByIdAndUpdate(
            id,
            datosProducto,
            { new: true, runValidators: true }
        );
        const productoActualizado = await Producto.findByPk(id).select('-__v');
        return response.status(200).json(productoActualizado);
    } catch (error) {
        return response.status(404).json({message: 'Hubo un error al actualizar el producto', messageError: error});
    }
}
productoController.modificarProducto = modificarProducto;

const eliminarProducto = async (request, response) => {
    const id = request.params;
    try {
        const producto = await Producto.findByIdAndDelete(id);
        if(!producto){
            response.status(404).json({message: 'El producto no existe'});
        }
        return response.status(200).json({message: `El producto fue con id: ${id} fue eliminado correctamente`})
    } catch (error) {
        return response.status(500).json({message: 'Hubo un error al eliminar el producto', messageError: error});
    }
}
productoController.eliminarProducto = eliminarProducto;

const crearProductoConFabricante =  async (request, response) => {
    const { id } = request.params;
    const { fabricanteIds } = request.body;
    try {
        const fabricantes = await Fabricante.find({ _id: { $in: fabricanteIds } });
        if (fabricantes.length === 0) {
            return response.status(404).json({ error: `El ID ${fabricanteId} no corresponde a ningún fabricante.`});
        }
        const producto = await Producto.findById(id);
        if (!producto) {
            return response.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`});
        }
        producto.fabricantes = fabricantes.map(fabricante => fabricante._id);
        await producto.save();
        return response.status(201).json({message: 'El fabricante fue asociado correctamente.', producto});
    } catch (error) {
        console.log(error);
        return response.status(400).json({message:'Hubo un error al asociar el fabribante con el producto.'});
    }
}

productoController.crearProductoConFabricante = crearProductoConFabricante;

const obtenerFabricantesDeProducto = async (request, response) => {
    const id = request.params.id
    try {
        const fabricantesDeProducto = await Producto.findById(id).populate('fabricantes')
        if (!fabricantesDeProducto) {
            return response.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`})
        }
        return response.status(200).json(fabricantesDeProducto)
    } catch (error) {
        return response.status(500).json({ error: 'Error obtener los productos del fabricante.'})
    }
}
productoController.obtenerFabricantesDeProducto = obtenerFabricantesDeProducto;

const crearProductoConComponentes =  async (request, response) => {
    const { id } = request.params;
    const { componentesIds } = request.body;
    try {
        const componentes = await Componente.find({ _id: { $in: componentesIds } });
        if (componentes.length === 0) {
            return response.status(404).json({ error: `El ID ${componentesIds} no corresponde a ningún componente.`});
        }
        const producto = await Producto.findById(id);
        if (!producto) {
            return response.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`});
        }
        producto.componentes = componentes.map(componente => componente._id);
        return response.status(201).json({message: 'El componente fue asociado correctamente.', producto});
    } catch (error) {
        return response.status(400).json({message:'Hubo un error al asociar el componente con el producto.'});
    }
}

productoController.crearProductoConComponentes = crearProductoConComponentes;

const obtenerComponentesDeProducto = async (request, response) => {
    const id = request.params.id
    try {
        const componentesDeProducto = await Producto.findById(id).populate('componentes');
        if (!componentesDeProducto) {
            return response.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`})
        }
        return response.status(200).json(componentesDeProducto)
    } catch (error) {
        return response.status(500).json({ error: 'Error obtener los productos del componente.'})
    }
}
productoController.obtenerComponentesDeProducto = obtenerComponentesDeProducto;

module.exports = productoController;