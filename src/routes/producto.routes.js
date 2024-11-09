const { Router } = require('express');
const empresaValidate = require('../middlewares/empresa.middleware')
const productoController = require('../controllers/producto.controllers');
const productoSchemas = require('../schemas/producto.schema');

const routes = Router();

routes.get('/', productoController.obtenerProductos);
routes.get('/:id', empresaValidate.validateId, productoController.obtenerProductoById);
routes.post('/', empresaValidate.schemasValidator(productoSchemas), productoController.agregarProducto);
routes.put('/:id', empresaValidate.validateId, productoController.modificarProducto);
routes.delete('/:id', empresaValidate.validateId, productoController.eliminarProducto);
routes.post('/:id/fabricantes', empresaValidate.validateId, productoController.crearProductoConFabricante);
routes.get('/:id/fabricantes', empresaValidate.validateId, productoController.obtenerFabricantesDeProducto);
routes.post('/:id/componentes', empresaValidate.validateId, productoController.crearProductoConComponentes);
routes.get('/:id/componentes', empresaValidate.validateId, productoController.obtenerComponentesDeProducto);


module.exports = routes;