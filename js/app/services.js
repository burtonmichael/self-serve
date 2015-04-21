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