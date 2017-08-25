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
    var queryString = "SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, MAX(INSPECTION_DATE) AS INSPECTION_DATE FROM "+table+" WHERE DBA_NAME LIKE '%"+vals+"%' GROUP BY DBA_NAME, RISK, ADDRESS LIMIT 10;";
    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  },

  selectRestaurantByLicense: function(table, vals, cb) {
  var queryString = "SELECT RES.LICENSE_NO AS LICENSE_NO, RES.DBA_NAME AS DBA_NAME, RES.RISK AS RISK, RES.ADDRESS AS ADDRESS, MAX(RES.INSPECTION_DATE) AS INSPECTION_DATE, USR.USERNAME AS USERNAME, COM.COMMENT AS COMMENT, CAST(COM.CREATED_DATE AS DATE) AS COMMENT_DATE FROM "+table+" RES INNER JOIN COMMENT COM ON RES.LICENSE_NO = COM.LICENSE_NO INNER JOIN USER USR ON COM.USER_ID = USR.USER_ID WHERE RES.LICENSE_NO = "+vals+" GROUP BY RES.DBA_NAME, RES.RISK, RES.ADDRESS, USR.USERNAME, COM.COMMENT;"   
  connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  }

};

module.exports = orm;
