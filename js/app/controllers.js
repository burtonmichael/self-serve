angular.module('selfServe.controllers', ['ngAnimate'])

.controller('categoryCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData.categories;
    $scope.category = $scope.categories[$routeParams.category];
}])

.controller('propertyCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData.categories;
    $scope.category = $scope.categories[$routeParams.category];
    $scope.property = $scope.category.properties[$routeParams.property];
}])

.controller('startCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.base = preloadData.base;
}])

.controller('buildCtrl', ['$scope', 'PropertiesService', function($scope, PropertiesService){

}])

.controller('resetCtrl', ['$scope', '$rootScope', 'PropertiesService', function($scope, $rootScope, PropertiesService){
	$scope.confirm = false;

	$scope.reset = function(key) {
		PropertiesService.resetProperties();
		$rootScope.affiliateCode = undefined;
	}
}])

.controller('navigationCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.started = $rootScope.affiliateCode;

	$scope.$watch(function() {
		return $rootScope.affiliateCode;
	}, function() {
		$scope.started = $rootScope.affiliateCode;
	}, true);
}])

.controller('inputCtrl', ['$scope', '$rootScope', '$filter', 'PropertiesService', function($scope, $rootScope, $filter, PropertiesService){
	$scope.property.value = PropertiesService.getProperty($scope.property.parameter) || '';

	$scope.attempted = false;
	$scope.success = false;
	$scope.error = "";

	if ($scope.property.input.type === "select" && $scope.property.value)
		$scope.preset = $filter('filter')($scope.property.input.options, {value: $scope.property.value});

	$scope.setProperty = function(key, value, restrict) {
		var value = value ? value.split(" ").join("") : "";
		var valid = false;
		var error;

		if (value == "") {
        	error = "Enter a value."
        } else {
			switch(restrict) {
	            case 'color':
	                if (value.length > 7 || /([0-9A-F]{6})|([0-9A-F]{3})/i.test(value)) {
	                    valid = true;
	                } else {
	                	error = "This value needs to be a hexidecimal color."
	                }
	                break;
	            case 'number':
	                if (/([0-9])/i.test(value)) {
	                    valid = true;
	                } else {
	                	error = "This value needs to be a number."
	                }
	                break;
				default:
					if (value == "") {
	                	error = "Enter a value."
					} else {
						valid = true;
					}
					break;
			}
        }

		if (valid) {
			PropertiesService.setProperty(key, value);
			$scope.property.value = value;
			$scope.success = true;
			if (key == "affiliateCode") 
				$rootScope.affiliateCode = value;
		} else {
			$scope.error = error;
			$scope.success = false;
		}
		$scope.attempted = true;
	}

	$scope.resetProperty = function(key) {
		PropertiesService.resetProperty(key);
		$scope.property.value = '';
		$scope.attempted = false;
        $scope.success = false;
        $scope.preset = null;
		if (key == "affiliateCode") 
			$rootScope.affiliateCode = undefined;
	}
}])