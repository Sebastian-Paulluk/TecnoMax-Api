const idSchema = require('../schemas/id.schema');

const validateId = (req, res, next) => {
    const { error } = idSchema.validate(req.params.id)
    if (error) {
        return res.status(400).json({ error: error })
    }
    next();
}

module.exports = validateId;