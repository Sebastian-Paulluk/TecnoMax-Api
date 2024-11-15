const { Router } = require('express')
const routes = Router()
const empresaValidate = require('../middleware/empresa.middleware')
const fabricanteController = require('../controllers/fabricante.controllers')
const fabricanteSchema = require('../schemas/fabricante.schema')

routes.get('/',
    fabricanteController.obtenerFabricantes
);

routes.get('/:id',
    empresaValidate.validateId(),
    fabricanteController.obtenerFabricante
);

routes.post('/',
    empresaValidate.schemasValidator(fabricanteSchema.creationSchema),
    fabricanteController.agregarFabricante
);

routes.put('/:id', 
    empresaValidate.validateId(),
    empresaValidate.schemasValidator(fabricanteSchema.updateSchema),
    fabricanteController.actualizarFabricante
);

routes.delete('/:id',
    empresaValidate.validateId(),
    fabricanteController.eliminarFabricante
);

routes.get('/:id/productos', 
    empresaValidate.validateId(),
    fabricanteController.obtenerProductosDeFabricante
);

routes.post('/:id/productos',
    empresaValidate.validateId(),
    fabricanteController.asociarFabricanteConProductos
);   

routes.delete('/:id/productos',
    empresaValidate.validateId(),
    fabricanteController.eliminarAsociacionesDeFabricante
);   
 
routes.delete('/:idFabricante/productos/:idProducto',
    empresaValidate.validateId('idFabricante'),
    empresaValidate.validateId('idProducto'),
    fabricanteController.desasociarFabricanteConProducto
);

module.exports = routes
