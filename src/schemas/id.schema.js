const Joi = require('joi');

const idSchema = Joi.string().alphanum().required().messages({
    'string.base': 'El ID debe ser una cadena de texto.',
    'string.empty': 'El ID no puede estar vacío.',
    'string.alphanum': 'El ID solo puede contener caracteres alfanuméricos.',
    'any.required': 'El ID es obligatorio.'
});

module.exports = idSchema;

