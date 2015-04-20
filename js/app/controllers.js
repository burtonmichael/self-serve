angular.module('selfServe.controllers', [])

.controller('MainCtrl', ['$scope', 'PropertiesFactory', function($scope, PropertiesFactory){
	$scope.categories = [];
	PropertiesFactory.getData().then(function(data) {
        $scope.categories = data;
    });
}])