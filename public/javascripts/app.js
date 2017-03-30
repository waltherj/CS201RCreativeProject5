var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchedWord = "";
	$scope.results = [];
	$scope.favorites = [];

	$scope.toggle = function(restaurant){
		restaurant.toggle=!restaurant.toggle;
		console.log(restaurant);
		if (restaurant.toggle) {
		var fav = {name: restaurant.name, rating: restaurant.rating, price_level: restaurant.price_level, vicinity: restaurant.vicinity};
		$http.post('/favorite', fav).success(function(data) {
			$scope.favorites.push(fav);
		});
		} else {
		//$scope.removeFavoriteClicked(restaurant);
		}
	}

	$scope.toggled = function(item) {
		return item.toggle;
	}


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
	$scope.removeFavoriteClicked = function(favorite) {
      $http.delete('/favorites/' + favorite._id )
        .success(function(data){
          console.log("delete worked");
	  $scope.showFavorites();
	  favorite.toggle = false;
        });
    };
}]);

