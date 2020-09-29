const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


let phonebook = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 1
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 2
    }
]

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

const errorResponse = (res, statusCode, error) =>
    res.status(statusCode).json({ 'error': error })

app.post('/api/persons', (req, res) => {
    const person = req.body

    const validPersonP = person => person.name && person.number
    const uniquePersonP = person => phonebook.filter(
        entry => entry.name === person.name).length === 0

    if (!validPersonP(person)) {
        return errorResponse(res, 400, 'invalid person. supply name and number.')
    }

    if (!uniquePersonP(person)) {
        return errorResponse(res, 400, 'name must be unique')
    }

    const id = Math.floor(Math.random() * (10 ** 4))
    const personEntry = { ...person, 'id': id }

    phonebook = phonebook.concat(personEntry)
    res.json(personEntry)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(entry => entry.id === id)

    person ? res.json(person) : res.status(204).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(entry => entry.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const phonebookEntries = phonebook.length
    const info = `Phonebook has info for ${phonebookEntries} people`
    const timestamp = new Date()

    res.send(`${info}<br /><br />${timestamp}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port ', PORT)
})