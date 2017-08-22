var express = require("express");
var router = express.Router();
var restaurant = require("../models/burger.js");


// router.get("/", function(req, res) {
//   burger.selectAll(function(data) {
//   var hbsObject = { 
//        burgers: data 
//       };
//   res.render('../views/index.handlebars', hbsObject);
//   });  
// });

// router.post("/", function(req, res) {
//   console.log(req.body.burger_name);
//   burger.insertOne([
//     "burger_name"
//   ], [
//     req.body.burger_name
//   ], function() {
//     res.redirect("/");
//   });
// });

router.get("/", function(req, res, next) {
    res.render('../views/index.handlebars');
});

// router.get("/:DBA_NAME", function(req, res) {
//     console.log(req.body.DBA_NAME);
//     var condition = "DBA_NAME = " + req.params.DBA_NAME;
//     console.log(condition);
//     restaurant.selectRestaurant([
//       "DBA_NAME"
//     ], [
//       req.body.DBA_NAME
//     ], function(data) {
//       res.redirect("/");
//     });

//   });

  router.get("/restaurant/:DBA_NAME", function(req, res) {
 //   res.render('test', {output: req.params.DBA_NAME});
      var DBA_NAME = req.params.DBA_NAME;
    // console.log("condition", condition);
      restaurant.selectRestaurant([
    "RESTAURANT"
  ], [
    DBA_NAME
  ], function(data) {
    res.render("test", {restaurant: data});
    console.log(data);
  });
  
//     restaurant.selectRestaurant({
//       table: "RESTAURANT"
//     }, condition, function() {
//  //     res.render("/");
//         console.log(condition);
//     });
    });

    router.post('/restaurant/submit', function(req, res, next) {
      var DBA_NAME = req.body.DBA_NAME;
      res.redirect('/restaurant/' + DBA_NAME);
    });

 

module.exports = router;