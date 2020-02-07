const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_mysql",
  password: ""
});

app.get("/", function(req, res) {
  var q = "SELECT COUNT(*) as count FROM users";
  con.query(q, function(error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("home", { data: count });
  });
});

app.post("/register", function(req, res) {
  console.log(req.body);
  var person = { email: req.body.email };
  con.query("INSERT INTO users SET ?", person, function(err, result) {
    console.log(err);
    console.log(result);
    res.redirect("/");
  });
});

app.get("/joke", function(req, res) {
  res.send("Requested the joke route");
});

app.get("/random_num", function(req, res) {
  var num = Math.floor(Math.random() * 10 + 1);
  res.send("Your lucky number is " + num);
});

app.listen(8080, function() {
  console.log("App listening on port 8080!");
});
