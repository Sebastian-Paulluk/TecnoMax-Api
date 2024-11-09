const Joi = require('joi');
const dataMinLength = {
    nombre: 3,
    descripcion: 5,
    precio: 2,
    pathImg: 5
}

const creationSchema = Joi.object({
    nombre: Joi.string().min(dataMinLength.nombre).required().messages({
        'string.base': 'El nombre debe ser una cadena de texto.',
        'string.empty': 'El nombre no puede estar vacío.',
        'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
        'any.required': 'El nombre es obligatorio.'
    }),
    descripcion: Joi.string().min(dataMinLength.descripcion).required().messages({
        'string.base': 'La descripcion debe ser una cadena de texto.',
        'string.empty': 'La descripcion no puede estar vacía.',
        'string.min': 'La descripcion debe tener al menos {#limit} caracteres.',
        'any.required': 'La descripcion es obligatoria.'
    }),
    precio: Joi.number().min(dataMinLength.precio).required().messages({
        'number.base': 'El precio debe ser un número.',
        'number.empty': 'El precio no puede estar vacío.',
        'number.min': 'El precio debe ser mayor a {#limit}.',
        'any.required': 'El precio es obligatorio.'
    }),
    pathImg: Joi.string().min(dataMinLength.pathImg).optional().messages({
        'string.base': 'La ruta de la imagen de perfil debe ser una cadena de texto.',
        'string.empty': 'La ruta de la imagen de perfil no puede estar vacía.',
        'string.min': 'La ruta de la imagen de perfil debe tener al menos {#limit} caracteres.'
    }),
})

const updateSchema = creationSchema.fork(['nombre', 'descripcion', 'precio', 'pathImg'], (field) => field.optional());

const productoSchema = {
    creationSchema,
    updateSchema
}

module.exports = productoSchema;