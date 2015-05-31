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
		controller: "imagesCtrl",
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