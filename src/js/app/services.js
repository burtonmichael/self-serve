angular.module('selfServe.services', [])

.factory('DataService', ['$http', '$q', function($http, $q){
	return {
		get: function() {
			var promise = null;
			if (promise) {
				return promise;
			} else {
				var defer = $q.defer();
				var promise = $http.get('js/data/properties.json', { cache: 'true'})
					.success(function(data) {
						defer.resolve(data);
					});

				return defer.promise;
			}
		}
	}
}])

.factory('PropertiesService', ['$rootScope', 'localStorageService', function($rootScope, localStorageService){

	var factory = {};

	var ls = localStorageService.get("serve") || {};

	localStorageService.set("serve", ls);

	factory.getProperty = function(key) {
		return ls[key];
	}

	factory.getProperties = function() {
		var properties = [];
		for (var key in ls) {
			properties.push({
				"key": key,
				"value": ls[key]
			});
		}
		return properties;
	}

	factory.setProperty = function(key, value) {
		ls[key] = value;
		localStorageService.set("serve", ls);
		$rootScope.$broadcast('property:updated', ls);
	}

	factory.resetProperties = function() {
		ls = {};
		localStorageService.set("serve", ls);
		$rootScope.$broadcast('property:updated', ls);
	}

	factory.resetProperty = function(key) {
		delete ls[key];
		localStorageService.set("serve", ls);
		$rootScope.$broadcast('property:updated', ls);
	}

	return factory;
}])