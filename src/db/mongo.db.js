const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
        console.log('Conexión a mongo con éxito');
    } catch (error) {
        console.error('Error al conectarse a mongo', error);
    }
}

module.exports = connectToDatabase;