// to add new number Anna from command:$ node mongo.js pass(mongoDB) Anna 0401234556

const mongoose = require('mongoose')

if(process.argv.length<3){
  console.log('please provide pasword as an argument: $ node mongo.js <password>')
  console.log('Or, provide pasword, name, number as an argument: $ node mongo.js <password> name number')
  process.exit(1)
}
//console.log('arg',process.argv)
const password = process.argv[2] // process.argv gives all command line arguments value i.e: if we write
const url = `mongodb+srv://user1:${password}@cluster0.j status79vi.mongodb.net/phonebooks?retryWrites=true&w=majority`
mongoose.connect(url,{ useUnifiedTopology:true,useNewUrlParser:true })

const contactSchema = new mongoose.Schema({
  name:String,
  number: String
})
const Contact= mongoose.model('Contact',contactSchema)



if(process.argv.length<4){
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length>4){
  const  contact = new Contact({
    name: process.argv[3],
    number:process.argv[4]
  })
  contact.save().then( res => {
    console.log(`added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })
}