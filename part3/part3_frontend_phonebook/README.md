

to run app in local port with server in part3_backend_heroku: we need to run server as well using separate port with separate bash
1. in root directory of server (part3_backend_heroku): npm run dev
2.  in root directory of phonebook: npm start


To run app from local Json  server:
A. 
01. Create a file named db.json in the root directory of the project and save data object there: { "persons":[...]}
02. install json server and seting port: npx json-server --port 3001 --watch db.json
03. configure script if installation didn't update: package.json=> 
script:{"server": "json-server -p3001 --watch db.json",...}
04. change base url from '/api/persons' to '/persons' in src => service => modules
05. run app in port 3000, and server inn 3001. use diffrent bash to run both separately.\
    server run: $npm run server\
    app run: $npm start \
now app UI should updated with db.json server data

 http://localhost:3001/persons > will show persons object in browser

