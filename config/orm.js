var connection = require("./connection.js");


var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM "+tableInput+ ";";
    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO "+table+" ("+cols+", devoured, date) VALUES ( '"+vals+"' , 0 , curdate() );";
    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  },
  updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE  "+table+" SET devoured =  1 WHERE "+condition+ ";";
    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  }
};

module.exports = orm;
