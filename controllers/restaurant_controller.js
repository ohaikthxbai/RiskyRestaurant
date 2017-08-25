//Set the dependencies
var express = require("express");
var router = express.Router();
var restaurant = require("../models/restaurant.js");

//Get Method for Homepage
router.get("/", function (req, res, next) {
  res.render('../views/index.handlebars');
});

//Post Method after user clicks submit
router.post('/restaurant/submit', function (req, res, next) {
    var DBA_NAME = req.body.DBA_NAME;
    DBA_NAME = DBA_NAME.replace(/[^\w\s]/gi, '');
    res.redirect('/restaurant/' + DBA_NAME);
  });

//Get Result Page after user query
router.get("/restaurant/:DBA_NAME", function (req, res) {
  var DBA_NAME = req.params.DBA_NAME;
  restaurant.selectRestaurant([
    "RESTAURANT"
  ], [
      DBA_NAME
    ], function (data) {
      res.render("result", { restaurant: data });
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
        res.render("restaurant", { restaurant: data });
        console.log(data);
      });
  }); 

module.exports = router;