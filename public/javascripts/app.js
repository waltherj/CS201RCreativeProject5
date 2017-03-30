var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchedWord = "";
	$scope.results = [];
	$scope.favorites = [];
	$scope.fff = [];

	$scope.toggle = function(restaurant){
		restaurant.toggle=!restaurant.toggle;
		console.log(restaurant);
		if (restaurant.toggle) {
		console.log(restaurant.id);	
		var fav = {name: restaurant.name, rating: restaurant.rating, price_level: restaurant.price_level, vicinity: restaurant.vicinity, id: restaurant.id};
		$http.post('/favorite', fav).success(function(data) {
			$scope.favorites.push(fav);
		});
		} else {
			$scope.removeByID(restaurant.id);
		}
	}


	$scope.toggled = function(item) {
		return item.toggle;
	};


	$scope.searchButtonClicked = function(word) {
		$scope.searchedWord = word;
		console.log($scope.searchedWord);
		$http.get("/restaurants?keyword=" + word).then(function(response){
			$scope.results = response.data.results;

		});
	};
	

	
	$scope.showFavorites = function() {
		
		$http.get("/favorites").then(function(response){
			$scope.favorites = response.data;
		});
	};
	
	$scope.showSearch = function() {
		
	}

	$scope.removeByID = function(id) {

		$http.get("/favorites").then(function(response){
			$scope.favorites = response.data;
	var count;
	console.log("Length " + $scope.favorites.length);
	for(count = 0; count < $scope.favorites.length; count++){
		if ($scope.favorites[count].id == id) {        
			$scope.removeFavoriteClicked($scope.favorites[count]);
		}
	}

		});
	};

	$scope.removeFavoriteClicked = function(favorite) {
	var x = favorite.id;
      $http.delete('/favorites/' + favorite._id )
        .success(function(data){
          console.log("delete worked");
	  $scope.showFavorites();
	var count;
	for(count = 0; count < $scope.results.length; count++){
		if ($scope.results[count].id == x) {
			console.log("Success!");
			$scope.results[count].toggle = false;
		}
	}
	});
    };
}]);

