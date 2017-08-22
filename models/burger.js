var orm = require("../config/orm.js");

var restaurant = {
  selectAll: function(cols, vals, cb) {
    orm.selectAll("RESTAURANT", cols, vals, function(res) {
      cb(res);
    });
  },
  selectRestaurant: function(colVals, condition, cb) {
    orm.selectRestaurant(colVals, condition, function(res) {
      cb(res);
//      console.log(res);
    });
  }
  //,
  // updateOne: function(objColVals, condition, cb) {
  //   orm.updateOne("RESTAURANT", objColVals, condition, function(res) {
  //     cb(res);
  //   });
  // }
};

module.exports = restaurant;