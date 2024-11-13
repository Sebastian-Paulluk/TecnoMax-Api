const { Router } = require('express')
const routes = Router()
const componenteController = require('../controllers/componente.controllers')
const empresaValidate = require('../middlewares/empresa.middleware')
const componenteSchema = require('../schemas/componente.schema')

routes.get
    (
    '/', componenteController.obtenerComponentes
    )

routes.get
    (
    '/:id', empresaValidate.validateId(), componenteController.obtenerComponente
    )

routes.post
    (
    '/', empresaValidate.schemasValidator(componenteSchema.creationSchema), componenteController.agregarComponente
    )

routes.put
    (
    '/:id', empresaValidate.validateId(), empresaValidate.schemasValidator(componenteSchema.updateSchema), componenteController.actualizarComponente
    )

routes.delete
    (
    '/:id', empresaValidate.validateId(), componenteController.borrarComponente
    )

routes.get
    (
    '/:id/productos', empresaValidate.validateId(), componenteController.obtenerProductosDeComponente
    )

routes.post
    (
    '/:id/productos', empresaValidate.validateId(), componenteController.crearComponenteConProducto
    )

module.exports = routes