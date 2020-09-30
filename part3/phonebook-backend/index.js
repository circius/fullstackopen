const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const Entry = require('./modules/entries')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (req, res) => {
    Entry.find({})
        .then(result => res.json(result))
})

const errorResponse = (res, statusCode, error) =>
    res.status(statusCode).json({ 'error': error })

app.post('/api/persons', (req, res) => {
    const person = req.body

    const validPersonP = person => person.name && person.number

    if (!validPersonP(person)) {
        return errorResponse(res, 400, 'invalid person. supply name and number.')
    }

    const entry = new Entry(person)
    entry.save()
        .then(result => res.json(result))
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Entry.findById(id)
        .then(person => res.json(person))
        .catch(error => {
            console.log('unknown error: ', error.message)
            res.status(204).end()
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Entry.findByIdAndDelete(id)
        .then(res.status(204).end())
        .catch(error => console.log('database error: ', error)
        )
})

app.get('/info', (req, res) => {
    Entry.find({})
        .then(result => {
            const phonebookEntries = result.length
            const info = `Phonebook has info for ${phonebookEntries} people`
            const timestamp = new Date()
            res.send(`${info}<br /><br />${timestamp}`)
        })
        .catch(error => console.log('unknown error: ', error.message))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port ', PORT)
})