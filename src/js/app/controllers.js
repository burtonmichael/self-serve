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

.controller('customiseCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData.categories;
}])

.controller('buildCtrl', ['$scope', '$modal', 'PropertiesService', function($scope, $modal, PropertiesService){
	$scope.properties = PropertiesService.getProperties();

	$scope.generate = function() {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'templates/modals/modalBuild.html',
			controller: function($scope, $modalInstance, url) {
				$scope.url = url;

				$scope.preview = function () {
					window.open(url);
				};

				$scope.close = function () {
					$modalInstance.dismiss('close');
				};
			},
			resolve: {
				url: function () {
					var url = 'http://www.rentalcars.com/affxml/Home.do?'
					var parameters = '';
					angular.forEach($scope.properties, function(property) {
						parameters += "&" + property.key + "=" + property.value;
					})
					return url + parameters.substr(1);
				}
			}
		});
	};

	$scope.resetProperty = function(key) {
		PropertiesService.resetProperty(key);
		$scope.properties = PropertiesService.getProperties();
		$scope.url = null;
	};
}])

.controller('resetCtrl', ['$scope', '$modal', function($scope, $modal){
	$scope.resetProperties = function() {
		var modalInstance = $modal.open({
			animation: true,
			size: 'sm',
			templateUrl: 'templates/modals/modalReset.html',
			controller: function($scope, $modalInstance, $rootScope, PropertiesService) {
				$scope.confirm = function () {
					PropertiesService.resetProperties();
					$rootScope.affiliateCode = undefined;
					$modalInstance.dismiss();
				};
				$scope.close = function () {
					$modalInstance.dismiss();
				};
			}
		});
	};
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
	$scope.success;

	if ($scope.property.input.restrict === "color") {
		$scope.$watch('property.value', function(newValue, oldValue) {
			if(newValue && newValue.indexOf('#') !== 0)
				$scope.property.value = '#' + $scope.property.value
		});
	}

	if ($scope.property.input.type === "select" && $scope.property.value)
		$scope.preset = $filter('filter')($scope.property.input.options, {value: $scope.property.value});

	$scope.closeAlert = function(index) {
		$scope.error = null;
	}

	$scope.setProperty = function(key, value, restrict) {
		var value = value ? value.split(" ").join("") : "";
		var valid = false;
		var errorMsg = 'Please check and try again.';

		if (value == "") {
        	errorMsg = "Enter a value."
        } else {
			switch(restrict) {
	            case 'color':
	                if ((value.length === 4 || value.length === 7) && /#([0-9A-F]{6}$)|([0-9A-F]{3}$)/i.test(value)) {
	                    valid = true;
	                } else {
	                	errorMsg = "This value needs to be a hexidecimal color."
	                }
	                break;
	            case 'number':
	            	value = parseInt(value);
	                if (/([0-9])/i.test(value)) {
	                    valid = true;
	                } else {
	                	errorMsg = "This value needs to be a number."
	                }
	                break;
				default:
					if (value == "") {
	                	errorMsg = "Enter a value."
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
			$scope.error = {
				type: 'danger',
				msg: errorMsg
			};
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