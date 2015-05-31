angular.module('selfServe.filters', [])

.filter('title', function() {
	return function(input, scope) {
		if (input != null) {
			input = input.split('-').join(' ');
			input = input.toLowerCase();
		}
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	}
})

.filter('array', function() {
	return function(items) {
		var filtered = [];
		angular.forEach(items, function(item) {
			filtered.push(item);
		});
		return filtered;
	};
})

.filter('properties', function() {
	return function(categories) {
		var filtered = [];
		angular.forEach(categories, function(category) {
			angular.forEach(category.properties, function(item) {
				filtered.push(item);
			});
		});
		return filtered;
	};
})

.filter('preview', function() {
	return function(value) {
		var value = value;
		if (value instanceof Array) {
			value = value.join(", ")
		}
		return value;
	};
})

.filter('unsafe', function($sce) {
	return $sce.trustAsHtml;
});