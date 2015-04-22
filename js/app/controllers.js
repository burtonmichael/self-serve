angular.module('selfServe.controllers', [])

.controller('MainCtrl', ['$scope', 'DataService', '$routeParams', function($scope, DataService, $routeParams){
	$scope.categories = {};
    $scope.active = {
        category: null,
        property: null
    };
    $scope.$on('$routeChangeSuccess', function() {
        $scope.active.category = $routeParams.category;
        $scope.active.property = $routeParams.property;
    });
	DataService.get().then(function(data) {
        $scope.categories = data;
    });
}])

.controller('categoryCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData;
    $scope.category = preloadData[$routeParams.category];
}])

.controller('propertyCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData;
    $scope.category = preloadData[$routeParams.category];
    $scope.property = $scope.category.properties[$routeParams.property];
}])

.controller('startCtrl', ['$scope', 'PropertiesService', function($scope, PropertiesService){
    $scope.affiliateCode = PropertiesService.getProperty('affiliateCode');

    $scope.setProperty = function(key, value) {
        PropertiesService.setProperty(key, value);
    }

    $scope.resetProperty = function(key) {
        PropertiesService.resetProperty(key);
        $scope.affiliateCode = '';
    }
}])