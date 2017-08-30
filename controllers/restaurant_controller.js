//Set the dependencies
var express = require("express");
var router = express.Router();
var restaurant = require("../models/restaurant.js");

//Get Method for Homepage
router.get("/", function (req, res, next) {
  res.render('../views/index.handlebars');
});

//Get Method for Homepage
router.get("/login", function (req, res, next) {
  res.render('../views/login.handlebars');
});

//Get Method for Homepage (MAPS)
router.get("/map", function (req, res, next) {
  var LOCATION = req.params.LOCATION;
  restaurant.selectRestaurantLocation([
    "RESTAURANT"
  ], [
    LOCATION
  ], function(data) {
    // define array
    var coordinates = [];
    // stringify data
    var dataString;
    // grab only contents within '(' and ')'
    var dataSlice;
    // split the data into two coordinates
    var dataSplit;
    for (i = 0; i < data.length; i++) {
      dataString = JSON.stringify(data[i]);
      dataSlice = dataString.slice(14, 50);
      dataSplit = dataSlice.split(',');
      coordinates.push(dataSplit);
    }
//    console.log(coordinates);
  res.render('../views/map.handlebars', {
    mapData: data} );
  // hmm
  return coordinates;
});
});

//Post Method after user clicks submit
router.post('/restaurant/submit', function (req, res, next) {
  var DBA_NAME = req.body.DBA_NAME;
  DBA_NAME = DBA_NAME.replace(/[^\w\s]/gi, '');
  ZIP = req.body.firstSelect;
  console.log(ZIP);
  if (ZIP === "All Neighborhoods") {
    res.redirect('/restaurant/' + DBA_NAME);
  } else {
    res.redirect('/filter/' + DBA_NAME + "/" + ZIP);
  }
});

//Get the number of records
router.get("/restaurant/:DBA_NAME", function (req, res) {
  var DBA_NAME = req.params.DBA_NAME;
  var PAGE = req.query.page;
  restaurant.numberRestaurant([
    "RESTAURANT"
  ], [
      DBA_NAME
    ], function (data) {
      res.redirect('/restaurant/' + DBA_NAME + "/" + data[0].DATA_LEN + "?page=1");
    });
});

//Get the number of filtered records
router.get("/filter/:DBA_NAME/:ZIP", function (req, res) {
  var DBA_NAME = req.params.DBA_NAME;
  var PAGE = req.query.page;
  var ZIP = req.params.ZIP;
  restaurant.numberFilterRestaurant([
    "RESTAURANT"
  ], [
      DBA_NAME, ZIP
    ], function (data) {
      res.redirect('/filter/' + DBA_NAME + "/" + ZIP + "/" + data[0].DATA_LEN + "?page=1");
    });
});


//Get Result Page after user query
router.get("/restaurant/:DBA_NAME/:DATA_LEN", function (req, res) {
  var DBA_NAME = req.params.DBA_NAME;
  var PAGE_NO = req.query.page;
  var DATA_LEN = req.params.DATA_LEN;
  restaurant.selectRestaurant([
    "RESTAURANT"
  ], [
      DBA_NAME, DATA_LEN, PAGE_NO
    ], function (data) {
      res.render("result", {
        restaurant: data, pagination: {
          page: PAGE_NO,
          pageCount: Math.ceil(DATA_LEN / 10)
        }
      })
      ;

    });
});


//Get Filtered results by neighborhood
router.get("/filter/:DBA_NAME/:ZIP/:DATA_LEN", function (req, res) {
  var DBA_NAME = req.params.DBA_NAME;
  var PAGE_NO = req.query.page;
  var DATA_LEN = req.params.DATA_LEN;
  var ZIP = req.params.ZIP;
  restaurant.filterRestaurant([
    "RESTAURANT"
  ], [
      DBA_NAME, DATA_LEN, PAGE_NO, ZIP
    ], function (data) {
      res.render("result", {
        restaurant: data, pagination: {
          page: PAGE_NO,
          pageCount: Math.ceil(DATA_LEN / 10)
        }
      });
    });
});

//Post Method after user clicks submit
router.post('/info/:LICENSE_NO', function (req, res, next) {
  var LICENSE_NO = req.params.LICENSE_NO;
  res.redirect('/info/' + LICENSE_NO);
});

//Get Result Page after user query
router.get("/info/:LICENSE_NO", function (req, res) {
  var LICENSE_NO = req.params.LICENSE_NO;
  restaurant.selectRestaurantByLicense([
    "RESTAURANT"
  ], [
      LICENSE_NO
    ], function (data) {
      var riskColor;
      if (data[0].RISK === 'Risk 1 (High)') {
        riskColor = 'background-color: red'
      } else if (data[0].RISK === 'Risk 2 (Medium)') {
        riskColor = 'background-color: yellow; color: black;'
      } else {
        riskColor = 'background-color: green; color: black;'
      }
      res.render("restaurant", { restaurant: data, risk: riskColor });
    });
});

module.exports = router;