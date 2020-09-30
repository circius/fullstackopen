const mongoose = require('mongoose')

const usageInstruction= "usage: node mongo.js <password> (optional)<name> (optional)<number>"

const username = "fullstack0"
const dbname = "phonebook"

const [pw, name, number] = process.argv.slice(2)

const mongodbURL = `mongodb+srv://${username}:${pw}@cluster0.fyseq.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const entrySchema = new mongoose.Schema({
    name: String,
    number: String
})

const Entry = mongoose.model('Entry', entrySchema)

const addEntry = (mongoose, entry) => {
    const validEntryP = entry => entry.name && entry.number
    if (validEntryP(entry)) {
        entry.save().then(res => {
            mongoose.connection.close()
        })
    } else {
        console.log('invalid entry ', entry)
    }
}

const listEntries = (mongoose, model, filter) => {
    model.find(filter).then(res => {
        res.forEach(entry => console.log(entry))
        mongoose.connection.close()
    })
}

const addEntryP = (pw, name, number) => pw && name && number
const listEntriesP = (pw, name, number) => pw && !name && !number

// main

if (!pw) {
    console.log(usageInstruction)
    .exit
}

if (addEntryP(pw, name, number)) {
    const entry = new Entry({name:name, number:number})
    addEntry(mongoose, entry)  
} else if (listEntriesP(pw, name, number)) {
    listEntries(mongoose, Entry, {})
} else {
    console.log("something went wrong")
}


