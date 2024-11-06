const mongoose = require('mongoose')
require('dotenv')

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
        console.log('Conexion exitosa')
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = connectToDatabase