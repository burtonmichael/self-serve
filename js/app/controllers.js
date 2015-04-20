angular.module('selfServe.controllers', [])

.controller('MainCtrl', ['$scope', 'PropertiesFactory', function($scope, PropertiesFactory){
	$scope.properties = [];
	PropertiesFactory.getData().then(function(data) {
        $scope.properties = data;
    });
}])