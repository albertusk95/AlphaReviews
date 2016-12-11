// pre home
var app = angular.module('alphareviews', [
    'ngRoute',
    'newsfeed',
    'aboutme',
    'writeareview'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/newsfeed'
    });
}]);

