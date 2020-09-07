const express = require('express')
const app = express()
app.use(express.json())
const notes = require('./src/data/data')

app.get(  '/', (req, res) => {
  //app.use(express.bodyParser());
  //var keyName=request.query.id;
   //console.log(keyName);
  res.send('<h1>Hello worlddd!</h1>')
  console.log('hi',req)
})
app.get('/api/notes/:id', (req,res) => {
   let id = Number( req.params.id)
   let note = notes.find( note => note.id===id)
  res.json(note)
})


app.get('/api/notes', (req, res) => {
  res.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})