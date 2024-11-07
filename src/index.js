const express = require('express')
const connectToDatabase = require('./db/mongo.db')
const seedDatabase = require('./utils/seedDatabase')
const routes  = require('./routes/index')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT
app.listen(PORT, async() => {
    await connectToDatabase()
    console.log(`Ejecutando servidor en puerto ${PORT}`)
    await seedDatabase()
})