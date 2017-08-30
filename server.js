// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require('express-handlebars');
var burger = require("./models/restaurant.js");
var path = require("path");

var Handlebars = require("handlebars");
Handlebars.registerHelper('paginate', require('handlebars-paginate'));

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(methodOverride("_method"));

// Routes
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

 var routes = require("./controllers/restaurant_controller.js");
 app.use("/", routes);

 app.use(express.static(path.join(__dirname, './public')));

 app.use(function(req, res, next){
  res.status(404).render('404_error_template', {title: "Sorry, :( page not found. Please try again"});
});

Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if(a == b) // Or === depending on your needs
      return opts.fn(this);
  else
      return opts.inverse(this);
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = app;
