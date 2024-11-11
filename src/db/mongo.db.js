const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:123456@localhost:27017/';

async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoUrl, {dbName: process.env.MONGO_DB_NAME})
        console.log('Conexión a mongo con éxito');
    } catch (error) {
        console.error('Error al conectarse a mongo', error);
    }
}

module.exports = connectToDatabase;