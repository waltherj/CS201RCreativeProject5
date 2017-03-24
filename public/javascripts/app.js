var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchedWord = "";
	$scope.results = [];

	$scope.searchButtonClicked = function(word) {
		$scope.searchedWord = word;
console.log($scope.searchedWord);
		$http.get("http://35.166.20.120:3005/getRestaurants?keyword=" + word).then(function(response){

			$scope.results = response.data.results;

		});
	};

}]);

