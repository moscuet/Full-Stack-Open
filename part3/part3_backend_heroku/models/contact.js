/* eslint-disable no-unused-vars */

const mongoose = require('mongoose')
//npm install --save mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator')
// attach it to user schema : contactSchema.plugin(uniqueValidator); and to schema : unique: true
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true
  },
  number: {
    type: Number,
    min:10000000
  }
})
contactSchema.plugin(uniqueValidator)
//Now when you try to save a user, the unique validator will check for duplicate database entries
//and report them just like any other validation error:
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)