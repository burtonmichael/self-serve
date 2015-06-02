angular.module('selfServe.controllers', ['ngAnimate'])

.controller('mainCtrl', ['$scope', '$rootScope', '$routeParams', 'DataService', function($scope, $rootScope, $routeParams, DataService){
    DataService.get().then(function(data){
    	$scope.base = data.base;
    	$scope.categories = data.categories;
    });

	$scope.$on('property:updated', function(event, data) {
		$scope.hasAffiliateCode = data.affiliateCode
	});
}])

.controller('preloadCtrl', ['$scope', '$routeParams', 'preloadData', function($scope, $routeParams, preloadData){
    $scope.categories = preloadData.categories;
    $scope.category = $scope.categories[$routeParams.category];
    if ($routeParams.property) {
    	$scope.property = $scope.category.properties[$routeParams.property];
    }
}])

.controller('buildCtrl', ['$scope', '$modal', 'PropertiesService', '$sce', function($scope, $modal, PropertiesService, $sce){
	$scope.properties = PropertiesService.getProperties();

	$scope.generate = function() {
		var modalInstance = $modal.open({
			size: 'lg',
			animation: true,
			templateUrl: 'templates/modals/modal-build.html',
			controller: function($scope, $modalInstance, url) {
				$scope.url = url;

				$scope.height = null;

				$scope.close = function () {
					$modalInstance.dismiss('close');
				};
			},
			resolve: {
				url: function () {
					var url = 'http://www.rentalcars.com/affxml/Home.do?';
					var parameters = '';
					angular.forEach($scope.properties, function(property) {
						parameters += "&" + property.key + "=";

						var value = property.value;

						if (value instanceof Array) {
							value = value.join("+")
						}

						if (value.indexOf('#') === 0) {
							value = value.substr(1);
						}

						parameters += value;
					})
					return $sce.trustAsResourceUrl(url + parameters.substr(1));
				}
			}
		});
	};

	$scope.resetProperty = function(key) {
		PropertiesService.resetProperty(key);
		$scope.properties = PropertiesService.getProperties();
		$scope.url = null;
	};
}])

.controller('resetCtrl', ['$scope', '$modal', function($scope, $modal){
	$scope.resetProperties = function() {
		var modalInstance = $modal.open({
			animation: true,
			size: 'sm',
			templateUrl: 'templates/modals/modal-reset.html',
			controller: function($scope, $modalInstance, PropertiesService) {
				$scope.confirm = function () {
					PropertiesService.resetProperties();
					$modalInstance.dismiss();
				};
				$scope.close = function () {
					$modalInstance.dismiss();
				};
			}
		});
	};
}])

.controller('navCtrl', ['$scope', '$rootScope', '$location', 'DataService', 'PropertiesService', function($scope, $rootScope, $location, DataService, PropertiesService){
	$scope.hasAffiliateCode = PropertiesService.getProperty('affiliateCode');

	DataService.get().then(function(data){
    	$scope.base = data.base
    	$scope.categories = data.categories
    });

	$scope.active = {};

	$scope.$on('$routeChangeSuccess', function() {
		$scope.active.page = $location.$$path.split("/")[1]
		$scope.active.category = $location.$$path.split("/")[2]
		$scope.active.property = $location.$$path.split("/")[3]
	});

	$scope.$on('property:updated', function(event, data) {
		$scope.hasAffiliateCode = data.affiliateCode
	});
}])

.controller('inputCtrl', ['$scope', '$filter', '$rootScope', 'PropertiesService', '$modal', function($scope, $filter, $rootScope, PropertiesService, $modal){
	$scope.property.value = PropertiesService.getProperty($scope.property.parameter) || '';

	$scope.attempted = false;
	$scope.success;

	if ($scope.property.input.restrict === "color") {
		$scope.$watch('property.value', function(newValue, oldValue) {
			if(newValue && newValue.indexOf('#') !== 0)
				$scope.property.value = '#' + $scope.property.value
		});
	}

	$scope.setCheckboxes = function() {
		angular.forEach($scope.property.input.options, function(option){
			if ($scope.property.value) {
				if ($scope.property.value.indexOf(option.value) >= 0) {
					option.selected = true;
				} else {
					option.selected = false;
				}
			} else {
				if ($scope.property.input.default === option.value) {
					$scope.property.value = option.value;
				}
			}
		})
	}

	switch ($scope.property.input.type) {
		case "select":
			if ($scope.property.value) $scope.preset = $filter('filter')($scope.property.input.options, {value: $scope.property.value});
			break;
		case "radio":
		case "checkbox":
			$scope.setCheckboxes();
			$scope.$on('property:updated', function(event, data) {
				$scope.setCheckboxes();
			});
			break;
	}

	$scope.getSelected = function() {
		$scope.property.value = [];
		angular.forEach($filter('filter')($scope.property.input.options, {selected: true}), function(item) {
			$scope.property.value.push(item.value);
		});
	}

	$scope.closeAlert = function(index) {
		$scope.error = null;
	}
}])

.controller('buttonCtrl', ['$scope', 'PropertiesService', function($scope, PropertiesService){
	$scope.setProperty = function(key, value, restrict) {
		var valid;

		if (!value) {
        	message = "Enter a value."
        } else {
			switch(restrict) {
	            case 'color':
	                if ((value.length === 4 || value.length === 7) && /#([0-9A-F]{6}$)|([0-9A-F]{3}$)/i.test(value)) {
	                    valid = true;
	                } else {
	                	message = "This value needs to be a hexidecimal color."
	                }
	                break;
	            case 'number':
	            	testValue = parseInt(value);
	                if (/([0-9])/i.test(testValue)) {
	                    valid = true;
	                } else {
	                	message = "This value needs to be a number."
	                }
	                break;
				default:
					if (value == "") {
	                	message = "Enter a value."
					} else {
						valid = true;
					}
					break;
			}
        }

		if (valid) {
			PropertiesService.setProperty(key, value);
			$scope.error = null;
			$scope.success = true;
		} else {
			$scope.error = {
				message: message || 'Please check and try again.'
			}
		}
	}

	$scope.resetProperty = function(key) {
		$scope.property.value = '';
		$scope.attempted = false;
        $scope.success = false;
        $scope.preset = null;
		PropertiesService.resetProperty(key);
	}
}])