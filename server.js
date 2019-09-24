require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error',(error)=>console.error("error"))
db.once('open',()=>console.log('Successfully connected to MongoDb Database'))

app.use(express.json())

const AccessRoutes = require('./routes/access_routes')

app.use('/accessroutes',AccessRoutes)

app.listen(3000, () => console.log('Server has started'))