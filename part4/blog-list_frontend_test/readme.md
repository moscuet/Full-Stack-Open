Assignment: 4.1-4.7 \
Front end
#### testing: JEST, library: Loadash 
npm init\
root=> index.js\
add to package.json script: "start": "node index.js",\
$ npm install express --save // const express = require('express'); const app = express()\
run server: $ npm start / $ node index.js\
$npm update\
$ npm install cors // const cors = require('cors'); app.use(cors())\
$ npm install mongoose // const mongoose = require('mongoose');\
$npm install dotenv //require('dotenv').config() then create .env file and add environment-specific variables on new lines in the form of NAME=VALUE. [install in index.js as early as possible ]

### explain MongoDB_URI:
MONGODB_URI=mongodb+srv://user1:${password}@cluster0.j79vi.mongodb.net/phonebooks?retryWrites=true&w=majority \
user1: Mongodb  user (create user and set permission)\
phonebooks: database name\

```
const Blog = mongoose.model('Blog', blogSchema)
```
'Blog' inside () bracket must be same as mongodb collection name(blogs) ;




## Router:
A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router. \
The router is in fact a middleware, that can be used for defining "related routes" in a single place, that is typically placed in its own module.
he app.js file that creates the actual application, takes the router into use as shown below:

```
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)

```


# TEsting node application : JEST
### setup
// debugging while testing: https://jestjs.io/docs/en/troubleshooting \
$ npm install --save-dev jest \

#### add to script:\
"test": "jest --verbose"
#### Jest requires one to specify that the execution environment is Node. add to package.json
```
"jest": {
    "testEnvironment": "node"
  },
```
aletrnative way: Jest can look for a configuration file with the default name jest.config.js, \
creating a file named jest.config.js with content  excecution environment- 
```
module.exports = {
  testEnvironment: 'node',
};
```
 
 The ESLint configuration we added to the project in the previous part complains about the test and expect commands in our test file, since the configuration does not allow globals. Let's get rid of the complaints by adding "jest": true to the env property in the .eslintrc.js file.

 Jest expects by default that the names of test files contain .test. In this course, we will follow the convention of naming our tests files with the extension .test.js. (i.e, average.test.js in tests directory) \

#### run all test:
 run test:$ npm test 

#### running single test:
1.You can run a single test with the only method. \
 https://jestjs.io/docs/en/api.html#testonlyname-fn-timeout

 2. Another way of running a single test (or describe block) is to specify the name of the test to be run with the -t flag:\
```
describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })
    $npm test -- -t 'testName' \
    $npm test -- -t 'deccribe' \
    ex: $ npm test -- -t 'of one value is the value itself'
        $npm test -- -t 'average'

```

when you are comparing objects, the toEqual method is probably what you want to use, since the toBe tries to verify that the two values are the same value, and not just that they contain the same properties.\
 
 expect(favoriteBlog(blogs)).toEqual(blogs[2]) \

## Lodash
$ npm i --save lodash
import lodash array module: const array = require('lodash/array');



 https://jestjs.io/
 https://lodash.com/docs/4.17.15#ceil
