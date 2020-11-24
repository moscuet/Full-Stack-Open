# part 4.8-4.14 backend testing
 Since the backend does not contain any complicated logic, it doesn't make sense to write unit tests for it. The only potential thing we could unit test is the toJSON method that is used for formatting notes. In some situations, it can be beneficial to implement some of the backend tests by mocking the database instead of using a real database. One library that could be used for this is mongo-mock.

#### Integration testing
Integration testing (sometimes called integration and testing, abbreviated I&T) is the phase in software testing in which individual software modules are combined and tested as a group. Integration testing is conducted to evaluate the compliance of a system or component with specified functional requirements.[1] It occurs after unit testing and before validation testing. *wikipedia)

## Test environment

The convention in Node is to define the execution mode of the application with the NODE_ENV environment variable. In our current application, we only load the environment variables defined in the .env file if the application is not in production mode.
It is common practice to define separate modes for development and testing.
Next, let's change the scripts in our package.json so that when tests are run, NODE_ENV gets the value test:
1.0 
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
```
module.exports = { \
  MONGODB_URI,\
  PORT
}\

##### Modify .env file
MONGODB_URI=mongodb+srv:..
PORT=3001
TEST_MONGODB_URI=mongodb+srv://..


## super test

supertest package help us write our tests for testing the API.
$ npm install --save-dev supertest

##### simple supertest:  file.test.js content

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















# Test frontend 
## part4.1-4.7 Router:
A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router. \
The router is in fact a middleware, that can be used for defining "related routes" in a single place, that is typically placed in its own module.
he app.js file that creates the actual application, takes the router into use as shown below:

```
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)

```


## TEsting node application : JEST
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
 
 expect(favoriteBlog(blogs)).toEqual(blogs[2])


