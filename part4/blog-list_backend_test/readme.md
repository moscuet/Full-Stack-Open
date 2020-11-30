# backend testing part 4.8-4.14
 Since the backend does not contain any complicated logic, it doesn't make sense to write unit tests for it. The only potential thing we could unit test is the toJSON method that is used for formatting notes. In some situations, it can be beneficial to implement some of the backend tests by mocking the database instead of using a real database. One library that could be used for this is mongo-mock.

#### Integration testing
Integration testing (sometimes called integration and testing, abbreviated I&T) is the phase in software testing in which individual software modules are combined and tested as a group. Integration testing is conducted to evaluate the compliance of a system or component with specified functional requirements.[1] It occurs after unit testing and before validation testing. *wikipedia)

## Test environment

The convention in Node is to define the execution mode of the application with the NODE_ENV environment variable. In our current application, we only load the environment variables defined in the .env file if the application is not in production mode.
It is common practice to define separate modes for development and testing.
Next, let's change the scripts in our package.json so that when tests are run, NODE_ENV gets the value test:
```
 "scripts": {
    "start": "NODE_ENV=production node index.js", 
    "dev": "NODE_ENV=development nodemon index.js",
     .....
    "test": "NODE_ENV=test jest --verbose --runInBand"
  },

```
We also added the runInBand option to the npm script that executes the tests. This option will prevent Jest from running tests in parallel
We specified the mode of the application to be development in the npm run dev script that uses nodemon. We also specified that the default npm start command will define the mode as production.
in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the cross-env package as a development dependency with the command:
```
$ npm install --save-dev cross-env
"scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    // ...
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
  },

```
Now we can modify the way that our application runs in different modes. As an example of this, we could define the application to use a separate test database when it is running tests.

##### Let's make some changes to the module that defines the application's configuration:

require('dotenv').config()\
const PORT = process.env.PORT\
let MONGODB_URI = process.env.MONGODB_URI\

```
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
module.exports = { 
  MONGODB_URI,
  PORT 
}
```

##### Modify .env file
MONGODB_URI=mongodb+srv:..  \
PORT=3001  \
TEST_MONGODB_URI=mongodb+srv://..  

## super test

supertest package help us write our tests for testing the API.\
$ npm install --save-dev supertest

##### simple supertest example:  file.test.js content

```
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
```
Once all the tests (there is currently only one) have finished running we have to close the database connection used by Mongoose. This can be easily achieved with the afterAll method.

When running your tests you may run across the following console warning:'Jest didnot exit after one second after the test run has cpmpleted'
solution: https://mongoosejs.com/docs/jest.html\
or: add a jest.config.js file at the root of the project with the following content:\
``` 
module.exports = {
  testEnvironment: 'node'
}
```

Note: if the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.\
In other words, supertest takes care that the application being tested is started at the port that it uses internally.

## Initializing the database before tests

In order to make our tests more robust, we have to reset the database and generate the needed test data in a controlled manner before we run the test
Our tests are already using the afterAll function of Jest to close the connection to the database after the tests are finished executing. Jest offers many other functions that can be used for executing operations once before any test is run, or every time before a test is run. see: blogsApi.test.js

## run test one by one
The following command only runs the tests found in the tests/blog_api.test.js file:
```
npm test -- tests/blog_api.test.js
```
The -t option can be used for running tests with a specific name:
```
npm test -- -t 'adding a valid new blog' [ note: test will fine specic notes from all .test.js file and run that specific test named'adding a valid new blog' ]
```
The provided parameter can refer to the name of the test or the describe block. The parameter can also contain just a part of the name. The following command will run all of the tests that contain notes in their name:
```
npm test -- -t 'notes'
```
NB: When running a single test, the mongoose connection might stay open if no tests using the connection are run. The problem might be due to the fact that supertest primes the connection, but jest does not run the afterAll portion of the code.

#### test.only & test.skip method
```
test.only('it is raining', () => {
  expect(inchesOfRain()).toBeGreaterThan(0);
});

test.skip('it is not snowing', () => {
  expect(inchesOfSnow()).toBe(0);
});
```

### async/await
Using await is possible only inside of an async function.
```
const main = async () => {
  const notes = await Note.find({})
  const response = await notes[0].remove()
}
```

NOte: the appropriate method for verifying objects in arrays is the toContainEqual matcher.\ 
otherwise we can use toContain. i.e, to veryfy a sring of an Array of strings.\

## error handling : try catch mechanism for async await

```
  try {
    // do the async operations here
  } catch(exception) {
    next(exception)
  }
  notesRouter.post('/', async (request, response, next) => {
    const note = new Note({
    ...
    })
    try { 
      const savedNote = await note.save()
      response.json(savedNote)
    } catch(exception) {
      next(exception)
    }
  })

```

### Eliminating the try-catch
$ npm install express-async-errors \
 introduce the library in app.js:\
 .....
const express = require('express')
require('express-async-errors')
const app = express()
.....
now
```
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
```
can be written as follows:
```
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
```
so now, If an exception occurs in a async route, the execution is automatically passed to the error handling middleware

## Optimizing the beforeEach function

 findout why it following code doesn't work
 ```
 beforeEach(async () => {
  await Blog.deleteMany({})
  initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
})
```
The problem is that every iteration of the forEach loop generates its own asynchronous operation, and beforeEach won't wait for them to finish executing. In other words, the await commands defined inside of the forEach loop are not in the beforeEach function, but in separate functions that beforeEach will not wait for. so the execution of tests begins before the database state is initialized
soluation 1: The Promise.all method can be used for transforming an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as a parameter is resolved.
```
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
```
Promise.all executes the promises it receives in parallel. If the promises need to be executed in a particular order,operations can be executed inside of a for...of block, that guarantees a specific execution order.
```
beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of initialBloges) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
```
### comparing object
 using  === operator for comparing and matching elements, which means that it is often not well-suited for matching objects.
  In most cases, the appropriate method for verifying objects in arrays is the toContainEqual matcher
