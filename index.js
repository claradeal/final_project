// create express application to connect with browser to send responses back to get data

const connection = require("./model");
const express = require("express");
// try these two lines
// const mongo = require('mongodb');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser =require('body-parser');
const cors = require('cors');
const expressHandlebars = require('express-handlebars');

const app = express();

const novelController = require("./controllers/novels")

// Basic Configuration 
// var port = process.env.PORT || 3000;
var port = 8080;

// not sure I need these 2 lines
app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// should be true???
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, "/views/"));

// configure handlebars
app.engine("hbs", expressHandlebars({
    extname : "hbs",
    defaultLayout : "mainlayout",
    LayoutsDir : __dirname + "views/layouts"
}));

// tell node express to use view engine handlebars
app.set("view engine", "hbs");

app.get('/', function(req, res){
  console.log(req.url);
//   res.sendFile(process.cwd() + '/views/index.html');
    // res.render("index", {});
    res.render("index");
});

app.use("/novel", novelController);

app.post("/name", function(req, res) {
    // Handle the data in the request
    var titleString = req.body.novelTitle
    var string = req.body.first + " " + req.body.last;
    res.send( titleString, string );
    //   res.json({ name: string });
  });

  // this is the server for express and the connection which is done use Node.js
  app.listen(port, function () {
    console.log('Server started');
  });