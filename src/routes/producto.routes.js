const { Router } = require('express');
const empresaValidate = require('../middleware/empresa.middleware')
const productoController = require('../controllers/producto.controllers');
const productoSchemas = require('../schemas/producto.schema');
const componenteSchema = require('../schemas/componente.schema')

const routes = Router();

routes.get('/', productoController.obtenerProductos);
routes.get('/:id', empresaValidate.validateId(), productoController.obtenerProductoById);
routes.post('/', empresaValidate.schemasValidator(productoSchemas.creationSchema), productoController.agregarProducto);
routes.put('/:id', empresaValidate.validateId, productoController.modificarProducto);
routes.delete('/:id', empresaValidate.validateId(), productoController.eliminarProducto);
routes.post('/:id/fabricantes', empresaValidate.validateId(), productoController.crearProductoConFabricante);
routes.get('/:id/fabricantes', empresaValidate.validateId(), productoController.obtenerFabricantesDeProducto);

routes.get('/:id/componentes', empresaValidate.validateId(), productoController.obtenerComponentesDeProducto);
routes.get('/:idProducto/componentes/:idComponente', empresaValidate.validateId('idProducto'),empresaValidate.validateId('idComponente'), productoController.obtenerComponenteDeProducto);
routes.post('/:id/componentes', empresaValidate.validateId(), empresaValidate.schemasValidator(componenteSchema.updateSchema), productoController.agregarComponenteAProducto);
routes.put('/:idProducto/componentes/:idComponente', empresaValidate.validateId('idProducto'),empresaValidate.validateId('idComponente'), empresaValidate.schemasValidator(componenteSchema.updateSchema), productoController.modificarComponenteDeProducto);
routes.delete('/:idProducto/componentes/:idComponente', empresaValidate.validateId('idProducto'),empresaValidate.validateId('idComponente'), productoController.eliminarComponenteDeProducto);

//EN DUDA DE SI SIRVE O NO:
routes.get('/componentes/:idComponente/productos', empresaValidate.validateId(), productoController.obtenerProductosDeComponente);

//ESTA CREO QUE NO DEBERIA SEGUIR ESTANDO:
routes.post('/:id/componentes', empresaValidate.validateId(), productoController.crearProductoConComponentes);

module.exports = routes