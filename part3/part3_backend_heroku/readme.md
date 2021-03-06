
backend deployed in heroku: https://limitless-thicket-23088.herokuapp.com/

running from local machine: $npm start \
running from local machine with nodemon: $npm run dev

## documentation

1. npm init,
2. root=> index.js
2. add to package.json script: "start": "node index.js",
4. $ npm install express --save
5. run server: $ npm start / $ node index.js
6. $npm update
7. $npm install
8. add to on top of index.js: const express = require('express'); const app = express()
9. add route
10. add at the bottom of index.js:
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })
11. test server: npm start

install heroku: (node and npm should be installed already)

1. $ npm install -g heroku // If for some reason you cannot install Heroku to your computer, use locally insatallation: npx heroku-cli
2. cheack version installed: $heroku --version => heroku/7.42.13 darwin-x64 node-v12.16.2
3. $ heroku login
3. cd app-folder
4. $ heroku create
5. update heroku: $npm upgrade -g heroku
6. git add => commit => $ git push heroku master
7. $ heroku open

now add routes code to index js and install all dependency:
1. nodemon: $ npm install --save-dev nodemon
            add to script: "dev": "nodemon index.js",
            run  server with nodemon: $npm run dev
            run server without nodemon: npm start
2. morgan: $ npm install morgan => add to server file: const morgan = require('morgan')

# connecting with frontend:
 
 ### to solve same origin policy need to install CORS
 1. $ npm install cors --save
 2. add to server file: const cors = require('cors'); app.use(cors())
 3. update  url of front end http request to new deployed heroku url
 4. test the app

 # front end production build:
 1.  update baseUrl: build and server file is in same directory. so we can remove server part from base url
  https://vast-atoll-51076.herokuapp.com/api/persons =>  const baseUrl = '/api/persons'
 2. in root: $npm run build
 3. copy and paste root build folder from app root to server root manually / command line:
   $cp -r build ../../../osa3/notes-backend
3. using static middleware: To make express show static content, the page index.html and the JavaScript etc. it fetches, we need a built-in middleware from express called static.
   add to server file index.js: $app.use(express.static('build'))
4. now run app in server directory root: npm start /npm run dev
5. app is working from locat port
6. commit and push to heroku
### note : 
1. heroku logs -t
deploy without manual task (front end production build: 2-6)
example: 
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}

setting proxy:

  now when we run server and our phoneboook app in separate bash. our app doesn't work because we chage based url of httprequest during build. so app port 3000 and it send request to 3000 port as well (/api/persons). we can set proxy server to connnect it to actual local server address 3001 without changing base url.
  {
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}

now app should work locally


## Streamlining deploying of the frontend
 
To create a new production build of the frontend without extra manual work, let's add some npm-scripts to the package.json of the backend repository:\

{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/", //[notes: from backend directory cd...=>app directory && copy build to backendfolder ]
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}



## Mongodb:

data deleting from collection:
https://kb.objectrocket.com/mongo-db/how-to-delete-documents-with-mongoose-235 



## .env
1. in root install: $ npm install dotenv --save
2. create .env file in root
3. define variable in the .env file
   example: PORT=3001
   MONGODB_URI=mongodb+srv:phonebooks?retryWrites=true&w=majority 
   Note: dont use string quatation (' ') or backtac (` `)
            
4. getting value from .env file
   add on top of index.js:  require('dotenv').config()
                            const PORT = process.env.PORT

 

 # Order of error handler (very important)
 The json-parser middleware should be among the very first middleware loaded into Express.
1. app.use(express.static('build'))
2. app.use(express.json())
3. app.use(logger)
 1. errorHandaler should be at the end
 2. unknown endpoints handler should be second last middleware


Tips: When you deploy your application to Heroku, it is worth it to at least in the beginning keep an eye on the logs of the heroku application AT ALL TIMES with the command heroku logs -t.

### mongoose-unique-validator
mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema. \
https://github.com/blakehaswell/mongoose-unique-validator \
$ npm install --save mongoose-unique-validator \
const uniqueValidator = require('mongoose-unique-validator');

```
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
  contactSchema.plugin(uniqueValidator);
```
Now when you try to save a user, the unique validator will check for duplicate database entries 
//and report them just like any other validation error:


## Lint : ESlint
  Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code. \
  In the JavaScript universe, the current leading tool for static analysis aka. "linting" is ESlint.
 //install ESlint as a development dependency to the backend project with the command:
  $ npm install eslint --save-dev

### initialize a default ESlint configuration with the command: 

  $ node_modules/.bin/eslint --init
  it should save a file in directory named eslintrc.js
run ESlint for single file: node_modules/.bin/eslint index.js // for index.js
run Eslint for all files in directory: 
1.  create a separate npm script for linting:
```
   {
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...
    "lint": "eslint ."
  },
  // ...
}
```
$ npm run lint  \
then  Now the npm run lint command will check every file in the project.

Avoid checking build folder by creating .eslintignore file in the project's root with the following contents: build
this causes the entire build directory to not be checked by ESlint.

## problem and solution: 
  removing process undefined problem: 
  add "node": true to the env in .eslintrc.js file
  
```
  module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "commonjs": true,
        "es6": true
    },
...
}

The configuration will be saved in the .eslintrc.js file:
module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        
    }
}
```
add the eqeqeq rule that warns us, if equality is checked with anything but the triple equals operator. \
Let's prevent unnecessary trailing spaces at the ends of lines, let's require that there is always a space before and after curly braces, and let's also demand a consistent use of whitespaces in the function parameters of arrow functions.\
This includes a rule that warns about console.log commands. Disabling a rule can be accomplished by defining its "value" as 0 in the configuration file. Let's do this for the no-console rule in the meantime.\

Our default configuration takes a bunch of predetermined rules into use from eslint:recommended:
'extends': 'eslint:recommended',\

```
  // ...
  {
  // ...
  'rules': {
    // ...
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error', 'always'
    ],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'extends': 'eslint:recommended',
  },
}
```

### NB
 when you make changes to the .eslintrc.js file, it is recommended to run the linter from the command line. This will verify that the configuration file is correctly formatted:


If there is something wrong in your configuration file, the lint plugin can behave quite erratically.

Many companies define coding standards that are enforced throughout the organization through the ESlint configuration file. It is not recommended to keep reinventing the wheel over and over again, and it can be a good idea to adopt a ready-made configuration from someone else's project into yours. Recently many projects have adopted the Airbnb Javascript style guide by taking Airbnb's ESlint configuration into use.

### Plugin
A better alternative to executing the linter from the command line is to configure a eslint-plugin to the editor, that runs the linter continuously. By using the plugin you will see errors in your code immediately. 
vs code eslint pluggin: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
