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

.filter('selectValue', function() {
	return function(items, preset) {
		angular.forEach(items, function(item) {
			if(preset == item.value) {
				return item
			}
	    });
	}
})