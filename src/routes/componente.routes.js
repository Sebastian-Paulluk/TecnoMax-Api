const { Router } = require('express')
const routes = Router()
const componenteController = require('../controllers/componente.controllers')
const empresaValidate = require('../middleware/empresa.middleware')
const componenteSchema = require('../schemas/componente.schema')

routes.get
    (
    '/', componenteController.obtenerComponentes
    )