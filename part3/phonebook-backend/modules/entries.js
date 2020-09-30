const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI
console.log(`connecting to ${mongoURI}`)

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(res => console.log('connected to mongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message))

const entrySchema = new mongoose.Schema({
    name: String,
    number: String
})

module.exports = mongoose.model('Entry', entrySchema)