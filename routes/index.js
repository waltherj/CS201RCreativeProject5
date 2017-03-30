var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurantsDB'); //Connects to a mongo database called "commentDB"

var FavoriteSchema = mongoose.Schema({ //Defines the Schema for this database
name: String,
rating: Number,
price_level: Number,
vicinity: String
});

var Favorite = mongoose.model('Favorite', FavoriteSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/restaurants', function(req, res, next) {
	request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.2518,-111.6493&radius=1500&type=restaurant&keyword=" + req.query.keyword + "&key=AIzaSyAFImmU7YcMWwyZIWJNG1ABoGfwjvRN4us").pipe(res);
});

router.get('/favorites', function(req, res, next) {
  Favorite.find(function(err, favorites){
    if(err){ return next(err); }
    res.json(favorites);
  });
});

router.param('favorite', function(req, res, next, id) {
  var query = Favorite.findById(id);
  query.exec(function (err, favorite){
    if (err) { return next(err); }
    if (!favorite) { return next(new Error("can't find favorite")); }
    req.favorite = favorite;
    return next();
  });
});

router.get('/favorites/:favorite', function(req, res) {
  res.json(req.favorite);
});

router.post('/favorite', function(req, res, next) {
  var favorite = new Favorite(req.body);
  favorite.save(function(err, favorite){
    if(err){ return next(err); }
    res.json(favorite);
  });
});

router.delete('/favorites/:favorite', function(req, res) {
  console.log("in Delete");
  req.favorite.remove();
  res.json(req.favorite);
});

module.exports = router;

