const { Router } = require('express')
const fabricanteRoutes = require('./fabricante.routes')
const productoRoutes = require('./producto.routes')
const componentesRoutes = require('./componente.routes')

const router = Router();

router.use('/fabricantes', fabricanteRoutes);
router.use('/productos', productoRoutes);
router.use('/componentes', componentesRoutes);

module.exports = router;