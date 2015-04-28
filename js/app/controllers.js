angular.module('selfServe.controllers', ['ngAnimate'])

.controller('categoryCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData;
    $scope.category = preloadData[$routeParams.category];
}])

.controller('propertyCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData;
    $scope.category = preloadData[$routeParams.category];
    $scope.property = $scope.category.properties[$routeParams.property];
}])

.controller('startCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
}])

.controller('inputCtrl', ['$scope', 'PropertiesService', function($scope, PropertiesService){
	$scope.property.value = PropertiesService.getProperty($scope.property.parameter) || '';

	$scope.attempted = false;
	$scope.success = false;

	$scope.setProperty = function(key, value, restrict) {
		var valid = false;
		switch(restrict) {
			case 'color':
				if (/([0-9A-F]{6})|([0-9A-F]{3})/i.test(value))
					valid = true;
				break;
			default:
				if (value)
					valid = true;
				break;
		}
		if (valid) {
			PropertiesService.setProperty(key, value);
			$scope.success = true;
		} else {
			$scope.success = false;
		}
		$scope.attempted = true;
	}

	$scope.resetProperty = function(key) {
		PropertiesService.resetProperty(key);
		$scope.property.value = '';
		$scope.attempted = false;
	}
}])