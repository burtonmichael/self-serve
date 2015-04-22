angular.module('selfServe.controllers', [])

.controller('MainCtrl', ['$scope', 'DataService', '$routeParams', function($scope, DataService, $routeParams){
	$scope.categories = {};
    $scope.active = {};
    $scope.$on('$routeChangeSuccess', function() {
        $scope.active.category = $routeParams.category;
        $scope.active.property = $routeParams.property;
    });
	DataService.get().then(function(data) {
        $scope.categories = data;
    });
}])

.controller('categoryCtrl', ['$scope', 'DataService', 'PropertiesService', '$routeParams', 'preloadData', function($scope, DataService, PropertiesService, $routeParams, preloadData){
    $scope.categories = preloadData;
    $scope.category = preloadData[$routeParams.category];
}])

.controller('propertyCtrl', ['$scope', 'DataService', 'PropertiesService', '$routeParams', 'preloadData', function($scope, DataService, PropertiesService, $routeParams, preloadData){
    $scope.categories = preloadData;
    $scope.category = preloadData[$routeParams.category];
    $scope.property = $scope.category.properties[$routeParams.property];
}])