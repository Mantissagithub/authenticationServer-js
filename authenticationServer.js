// this is jus te basic solution done by me

const express = require("express")
const port = 3000;
const app = express();
var bodyParser = require('body-parser');
const short = require('shortid');

app.use(bodyParser.json());

const arr = [];

function signup(req, res) {
    var bo = req.body;
    var username = bo.username;
    var password = bo.password;
    var firstName = bo.firstName;
    var lastName = bo.lastName;
    var i = short();
    bo.id = i;
  
    for (var j = 0; j < arr.length; j++) {
      if (username == arr[j].username) {
        return res.status(400).send("username already exists");
      }
    }
  
    arr.push(bo);
    res.status(201).send("created successfully");
  }

app.post('/signup',signup);

function login(req, res) {
    var bo = req.body;
    var username = req.body.username;
    var password = req.body.password;
  
    for (var i = 0; i < arr.length; i++) {
      if (username == arr[i].username && password == arr[i].password) {
        return res.status(200).send(arr[i]);
      }
    }
  
    res.status(401).send("credentials are invalid");
  }

app.post('/login',login);

function data(req, res, next) {
    var headers = req.headers;
    var username = headers.username;
    var password = headers.password;
  
    for (var i = 0; i < arr.length; i++) {
      if (username == arr[i].username && password == arr[i].password) {
        return next();
      }
    }
  
    res.status(401).send("unauthorized");
  }

app.get('/data', data, (req, res) => {
    const userArray = arr.map(user => {
        return { firstname: arr.firstname, lastname: arr.lastname, id: arr.id };
      });
      const data = { users: userArray };

      res.status(200).send(data);
});

function consoleLog() {
    console.log(`Example app listening on port ${port}`);
  }
  
  app.listen(port, consoleLog);