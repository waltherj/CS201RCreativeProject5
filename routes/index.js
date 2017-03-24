var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getRestaurants', function(req, res, next) {
	request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.2518,-111.6493&radius=1500&type=restaurant&keyword=" + req.query.keyword + "&key=AIzaSyAFImmU7YcMWwyZIWJNG1ABoGfwjvRN4us").pipe(res);
});

module.exports = router;
