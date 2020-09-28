const express = require('express')
const app = express()

const phonebook = [
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