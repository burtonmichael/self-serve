var selfServe = angular.module('selfServe', [
    'ngRoute',
    'LocalStorageModule',
    'selfServe.services',
    'selfServe.controllers',
    'selfServe.directives'
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/:category', {
            templateUrl: 'templates/category.html',
            controller: 'categoryCtrl'
        }).
        when('/:category/:property', {
            templateUrl: 'templates/property.html',
            controller: 'propertyCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
