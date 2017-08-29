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
// comment post

router.post('/restaurant/comment', function (req, res, next) {
    var COMMENT = req.body.COMMENT;
    var LICENSE_NO = req.body.LICENSE_NO;
  restaurant.create([
    "USER_ID", "COMMENT", "LICENSE_NO"
  ], [
    9999, req.body.COMMENT, req.body.LICENSE_NO
  ], function() {
        res.redirect('/info/' + LICENSE_NO);
  });
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


router.get("/dashboard", function (req, res, next) {
  res.render('../views/dashboard.handlebars');
});

// get comment for dashboard

router.get("/dashboard", function (req, res) {
  var comment = req.params.COMMENT;
  comment.selectComment([
    "Comment"
  ], [
      
    ], function (data) {
      res.render("result", { comment: data });
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
