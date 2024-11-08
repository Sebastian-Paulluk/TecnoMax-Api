const mongoose = require('mongoose');
const {Schema} = mongoose;

const fabricanteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    direccion: {
        type: Schema.Types.String,
        required: true
    },
    numeroContacto: {
        type: Schema.Types.String,
        required: true
    },
    pathImgPerfil: {
        type: Schema.Types.String,
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]
}, { versionKey: false })

module.exports = mongoose.model('Fabricante', fabricanteSchema);