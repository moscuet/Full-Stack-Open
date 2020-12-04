# HTTP call tips:
1. adding new user by POST request: \





3




# details explanation: 
## Database type

### ralational database
### document database ( mongo)

## PasswordHash
The password hash is the output of a one-way hash function applied to the user's password. It is never wise to store unencrypted plain text passwords in the database!
1.0 Let's install the bcrypt package in root for generating the password hashes
```
$ npm install bcrypt / install in root
```

2. contollers/users.js: \
 ```
 const bcrypt = require('bcrypt')
 .........
 usersRouter.post('/', async (request, response) => {
  const body = request.body
  // usning passwordHash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.json(savedUser)
})
```
## validate the uniqueness of the username with the help of Mongoose validators.
$ npm install mongoose-unique-validator \
models/user.js: 
1. const uniqueValidator = require('mongoose-unique-validator')
2. 
```
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  ...
}
userSchema.plugin(uniqueValidator)
```

## populate

We would like our API to work in such a way, that when an HTTP GET request is made to the /api/users route, the user objects would also contain the contents of the user's blogs, and not just their id. In a relational database, this functionality would be implemented with a join query.document databases do not properly support join queries between collections, but the Mongoose library can do some of these joins for us.
```
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users)
})
```
The populate method is chained after the find method making the initial query. The parameter given to the populate method defines that the ids referencing blog objects in the blogs field of the user document will be replaced by the referenced blog documents. \

Database does not actually know that the ids stored in the user field of notes reference documents in the user collection.
The functionality of the populate method of Mongoose is based on the fact that we have defined "types" to the references in the Mongoose schema with the ref option

## Token Authentication
resource: https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication#toc-how-token-based-works 

### Json Web Token:
$ npm install jsonwebtoken \
controllers/login.js: 
```
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

App.js:
const loginRouter = require('./controllers/login')
//...
app.use('/api/login', loginRouter)
```

## Token Error handling
add to errorHandler: 
```
} else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
```
### accessing token


Following The middleware  take the token from the Authorization header and place it to the token field of the request object. In other words, if you register this middleware in the app.js file before all routes, routes can access the token with request.token
app.js: app.use(middleware.tokenExtractor)
blogsRouter.post('/', async (request, response) => {
  // ..
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // ..
})

Remember that a normal middleware is a function with three parameters, that at the end calls the last parameter next in order to move the control to next middleware:
```
const tokenExtractor = (request, response, next) => {
  // code that extracts the token

  next()
}
```