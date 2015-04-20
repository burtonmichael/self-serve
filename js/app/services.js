angular.module('selfServe.services', [])

.factory('PropertiesFactory', ['$http', '$q', function($http, $q){
	return {
		getData: function() {
			console.log('factory');
			var defer = $q.defer();
			$http.get('js/data/properties.json', { cache: 'true'})
				.success(function(data) {
					defer.resolve(data);
				});

			return defer.promise;
		}
	}
}])