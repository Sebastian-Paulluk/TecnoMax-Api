const { Router } = require('express')
const routes = Router()
const fabricanteController = require('../controllers/fabricante.controller')
const validateId = require('../middlewares/empresa.middleware')
const fabricanteSchema = require('../schemas/fabricante.schema')
const schemasValidator = require('../middlewares/schemasValidate.middlewares')

routes.get('/',
    fabricanteController.obtenerFabricantes)

routes.get('/:id',
    validateId,
    fabricanteController.obtenerFabricante)

routes.post('/',
    schemasValidator(fabricanteSchema.creationSchema),
    fabricanteController.agregarFabricante)

routes.put('/:id', 
    validateId,
    schemasValidator(fabricanteSchema.updateSchema),
    fabricanteController.actualizarFabricante)

routes.delete('/:id',
    validateId,
    fabricanteController.borrarFabricante)

routes.get('/:id/productos', 
    validateId,
    fabricanteController.obtenerProductosDeFabricante)

module.exports = routes
