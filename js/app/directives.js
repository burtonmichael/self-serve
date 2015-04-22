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
		templateUrl: 'templates/property-text.html',
		link: function($scope, iElm, iAttrs, controller) {

		}
	};
}])

.directive('categoryTitle', function(){
	return {
		scope: {
			category: '=category',
			active: '=active'
		},
		restrict: 'A',
		templateUrl: 'templates/category-title.html',
		replace: true,
		link: function($scope, $element, $attrs, $transclude) {
			var $prop = $($element.next());

			if( $scope.category == $scope.active ) {
				$prop.slideDown(400);
			}
			
			$scope.$watch('active', function(newValue) {
				if( $scope.category == newValue ) {
					$prop.slideDown(400);
				} else {
					$prop.slideUp(400);
				}
			});
		}
	};
});