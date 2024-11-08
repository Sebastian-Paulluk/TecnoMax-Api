const { Router } = require('express')
const routes = Router()
const componenteController = require('../controllers/componente.controller')
const validateId = require('../middlewares/empresa.middleware')
const componenteSchema = require('../schemas/componente.schema')
const schemasValidator = require('../middlewares/schemasValidate.middlewares')

routes.get
    (
    '/', componenteController.obtenerComponentes
    )

routes.get
    (
    '/:id', validateId, componenteController.obtenerComponente
    )

routes.post
    (
    '/', schemasValidator(componenteSchema.creationSchema), componenteController.agregarComponente
    )

routes.put
    (
    '/:id', validateId, schemasValidator(componenteSchema.updateSchema), componenteController.actualizarComponente
    )

routes.delete
    (
    '/:id', validateId, componenteController.borrarComponente
    )

routes.get
    (
    '/:id/productos', validateId, componenteController.obtenerProductosDeComponente
    )

module.exports = routes