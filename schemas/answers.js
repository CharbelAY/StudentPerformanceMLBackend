const mongoose = require('mongoose')

const answersSchema = new mongoose.Schema({
    question:String,
    answers:Array
})

module.exports = mongoose.model('answers',answersSchema)