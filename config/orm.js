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

//Determine the number of records/restaurants
numberRestaurant: function(table, vals, cb) {
   var queryString = "SELECT COUNT(*) AS DATA_LEN FROM (SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE FROM "+table+" WHERE DBA_NAME LIKE '%"+vals+"%' GROUP BY DBA_NAME, RISK, ADDRESS) b;"

   connection.query(queryString, vals, function(err, result) {
       if (err) {
           throw err;
         }
         cb(result);
   });
 },

 //Determine the number of filtered records/restaurants
numberFilterRestaurant: function(table, vals, cb) {
  var val = vals[0];
  var zip = parseInt(vals[1]);
  var queryString = "SELECT COUNT(*) AS DATA_LEN FROM (SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+") GROUP BY DBA_NAME, RISK, ADDRESS) b;"

  connection.query(queryString, vals, function(err, result) {
      if (err) {
          throw err;
        }
        cb(result);
  });
},

//Select specific restaurant
  selectRestaurant: function(table, vals, cb) {
    
    var val = vals[0];
    var limit = parseInt(vals[1]);
    var page = parseInt(vals[2]);
    var queryString = "";
    var prevPage = page*10-10;
    var nextPage = 10;
  
    if (limit === 1) {
      queryString = "SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'background-color:red; color:black;' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'background-color:yellos; color:black;' ELSE 'background-color:green; color:black;' END END AS RISKCOLOR FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' GROUP BY DBA_NAME, RISK, ADDRESS";
      } else if (page === 1) {
      queryString = "SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'background-color:red; color:black;' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'background-color:yellos; color:black;' ELSE 'background-color:green; color:black;' END END AS RISKCOLOR FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' GROUP BY DBA_NAME, RISK, ADDRESS LIMIT 0, 9;";      
      } else {
      queryString = "SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'background-color:red; color:black;' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'background-color:yellos; color:black;' ELSE 'background-color:green; color:black;' END END AS RISKCOLOR FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' GROUP BY DBA_NAME, RISK, ADDRESS LIMIT "+prevPage+", "+nextPage+";";         
      }

    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  },


  //Select specific restaurant
  filterRestaurant: function(table, vals, cb) {
    
    var val = vals[0];
    var limit = parseInt(vals[1]);
    var page = parseInt(vals[2]);
    var zip = vals[3];
    var queryString = "";
    var prevPage = page*10-10;
    var nextPage = 10;
  
    if (limit === 1) {
      queryString = "SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'background-color:red; color:black;' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'background-color:yellos; color:black;' ELSE 'background-color:green; color:black;' END END AS RISKCOLOR FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+") GROUP BY DBA_NAME, RISK, ADDRESS";
      } else if (page === 1) {
      queryString = "SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'background-color:red; color:black;' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'background-color:yellos; color:black;' ELSE 'background-color:green; color:black;' END END AS RISKCOLOR FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+") GROUP BY DBA_NAME, RISK, ADDRESS LIMIT 0, 9;";      
      } else {
      queryString = "SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'background-color:red; color:black;' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'background-color:yellos; color:black;' ELSE 'background-color:green; color:black;' END END AS RISKCOLOR FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+") GROUP BY DBA_NAME, RISK, ADDRESS LIMIT "+prevPage+", "+nextPage+";";         
      }

    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  },

  selectRestaurantByLicense: function(table, vals, cb) {
  var queryString = "SELECT RES.LICENSE_NO AS LICENSE_NO, RES.DBA_NAME AS DBA_NAME, RES.RISK AS RISK, RES.ADDRESS AS ADDRESS, RES.ZIP AS ZIP, RES.STATE AS STATE, RES.RESULTS AS RESULTS, RES.CITY AS CITY, MAX(RES.INSPECTION_DATE) AS INSPECTION_DATE, RES.VIOLATIONS AS VIOLATIONS, USR.USERNAME AS USERNAME, CASE WHEN COM.COMMENT IS NULL THEN 'No reviews yet. Be the first one to review...' ELSE COM.COMMENT END AS COMMENT, CAST(COM.CREATED_DATE AS DATE) AS COMMENT_DATE FROM "+table+" RES LEFT JOIN COMMENT COM ON RES.LICENSE_NO = COM.LICENSE_NO LEFT JOIN USER USR ON COM.USER_ID = USR.USER_ID WHERE RES.LICENSE_NO = "+vals+" GROUP BY RES.DBA_NAME, RES.RISK, RES.RESULTS, RES.ADDRESS, RES.CITY, RES.STATE, RES.ZIP, RES.VIOLATIONS, USR.USERNAME, CASE WHEN COM.COMMENT IS NULL THEN 'No comments yet' ELSE COM.COMMENT END;"   
  connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  },

  // Select the restaurants base on their location (Google Maps)
  selectRestaurantLocation: function(table, vals, cb) {
    var queryString = "SELECT DBA_NAME, RISK, LOCATION, LONGITUDE, LATITUDE FROM " +table+ " LIMIT 100;";
 //   console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
          }
        cb(result);
        });
    }
};

module.exports = orm;
