const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:123456@localhost:27017/empresa?authSource=admin';

async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoUrl, {
            dbName: process.env.MONGO_DB_NAME,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASSWORD
        })
        console.log('Conexión a mongo con éxito');
    } catch (error) {
        console.error('Error al conectarse a mongo', error);
    }
}

module.exports = connectToDatabase;