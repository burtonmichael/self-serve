angular.module('selfServe.filters', [])

.filter('title', function() {
	return function(input, scope) {
		if (input != null) {
			input = input.split('-').join(' ');
			input = input.toLowerCase();
		}
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	}
});
