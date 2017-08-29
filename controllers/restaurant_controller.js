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

  router.get("/restaurant/:DBA_NAME", function (req, res) {
    var DBA_NAME = req.params.DBA_NAME;
    var PAGE = req.query.page;
  //  console.log(PAGE);
    restaurant.numberRestaurant([
      "RESTAURANT"
    ], [
        DBA_NAME
      ], function (data) {
        res.redirect('/restaurant/' + DBA_NAME+"/"+data[0].DATA_LEN+"?page=1");
        console.log(data[0]);
  });
});


//Get Result Page after user query
router.get("/restaurant/:DBA_NAME/:DATA_LEN", function (req, res) {
  var DBA_NAME = req.params.DBA_NAME;
  var PAGE_NO = req.query.page;
  var DATA_LEN = req.params.DATA_LEN;
//  console.log(PAGE);
  restaurant.selectRestaurant([
    "RESTAURANT"
  ], [
      DBA_NAME, DATA_LEN, PAGE_NO
    ], function (data) {
      res.render("result", { restaurant: data, pagination: {
        page: 3,
        pageCount: Math.ceil(DATA_LEN/10)
      } } );
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