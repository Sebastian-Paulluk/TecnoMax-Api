const Joi = require('joi')
const dataMinLength = {
    nombre: 3,
    descripcion: 10,
}

const idSchema = Joi.string().alphanum().required().messages(
    {
    'string.base': 'El ID debe ser una cadena de texto.',
    'string.empty': 'El ID no puede estar vacío.',
    'string.alphanum': 'El ID solo puede contener caracteres alfanuméricos.',
    'any.required': 'El ID es obligatorio.'
    })

const creationSchema = Joi.object(
    {
    nombre: Joi.string().min(dataMinLength.nombre).required().messages(
        {
        'string.base': 'El nombre debe ser una cadena de texto.',
        'string.empty': 'El nombre no puede estar vacío.',
        'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
        'any.required': 'El nombre es obligatorio.'
        }),
    descripcion: Joi.string().min(dataMinLength.direccion).messages(
        {
        'string.base': 'La descripcion debe ser una cadena de texto.',
        'string.min': 'La descripcion debe tener al menos {#limit} caracteres.'
        })
    })

const updateSchema = creationSchema.fork(['nombre', 'descripcion'], (field) => field.optional())

const componenteSchema = 
    {
    idSchema,
    creationSchema,
    updateSchema
    }

module.exports = componenteSchema