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
module.exports = schemasValidator;