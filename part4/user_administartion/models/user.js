const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required:true,
    minlength: 3,
    unique: true
  },
  name: String,
  passwordHash: {
    type:String,
    minlength: 3,
    required:true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})
// checking unicness of username
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User

/*create user post: {
  "username": "rahman",
  "name": "mostafizur",
  "password": "passrahman"
}

login user post:
{
  "username": "rahman",
  "password": "passrahman"
}
temporary login token: will receive this token everytime logged in by usercredential. to make blog post call from postman , use this token in authntication in header without <">
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaG1hbiIsImlkIjoiNWZjNWRkOTY1ZjljNmQxODJlM2I1NGZjIiwiaWF0IjoxNjA2ODA2NzE4fQ.KIuu1zAwgUQCV1tn5hj_g9SxrWTJGLsZyJrcoX_jlQU"
5fc6233cbe25d62a3ff2f0eb
5fc7f038c4f83937c29b8dd6

user1: pass1: 5fc7f038c4f83937c29b8dd6
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI1ZmM3ZjAzOGM0ZjgzOTM3YzI5YjhkZDYiLCJpYXQiOjE2MDY5Mzg5MzR9.Zkvud2MBXuEW6pIAomenfPC06j-UggL8YhSeP9-jeQ0"
*/