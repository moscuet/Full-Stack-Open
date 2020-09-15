const express = require('express');
const app =express();
 app.use(express.json());
 app.use(express.static('build'))
 const cors = require('cors')
 app.use(cors())

 const morgan = require('morgan');
let persons = require('./data/persons')

morgan.token('host', function(req, res) {
  return req.hostname;
});
morgan.token('body', function(req, res) {
 return  Object.keys(req.body).length>0? JSON.stringify(req.body): null;
});
app.use(morgan(':method :host :status :res[content-length] - :response-time ms :body ')); 
//const createId = () => Math.floor(Math.random()*10000000);
const checkDuplicate = name => persons.find( p => p.name===name);


//mongoose
const mongoose = require('mongoose')
const password = 'Mguser1gm'
const url = `mongodb+srv://user1:${password}@cluster0.j79vi.mongodb.net/phonebooks?retryWrites=true&w=majority`;
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});

const contactSchema = new mongoose.Schema({
    name:String,
    number: String
});

const Contact= mongoose.model('Contact',contactSchema)

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts);
    contacts.forEach(contact => {
      console.log(contact)
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
  let id = req.params.id
  Contact.find({}).then(contacts => {
    let person = contacts.find ( p => p._id.toString()===id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
})


app.post('/api/persons', (req, res) => {
  const body = req.body
 if (!body.name||!body.number) {
  return res.status(206).json({ error: 'incomplete input' })
 }

  Contact.exists({name:body.name}, (err, result)=> {
    if(!result){
      const contact = new Contact({
        name: body.name,
        number: body.number,
      })
      contact.save().then(result => {
        console.log('note saved!')
      })
      Contact.find({}).then( contacts=>{  
        res.json(contacts)
      })
    }
    else  {
      return res.status(209).json({ error: 'name must be unique' });
    }
  });
});


app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id, function (err) {
    if(err) {
      console.log(err)
      res.status(404).end();
    }
    else{
    res.status(204).end();
    console.log("Successful deletion");
    }
  });
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})