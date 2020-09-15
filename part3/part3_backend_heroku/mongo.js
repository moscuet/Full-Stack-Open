// node mongo.js Mguser1gm Anna 0401234556
const mongoose = require('mongoose')
const password = 'Mguser1gm'
const url = `mongodb+srv://user1:${password}@cluster0.j79vi.mongodb.net/phonebooks?retryWrites=true&w=majority`;
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});
const contactSchema = new mongoose.Schema({
    name:String,
    number: String
});
const Contact= mongoose.model('Contact',contactSchema)



if(process.argv.length<3){
    console.log('phonebook:')
    Contact.find({}).then(result => {
        result.forEach(contact => {
          console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
};

if(process.argv.length>3){
    const  contact = new Contact({
        name: process.argv[2],
        number:process.argv[3]
    });
    contact.save().then( res=>{
        console.log(`added ${res.name} number ${res.number} to phonebook`)
        mongoose.connection.close()
    })
};