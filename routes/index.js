var express = require('express');
var router = express.Router();
var request = require('request');

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/restaurantsDB'); //Connects to a mongo database called "commentDB"

var restaurantSchema = mongoose.Schema({ //Defines the Schema for this database
name: String,
rating: Number,
price_level: Number,
vicinity: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getRestaurants', function(req, res, next) {
	request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.2518,-111.6493&radius=1500&type=restaurant&keyword=" + req.query.keyword + "&key=AIzaSyAFImmU7YcMWwyZIWJNG1ABoGfwjvRN4us").pipe(res);
});

router.get('/getFavorites', function(req, res, next) {
	console.log("GET favorite route");
	Restaurant.find(function(err, favoriteList) {
		if(err) return console.error(err)
		else {
			console.log(favoriteList);
			res.json(favoriteList);
		}
	})
});

router.post('/favorite', function(req, res, next) {
  console.log("POST favorite route"); //[1]
  console.log(req.body); //[2]
  var newfavorite = new Restaurant(req.body); //[3]
  console.log(newfavorite); //[3]
  newfavorite.save(function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});




module.exports = router;
