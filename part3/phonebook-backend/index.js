const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

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

app.post('/api/persons', (req, res) => {
    const person = req.body
    const id = Math.floor(Math.random()*(10**4))
    const personEntry = { ...person, 'id': id}
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

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server running on port ', PORT)
})