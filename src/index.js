const express = require('express')
const connectToDatabase = require('./db/mongo.db')
const seedDatabase = require('./utils/seedDatabase')
const routes  = require('./routes/index')
const PORT = process.env.PORT ?? 3000;
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(routes)

app.listen(PORT, async() => {
    await connectToDatabase()

    if (process.env.SEEDER === 'true') {
        await seedDatabase()
    }
    
    console.log(`Ejecutando servidor en puerto ${PORT}`)

})