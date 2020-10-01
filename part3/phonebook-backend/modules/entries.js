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

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)