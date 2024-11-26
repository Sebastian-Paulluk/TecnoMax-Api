const express = require('express')
const cors = require('cors')
const connectToDatabase = require('./db/mongo.db')
const seedDatabase = require('./utils/seedDatabase')
const routes = require('./routes/index')
require('dotenv').config()
const PORT = process.env.API_PORT ?? 3000;

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, async() => {
    await connectToDatabase()
    
    if (process.env.RUN_SEEDER === 'true') {
        await seedDatabase()
    }

    console.log(`Ejecutando servidor en puerto ${PORT}`)
})