var selfServe = angular.module('selfServe', [
	'ngRoute',
	'ui.bootstrap',
	'colorpicker.module',
	'LocalStorageModule',
	'selfServe.templates',
	'selfServe.services',
	'selfServe.controllers',
	'selfServe.directives',
	'selfServe.filters'
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/start', {
			templateUrl: 'templates/start.html'
		}).
		when('/customise', {
			templateUrl: 'templates/customise.html'
		}).
		when('/build', {
			templateUrl: 'templates/build.html',
			controller: 'buildCtrl'
		}).
		when('/reset', {
			templateUrl: 'templates/reset.html',
			controller: 'resetCtrl'
		}).
		when('/customise/:category', {
			templateUrl: 'templates/category.html',
			controller: 'preloadCtrl',
			resolve: {
				preloadData: function(DataService) {
					return DataService.get();
				}
			}
		}).
		when('/customise/:category/:property', {
			templateUrl: 'templates/property/property.html',
			controller: 'preloadCtrl',
			resolve: {
				preloadData: function(DataService) {
					return DataService.get();
				}
			}
		}).
		otherwise({
			redirectTo: '/start'
		});
	}
])

.run(['$rootScope', '$location', 'PropertiesService',
	function($rootScope, $location, PropertiesService) {
		$rootScope.$on("$routeChangeStart", function(event, next, current) {
			var affiliateCode = PropertiesService.getProperty("affiliateCode");
			if (!affiliateCode) {
				if (next.$$route.templateUrl != "templates/start.html" && next.$$route.templateUrl != "templates/reset.html") {
					$location.path("/start");
				}
			}
		});
	}
])
