//Get dependencies
var connection = require("./connection.js");

//Set the ORMs
var orm = {
//Query to select all elements
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM "+tableInput+ ";";
    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  },
//Select specific restaurant
  selectRestaurant: function(table, vals, cb) {
    var queryString = "SELECT DBA_NAME, RISK, ADDRESS, MAX(INSPECTION_DATE) AS INSPECTION_DATE FROM "+table+" WHERE DBA_NAME LIKE '%"+vals+"%' GROUP BY DBA_NAME, RISK, ADDRESS LIMIT 10;";
    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  }
};

module.exports = orm;
