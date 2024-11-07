const { Router } = require('express')
const fabricanteRoutes = require('./fabricante.routes')

const router = Router();

router.use('/fabricantes', fabricanteRoutes);

module.exports = router;