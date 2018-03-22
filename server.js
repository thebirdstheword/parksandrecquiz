var express = require("express");
var app = express(); 

//install bodyparser
//so I can get req.body inside routes
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set up MySQL connection.
var mysql = require("mysql");

if (app.settings.env == 'development'){
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
	password: "",
	database: "quiz_db"
});
}else {
	var connection = mysql.createConnection(process.env.JAWSDB_URL);
  }
  
  // Make connection.
  connection.connect(function(err) {
	if (err) {
	  console.error("error connecting: " + err.stack);
	  return;
	}
	console.log("connected as id " + connection.threadId);
  });

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// serve static content...
app.use(express.static(process.cwd() + "/public"));

app.get('/', function(req, res){
  
	var query = "SELECT * FROM scores ORDER BY scores DESC";

	connection.query(query, function(err, result) {
    res.render('quiz', {
		scores: result
	});
	});
});

//make a route called /submit with a method of post that res.json the req.body
app.post('/submit', function(req, res){
	var counter = 0;
	var query = "INSERT INTO scores (name, scores) VALUES (?, ?)";

	if (req.body.question_one == "Partridge, Minnesota") counter++;
	if (req.body.question_two == "So he and Mona Lisa could build a casino in Tajikistan with the insurance money") counter++;
	if (req.body.question_three == "Elizabeth") counter++;
	if (req.body.question_four == "Kate Bosworth") counter++;
	if (req.body.question_five == "Neutral Milk Hotel") counter++;
	if (req.body.question_six == "Liam Bonneville") counter++;
	if (req.body.question_seven == "Christie Brinkley") counter++;
	if (req.body.question_eight == "Cheese pillows, for ravioli") counter++;
	if (req.body.question_nine == "She poured acid on her feet") counter++;
	if (req.body.question_ten == "He was drunk and wanted to get back a toaster") counter++;

	connection.query(query, [req.body.name, counter], function(err, result) {
		if (err) throw err;
		res.redirect('/');
	});
	
});

var port = 3000;
app.listen(port, function(){
	console.log('listening on port ' + port);
});

/*
	after making this file

	you do

	$ npm init -y

	$ npm install express --save

	$ node server.js
*/