

const express = require("express");
const bodyParser = require("body-parser");
var http = require('http');

const app = express();


app.use(express.static("public"));//display css and js
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  // console.log(req);
  res.sendFile(__dirname + "/index.html");
  // res.sendFile(__dirname + "/listPage.html")
});

app.get("/listPage", function(req, res){
  res.sendFile(__dirname + "/listPage.html");
});
app.get("/mapsPage", function(req, res){
  res.sendFile(__dirname + "/mapsPage.html");
});
app.get("/faq", function(req, res){
  res.sendFile(__dirname + "/faq.html");
});



app.listen(process.env.PORT || 3000, function(){
  console.log(`Server started on port ${port}`);
});
