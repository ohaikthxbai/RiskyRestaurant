//Set the dependencies
var mysql = require("mysql");
var connection;

//Set up the connection to the database / Heroku
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
  host: "aa5x1rk0fqm3ds.cumqg7aejaoq.us-east-2.rds.amazonaws.com",
  user: "restaurantdb",
  password: "bopboprisky",
  port: 3306,
  database: "ebdb"
  });
 // console.log(process.env.NODE_ENV);
};

//Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
