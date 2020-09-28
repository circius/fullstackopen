const http = require('http')

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

const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(phonebook))
})

const PORT = 3001
app.listen(PORT)
console.log('Server running on port ', PORT)