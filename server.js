var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
const path = require('path');
var bodyParser = require('body-parser');



const {getHomePage} = require('./routes/index');
const {addQuotePage, addQuote, addQ, deleteQuote, editQuote, editQuotePage} = require('./routes/quote');




app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder



var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'quotes-db'
});
global.db = db;


db.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server app listening at http://%s:%s", host, port)
});



// routes for the app

app.get('/', addQuotePage);
app.get('/addQ', addQ);
app.get('/edit/:id', editQuotePage);
app.get('/delete/:id', deleteQuote);
app.post('/add', addQuote);
app.post('/edit/:id', editQuote);
