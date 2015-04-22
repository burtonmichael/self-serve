angular.module('selfServe.directives', [])

.directive('propertyText', ['PropertiesService', function(PropertiesService){
	return {
		scope: {
			property: "=property"
		},
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.property.value = PropertiesService.getProperty($scope.property.parameter) || '';

			$scope.setProperty = function(key, value) {
				PropertiesService.setProperty(key, value);
			}

			$scope.resetProperty = function(key) {
				PropertiesService.resetProperty(key);
				$scope.property.value = '';
			}
		},
		restrict: 'A',
		templateUrl: 'templates/property-text.html',
		link: function($scope, iElm, iAttrs, controller) {

		}
	};
}])

.directive('categoryTitle', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			category: '=category',
			active: '=active'
		},
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A',
		// template: '',
		templateUrl: 'templates/category-title.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			var $iElm = $(iElm);
			var $properties = $iElm.next('ul');

			if( $scope.category == $scope.active.category ) {
				$properties.slideDown(400);
			}
			
			$scope.$watch('active', function(newValue) {
				if( $scope.category == newValue.category ) {
					$properties.slideDown(400);
				}
			}, true);

			$iElm.on('click', function(event) {
				if( $iElm.parent().hasClass('active') ) {
					$properties.slideDown(400);
				}
			});
		}
	};
});