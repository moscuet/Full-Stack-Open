const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  } ,
  author:{
    type:String,
    required:true
  } ,
  url:{
    type:String,
    required:true
  } ,
  likes:{
    type:Number,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString() //Even though the _id property of Mongoose objects looks like a string, it is in fact an object. The toJSON method we defined transforms it into a string just to be safe.
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

/* blog sample or post

 {
        "title": "testing user blog",
        "author": "Mostafizur",
        "url": "url",
        "likes": 10,
        "user": "5fc5dd965f9c6d182e3b54fc"
    }

*/