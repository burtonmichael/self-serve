angular.module('selfServe.directives', [])

.directive('categories', ['DataService', '$routeParams', function(DataService, $routeParams){
	return {
		scope: {},
		controller: function($scope, DataService, $routeParams){
			$scope.categories = {};
			DataService.get().then(function(data) {
			    $scope.categories = data.categories;
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

.directive('images', function(){
	return {
		scope: {
			images: "="
		},
		controller: "imagesCtrl",
		restrict: 'A',
		templateUrl: 'templates/images.html'
	};
})