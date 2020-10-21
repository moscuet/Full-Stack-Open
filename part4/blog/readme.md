npm init,
root=> index.js
add to package.json script: "start": "node index.js",
$ npm install express --save // const express = require('express'); const app = express()
run server: $ npm start / $ node index.js
$npm update
$ npm install cors // const cors = require('cors'); app.use(cors())
$ npm install mongoose // const mongoose = require('mongoose'); 
$npm install dotenv //require('dotenv').config() then create .env file and add environment-specific variables on new lines in the form of NAME=VALUE.   [install in index.js as early as possible ]

### explain MongoDB_URI:
MONGODB_URI=mongodb+srv://user1:${@cluster0.j79vi.mongodb.net/phonebooks?retryWrites=true&w=majority \
user1: Mongodb  user (create user and set permission) \
phonebooks: database name \

```
const Blog = mongoose.model('Blog', blogSchema)
```
'Blog' inside () must be same as mongodb collection (blogs) name ;




