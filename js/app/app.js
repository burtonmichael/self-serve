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
			redirectTo: '/'
		});
	}
])

// .run(['$rootScope', '$location', 'DataService'
// 	function($rootScope, $location, DataService) {
// 		$rootScope.$on("$locationChangeStart", function(event, next, current) {
// 			if (DataService. == null) {
// 				// no logged user, we should be going to #login
// 				if (next.$route.templateUrl == "partials/login.html") {
// 					// already going to #login, no redirect needed
// 				} else {
// 					// not going to #login, we should redirect now
// 					$location.path("/login");
// 				}
// 			}
// 		});
// 	}
// ])
