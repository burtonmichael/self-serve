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
            controller: 'categoryCtrl',
            resolve: {
                preloadData: function(DataService){
                    return DataService.get();
                }
            }
        }).
        when('/:category/:property', {
            templateUrl: 'templates/property.html',
            controller: 'propertyCtrl',
            resolve: {
                preloadData: function(DataService){
                    return DataService.get();
                }
            }
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
