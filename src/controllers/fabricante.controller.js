const Fabricante = require('../models/fabricante.model') 
const fabricanteController = {}


const obtenerFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante.find().select('-__v')
        res.status(200).json(fabricantes)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los fabricantes." });
    }
}
fabricanteController.obtenerFabricantes = obtenerFabricantes


const obtenerFabricante = async (req, res) => {
    const id = req.params.id
    try {
        const fabricante = await Fabricante.findById(id).select('-__v')
        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`})
        }
        res.status(200).json(fabricante)
    } catch (error) {
        res.status(505).json({ error: 'Error al obtener el fabricante.'})
    }
}
fabricanteController.obtenerFabricante = obtenerFabricante


const agregarFabricante = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body

    try {
        const fabricante = new Fabricante({
            nombre,
            direccion,
            numeroContacto,
            pathImgPerfil,
        })
        const nuevoFabricante = await fabricante.save()

        res.status(200).json(nuevoFabricante)
    } catch (error) {
        res.status(505).json({ error: 'Error al crear el fabricante.'})
    }
}
fabricanteController.agregarFabricante = agregarFabricante


const actualizarFabricante = async (req, res) => {
    const id = req.params.id
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    try {
        const fabricante = await Fabricante.findByPk(id)
        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`})
        }
        fabricante.nombre = nombre ?? fabricante.nombre
        fabricante.direccion = direccion ?? fabricante.direccion
        fabricante.numeroContacto = numeroContacto ?? fabricante.numeroContacto
        fabricante.pathImgPerfil = pathImgPerfil ?? fabricante.pathImgPerfil
        
        await fabricante.save()
        res.status(202).json(fabricante)
    } catch (error) {
        res.status(505).json({ error: 'Error al modificar el fabricante.'})
    }
}
fabricanteController.actualizarFabricante = actualizarFabricante


const borrarFabricante = async (req, res) => {
    const id = req.params.id
    try {
        const fabricante = await Fabricante.findByPk(id)
        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`})
        }

        await fabricante.destroy()
        res.status(200).json({ message: `Fabricante con ID ${id} eliminado con éxito.`})
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar al fabricante.'})
    }
}
fabricanteController.borrarFabricante = borrarFabricante


const obtenerProductosDeFabricante = async (req, res) => {
    const id = req.params.id
    try {
        const fabricante = await Fabricante.findByPk(id, {
            include: {
                model: Producto,
                as: 'Productos',
                attributes: { exclude: ['fabricanteId'] },
                required: false
            }
        })
        if (!fabricante) {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún fabricante.`})
        }
        res.status(200).json(fabricante)
    } catch (error) {
        res.status(500).json({ error: 'Error obtener los productos del fabricante.'})
    }
}
fabricanteController.obtenerProductosDeFabricante = obtenerProductosDeFabricante


module.exports = fabricanteController
