var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchedWord = "";
	$scope.results = [];
	$scope.favorites = [];

	$scope.toggle = function(restaurant){
		restaurant.toggle=!restaurant.toggle;
		console.log(restaurant);
		var fav = {name: restaurant.name, rating: restaurant.rating, price_level: restaurant.price_level, vicinity: restaurant.vicinity};
		$http.post('/favorite', fav).success(function(data) {
			$scope.favorites.push(fav);
		});
	}

	$scope.toggled = function(item) {
		return item.toggle;
	}


	$scope.searchButtonClicked = function(word) {
		$scope.searchedWord = word;
		console.log($scope.searchedWord);
		$http.get("/getRestaurants?keyword=" + word).then(function(response){
			$scope.results = response.data.results;

		});
	};
	

	
	$scope.showFavorites = function() {
		
		$http.get("/getFavorites").then(function(response){
			$scope.favorites = response.data;
		});
	};
	
	$scope.showSearch = function() {
		
	}
	$scope.removeFavoriteClicked = function(restaurant) {
		$http.delete('/deleteFavorite', restaurant).success(function(data) {
			var index = $scope.restaurants.indexOf(restuarant);
			$scope.restaurants.splice(index, 1);
		});
	};
}]);

