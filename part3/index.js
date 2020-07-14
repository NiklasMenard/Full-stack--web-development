const express = require('express')
const app = express()

app.use(express.json()) 

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      },
      { 
        "name": "Bob", 
        "number": "39-23-6423122",
        "id": 5
      }
]

app.get('/info', (req, res) => {
  const date = new Date()
  const length = persons.length
  
  res.send('Phonebook has info for ' + length + ' people ' + date)
    
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

const generatePNumber = () => {
  const pNumber = parseInt(Math.random()*1000000000, 10)
  return pNumber
}

app.post('/api/persons', (req, res) => {
  console.log(req.headers)
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    name: body.content,
    number: generatePNumber(),
    id: generateId(),
  }

  if (!persons.includes(body.content) || !person.number) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})