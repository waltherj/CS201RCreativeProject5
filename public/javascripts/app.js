var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchedWord = "";
	$scope.results = [];
	$scope.favorites = [];

	$scope.searchButtonClicked = function(word) {
		$scope.searchedWord = word;
		console.log($scope.searchedWord);
		$http.get("/getRestaurants?keyword=" + word).then(function(response){

			$scope.results = response.data.results;

		});
	};

}]);

