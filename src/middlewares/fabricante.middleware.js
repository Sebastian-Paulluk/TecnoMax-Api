const fabricanteSchema = require('../schemas/fabricante.schema')

const validateFabricante = (req, res, next) => {
    const { error } = fabricanteSchema.idSchema.validate(req.params.id)
    if (error) {
        return res.status(400).json({ error: error })
    }
    next();
}

module.exports = validateFabricante