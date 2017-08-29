//Require dependencies
var orm = require("../config/orm.js");

//Call ORMs
var restaurant = {
  selectAll: function(cols, vals, cb) {
    orm.selectAll("RESTAURANT", cols, vals, function(res) {
      cb(res);
    });
  },
  numberRestaurant: function(colVals, condition, cb) {
    orm.numberRestaurant(colVals, condition, function(res) {
      cb(res);
    });
  },
  selectRestaurant: function(colVals, condition, cb) {
    orm.selectRestaurant(colVals, condition, function(res) {
      cb(res);
    });
  },
  selectRestaurantByLicense: function(colVals, condition, cb) {
    orm.selectRestaurantByLicense(colVals, condition, function(res) {
      cb(res);
    });
  }
};

module.exports = restaurant;