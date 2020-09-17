
require('dotenv').config()
const express = require('express');
const app =express();
const cors = require('cors')
app.use(express.static('build'))
 app.use(express.json());
 app.use(cors())
const Contact = require('./models/contact');
const { update } = require('./models/contact');

 const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    console.log('Eror Name',error.name)
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

 const morgan = require('morgan');
morgan.token('host', function(req, res) {
  return req.hostname;
});
morgan.token('body', function(req, res) {
 return  Object.keys(req.body).length>0? JSON.stringify(req.body): null;
});
app.use(morgan(':method :host :status :res[content-length] - :response-time ms :body ')); 

//mongoose

//error handler


app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts);
    contacts.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
  })
});

app.get('/info', (req, res) => {
  Contact.find({}).then(contacts => {
    let count = contacts.reduce((accu,curr)=> accu+1,0);
    let time =  new Date();
    let html = `<div> <p>phone book has infor for ${count} people</p><p> ${time}</p> </div>`
    res.end(`${html}`);
  })
});

app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body
 if (!body.name||!body.number) {
  return res.status(206).json({ error: "Name or Number is missing" })
 }
      const contact = new Contact({
        name: body.name,
        number: body.number,
      })
      contact.save().then(savedContact => {
        console.log('note saved!', savedContact)
        res.json(savedContact);
      })
});
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
   console.log('body',body )
  const contact = {
    name: body.name,
    number: body.number
  }
  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(update => {
      response.json(update)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      if(result){
        res.status(204).end()
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})