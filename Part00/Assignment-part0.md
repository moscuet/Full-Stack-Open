
## 0.4: new note
browser makes 5 HTTP request: one POST request and four GET request  

browser->server: HTTP POST : https://fullstack-exampleapp.herokuapp.com/new_note  
server-->browser: HTTP status code 302 (server asks the browser to make a HTTP GET request to the address '/note' which is defined in the header's Location )  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes  
server-->browser: HTML-code  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css  
server-->browser: main.css  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js  
server-->browser: main.js  

browser starts executing js-code that made a Http requests to the address https://fullstack-exampleapp.herokuapp.com/data.json whics return updated notes as a JSON data :  

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json  
server-->browser: [{ content: "HTML is easy", date: "2019-05-23..." }, .....{"content":"assignment 04","date":"2020-08-24T12:00:42.610Z"}]  

Now, browser will invoke a event handler to renders notes on browser


## 0.5: Single page app (first time loading)
Browser makes 4 HTTP GET request: \

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa  
server-->browser: HTML-code  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css  
server-->browser: main.css  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js  
server-->browser: main.js  

now, browser starts executing js-code which invoke a Http requests to the address https://fullstack-exampleapp.herokuapp.com/data.json & receive notes as a JSON data.  

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json  
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }...]  

Now, browser will renders notes on browser


## 0.6: New note (single App)

In case of the single app, during form submission browser make only one HTTP (POST) request to the address location 'new_note_spa ' and server responds with status 201 which mean that The request has been fulfilled and has resulted in one or more new resources being created.  

 
step 01: the JavaScript code it fetched from the server during initial load invoke an event handler. Event handler createa  new-note and add it to notes and update UI.  

step 02. browser send new note to the server  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/new_note_spa with payload {content: "awesome", date: "2020-08-25T04:27:08.808Z"}  
server-->browser: {"message":"note created"}
