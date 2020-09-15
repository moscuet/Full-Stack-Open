
backend deployed in heroku: https://limitless-thicket-23088.herokuapp.com/


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
7. heroku open

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
  https://vast-atoll-51076.herokuapp.com/api/persons =>  const baseUrl = '/apipersons'
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

 