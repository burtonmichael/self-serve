angular.module('selfServe.directives', [])

.directive('alert', function(){
	return {
		restrict: 'A',
		templateUrl: 'templates/property/alert.html'
	};
})

.directive('images', function(){
	return {
		scope: {
			images: "="
		},
		restrict: 'A',
		templateUrl: 'templates/property/images.html'
	};
})

.directive('snippet', function(){
	return {
		scope: {
			key: "=",
			value: "="
		},
		restrict: 'A',
		template: '<pre><code>&<span class="snippet-key">{{key}}</span>=<span class="snippet-value">{{value}}</span></code></pre>',
		replace: true
	};
})

.directive('buttons', function(){
	return {
		controller: "buttonCtrl",
		templateUrl: 'templates/property/buttons.html'
	}
})

.directive('postHeight', function(){
	return {
		link: function(scope, element, attributes, controller) {
			window.addEventListener("message", receiveMessage, false);

			function receiveMessage(event) {
				if (event.origin !== "http://www.rentalcars.com")
					return;

				element[0].height = event.data
			}
		}
	}
})

.directive('lightbox', ['$modal', function($modal){
	return {
		scope: {
			src: "=",
			caption: "="
		},
		link: function(scope, element, attributes, controller) {
			element.bind('click', function(event) {
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'templates/modals/modal-lightbox.html',
					controller: function($scope, $modalInstance) {
						$scope.src = scope.src;
						$scope.caption = scope.caption;
						$scope.close = function () {
							$modalInstance.dismiss();
						};
					}
				});
			});
		}
	};
}]);