var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchedWord = "";
	$scope.results = [];
	$scope.favorites = [];
	$scope.addFavText = "Add to Favorites";

	$scope.searchButtonClicked = function(word) {
		$scope.searchedWord = word;
		console.log($scope.searchedWord);
		$http.get("/getRestaurants?keyword=" + word).then(function(response){

			$scope.results = response.data.results;

		});
	};
	

	$scope.addFavoriteClicked = function(restaurant) {
		$scope.addFavText = "Favorite";
		$http.post('/favorite', restaurant).success(function(data) {
			$scope.favorites.push(restuarant);
		});
	};
	
	$scope.showFavorites = function() {
		$http.get("/getFavorites").then(function(response){
			$scope.results = response.data.results;
		});
	};
}]);

