const { Router } = require('express')
const routes = Router()
const fabricanteController = require('../controllers/fabricante.controller')
const fabricanteSchemas = require('../schemas/fabricante.schema')
const validateFabricante = require('../middlewares/fabricante.middleware')
const schemasValidator = require('../middlewares/schemasValidate.middlewares')

routes.get('/',
    fabricanteController.obtenerFabricantes)

routes.get('/:id',
    validateFabricante,
    fabricanteController.obtenerFabricante)

routes.post('/',
    schemasValidator(fabricanteSchemas.creationSchema),
    fabricanteController.agregarFabricante)

routes.put('/:id', 
    validateFabricante,
    schemasValidator(fabricanteSchemas.updateSchema),
    fabricanteController.actualizarFabricante)

routes.delete('/:id',
    validateFabricante,
    fabricanteController.borrarFabricante)

routes.get('/:id/productos', 
    validateFabricante,
    fabricanteController.obtenerProductosDeFabricante)

module.exports = routes
