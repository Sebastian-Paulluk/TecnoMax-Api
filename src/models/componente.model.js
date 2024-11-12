const mongoose = require('mongoose')
const {Schema} = mongoose

const componenteSchema = new mongoose.Schema(
    {
    nombre: 
        {
        type: Schema.Types.String,
        required: true
        },
    descripcion: 
        {
        type: Schema.Types.String,
        required: false
        },
    productos: 
        [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        }]
    }, { versionKey: false })

module.exports = mongoose.model('Componente', componenteSchema)