const { Router } = require('express')
const fabricanteRoutes = require('./fabricante.routes')
const productoRoutes = require('./producto.routes')

const router = Router();

router.use('/fabricantes', fabricanteRoutes);
router.use('/productos', productoRoutes);

module.exports = router;