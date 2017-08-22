var mysql = require("mysql");
var connection;

    // var connection = mysql.createConnection({
    //   port: 8889,
    //   host: "127.0.0.1",
    //   user: "root",
    //   password: "root",
    //   database: "restaurant_db"
    // });

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

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
