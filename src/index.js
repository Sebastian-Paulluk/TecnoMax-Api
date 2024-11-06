const express = require('express')
const connectToDatabase = require('./db/mongo.db')
const seedDatabase = require('./utils/seedDatabase')
require('dotenv').config()

const app = express()
app.use(express.json())


const PORT = process.env.PORT
app.listen(PORT, async() => {
    await connectToDatabase()
    await seedDatabase()
})