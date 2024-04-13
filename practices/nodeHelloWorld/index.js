const express = require('express')
const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 24,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }, {
    id: 4,
    content: "This is an important note!!!",
    important: true
  }, {
    id: 5,
    content: "Watching path(s)",
    important: true
  },
  {
    id: 6,
    content: "Starting `node index.js",
    important: false
  },
  {
    id: 7,
    content: "Starting due to changes",
    important: true
  }, {
    id: 8,
    content: "Server running on port 3001",
    important: true
  }, {
    id: 9,
    content: "Nodemon starting",
    important: true
  },
  {
    id: 10,
    content: "Fatal: not a git repository",
    important: false
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!!!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const noteId = Number(request?.params?.id)
  
  const note = notes.find(({ id }) => noteId === id)

  return note?.id 
    ? response.json(note)
    : response.status(404).send('Resource not found')
})

app.delete('/api/notes/:id', (request, response) => {
  const noteId = Number(request?.params?.id)

  notes = notes?.filter(({ id }) => noteId !== id)

  response.status(204).end()
})

app.use(express.json())

// Tambien se podria hacer con Math.max
const getMaxId = (list) => {
  if (!list?.length) return 0

  let maxId = 0
  for (const note of notes) {
    if ( note?.id > maxId ) {
      maxId = note?.id
    }
  }
  return maxId
}

const generateId = () => {
  return getMaxId(notes) + 1
}

app.post('/api/notes', (request, response) => {
  const body = request?.body

  if (!body?.content) {
    return response.status(400).json({ error: 'Content missing' })
  }

  const note = {
    content: body.content, // 0
    important: Boolean(body?.important) || false,
    id: generateId()
  }

  notes = notes?.concat(note)
  response.json(note)
})

const PORT = 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)