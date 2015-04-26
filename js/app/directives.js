angular.module('selfServe.directives', [])

.directive('propertyInput', ['PropertiesService', function(PropertiesService){
	return {
		scope: {
			property: "=property"
		},
		controller: function($scope, $element, $attrs, $transclude) {
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
		},
		restrict: 'A',
		templateUrl: 'templates/property-text.html'
	};
}])

.directive('categories', ['DataService', '$routeParams', function(DataService, $routeParams){
	return {
		scope: {},
		controller: function($scope, DataService, $routeParams){
			$scope.categories = {};
			DataService.get().then(function(data) {
			    $scope.categories = data;
			});
			$scope.count = function(category) {
				var len = 0;
				for (var o in category.properties) {
				    len++;
				}
				return "properties-length-" + len;
			}
			$scope.active = {
			    category: null,
			    property: null
			};
			$scope.$on('$routeChangeSuccess', function() {
			    $scope.active.category = $routeParams.category;
			    $scope.active.property = $routeParams.property;
			});
		},
		restrict: 'A',
		templateUrl: 'templates/categories.html',
		replace: false
	};
}])