//Set the dependencies
var mysql = require("mysql");
var connection;

//Set up the connection to the database / Heroku
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  port: 8889,
  database: "restaurant_db"
  });
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
