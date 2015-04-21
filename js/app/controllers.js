angular.module('selfServe.controllers', [])

.controller('MainCtrl', ['$scope', 'DataService', 'localStorageService', function($scope, DataService, localStorageService){
	$scope.categories = [];
	DataService.get().then(function(data) {
        $scope.categories = data;
    });

    $scope.addItem = function(item) {
    	localStorageService.set(item, 'Add this!');
    	alert(localStorageService.get(item))
    }
}])

.controller('categoryCtrl', ['$scope', 'DataService', 'localStorageService', function($scope, DataService, localStorageService, $routeParams){
	console.log($routeParams);
	$scope.category = $routeParams.category
}])

.controller('propertyCtrl', ['$scope', 'DataService', 'localStorageService', function($scope, DataService, localStorageService, $routeParams){
	$scope.property = $routeParams.property
}])