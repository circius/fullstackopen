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

const errorResponse = (res, statusCode, error) =>
    res.status(statusCode).json({ 'error': error })

app.get('/api/persons', (req, res, next) => {
    Entry.find({})
        .then(result => res.json(result))
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const person = req.body

    const validPersonP = person => person.name && person.number

    if (!validPersonP(person)) {
        return errorResponse(res, 400, 'invalid person. supply name and number.')
    }

    const entry = new Entry(person)
    entry.save()
        .then(result => res.json(result))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    console.log(`getting person with id ${id}`)
    Entry.findById(id)
        .then(person => 
            person ? res.json(person) : res.status(404).end())
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const person = req.body
    Entry.findByIdAndUpdate(id, person, {new:true, runValidators: true})
        .then(result => res.json(result))
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Entry.findByIdAndDelete(id)
        .then(res.status(204).end())
        .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    Entry.find({})
        .then(result => {
            const phonebookEntries = result.length
            const info = `Phonebook has info for ${phonebookEntries} people`
            const timestamp = new Date()
            res.send(`${info}<br /><br />${timestamp}`)
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return errorResponse(res, 400, 'malformed id')
    } else if (error.name === 'ValidationError') {
        return errorResponse(res, 400, 'invalid input')
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port ', PORT)
})


