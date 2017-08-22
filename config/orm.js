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
  selectRestaurant: function(table, vals, cb) {
    var queryString = "SELECT DBA_NAME, RISK, ADDRESS FROM "+table+" WHERE DBA_NAME = '"+vals+"' LIMIT 10;";
    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
//          console.log(result);
    });
  }
  // ,
  // updateOne: function (table, objColVals, condition, cb) {
  //   var queryString = "UPDATE  "+table+" SET devoured =  1 WHERE "+condition+ ";";
  //   connection.query(queryString, function(err, result) {
  //       if (err) {
  //           throw err;
  //         }
  //         cb(result);
  //   });
  // }
};

module.exports = orm;
