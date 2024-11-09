const Joi = require('joi')
const dataMinLength = {
    nombre: 3,
    descripcion: 10,
}

const creationSchema = Joi.object(
    {
    nombre: Joi.string().min(dataMinLength.nombre).required().messages(
        {
        'string.base': 'El nombre debe ser una cadena de texto.',
        'string.empty': 'El nombre no puede estar vacío.',
        'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
        'any.required': 'El nombre es obligatorio.'
        }),
    descripcion: Joi.string().min(dataMinLength.descripcion).messages(
        {
        'string.base': 'La descripcion debe ser una cadena de texto.',
        'string.min': 'La descripcion debe tener al menos {#limit} caracteres.'
        })
    })

const updateSchema = creationSchema.fork(['nombre', 'descripcion'], (field) => field.optional())

const componenteSchema = 
    {
    creationSchema,
    updateSchema
    }

module.exports = componenteSchema