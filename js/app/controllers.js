angular.module('selfServe.controllers', [])

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