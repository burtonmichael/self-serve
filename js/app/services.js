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

.factory('PropertiesService', ['localStorageService', function(localStorageService){

	var factory = {};

	var localStorageObject = localStorageService.get("serve") || {};

	factory.getProperty = function(key) {
		return localStorageObject[key];
	}

	factory.setProperty = function(key, value) {
		localStorageObject[key] = value;
		localStorageService.set("serve", JSON.stringify(localStorageObject));
	}

	factory.resetProperties = function() {
		localStorageObject = {};
		localStorageService.set("serve", "");
	}

	return factory;
}])