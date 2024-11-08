const mongoose = require('mongoose');
const {Schema} = mongoose;

const componenteSchema = new Schema({ 
    nombre: { 
        type: String, 
        required: true 
    }, 
    descripcion: { 
        type: String, 
        required: true 
    }}, { versionKey: false });

const productoSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    descripcion: {
        type: Schema.Types.String,
        required: true
    },
    precio: {
        type: Schema.Types.Number,
        required: true
    },
    pathImg: {
        type: Schema.Types.String,
    },
    fabricantes: [{
        type: Schema.Types.ObjectId,
        ref: 'Fabricante'
    }],
    componentes: [componenteSchema]
}, { versionKey: false })

module.exports = mongoose.model('Producto', productoSchema);