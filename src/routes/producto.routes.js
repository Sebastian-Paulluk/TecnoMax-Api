const { Router } = require('express');
const schemasValidator = require('../middlewares/schemasValidate.middlewares');
const {validateId} = require('../middlewares/empresa.middleware')
const productoController = require('../controllers/producto.controllers');
const productoSchemas = require('../schemas/producto.schema');

const routes = Router();

routes.get('/', productoController.obtenerProductos);
routes.get('/:id', validateId, productoController.obtenerProductoById);
routes.post('/', schemasValidator(productoSchemas), productoController.agregarProducto);
routes.put('/:id', validateId, productoController.modificarProducto);
routes.delete('/:id', validateId, productoController.eliminarProducto);
routes.post('/:id/fabricantes', validateId, productoController.crearProductoConFabricante);
routes.get('/:id/fabricantes', validateId, productoController.obtenerFabricantesDeProducto);
routes.post('/:id/componentes', validateId, productoController.crearProductoConComponentes);
routes.get('/:id/componentes', validateId, productoController.obtenerComponentesDeProducto);


module.exports = routes;