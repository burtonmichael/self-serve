var selfServe = angular.module('selfServe', [
	'ngRoute',
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
			controller: 'startCtrl'
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
		$rootScope.$on("$locationChangeStart", function(event, next, current) {
			if (PropertiesService.getProperty('affiliateCode') == null) {
				if (next.templateUrl != "templates/start.html") {
					$location.path("/start");
				}
			}
		});
	}
])
