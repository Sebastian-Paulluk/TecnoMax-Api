const idSchema = require('../schemas/id.schema');

const validateId = (req, res, next) => {
    const { error } = idSchema.validate(req.params.id)
    if (error) {
        return res.status(400).json({ error: error.message })
    }
    next();
}
const schemasValidator = (schema) => {
    return (request,response,next) => {
        const resultado = schema.validate(request.body, {abortEarly:false})
        if (resultado.error){
            return response.status(400).json({
                mensaje: "Error de validacion",
                errores: resultado.error.details.map((e) =>{
                    return { atributo: e.path[0], mensaje: e.message}
                })
            });
        }
        next();
    }
}
const empresaValidate = {
    validateId,
    schemasValidator
}
module.exports = empresaValidate;