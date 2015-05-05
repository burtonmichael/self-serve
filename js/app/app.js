var selfServe = angular.module('selfServe', [
	'ngRoute',
	'colorpicker.module',
	'LocalStorageModule',
	'selfServe.services',
	'selfServe.controllers',
	'selfServe.directives',
	'selfServe.filters'
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/start', {
			templateUrl: 'templates/start.html',
			controller: 'startCtrl',
			resolve: {
				preloadData: function(DataService) {
					return DataService.get();
				}
			}
		}).
		when('/reset', {
			templateUrl: 'templates/reset.html',
			controller: 'resetCtrl'
		}).
		when('/:category', {
			templateUrl: 'templates/category.html',
			controller: 'categoryCtrl',
			resolve: {
				preloadData: function(DataService) {
					return DataService.get();
				}
			}
		}).
		when('/:category/:property', {
			templateUrl: 'templates/property.html',
			controller: 'propertyCtrl',
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
		$rootScope.affiliateCode = PropertiesService.getProperty("affiliateCode");
		$rootScope.$on("$routeChangeStart", function(event, next, current) {
			if (!$rootScope.affiliateCode) {
				if (next.$$route.templateUrl != "templates/start.html" && next.$$route.templateUrl != "templates/reset.html") {
					$location.path("/start");
				}
			}
		});
	}
])
