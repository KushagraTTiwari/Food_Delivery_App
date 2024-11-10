const mongoose = require('mongoose')
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URL_LOCAL;
mongoose.connect(mongoUrl)

const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('connected to mongoDb server')
})
db.on('error', (err)=> {
    console.log('MongoDB connection error: ', err)
})
db.on('disconnected', ()=> {
    console.log('Disconnected to mongoDb server')
})

module.exports= db;