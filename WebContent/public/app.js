// pre home
var app = angular.module('alphareviews', [
    'ngRoute',
    'newsfeed',
    'aboutme',
    'writeareview',
    'editprofile'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/newsfeed'
    });
}]);

