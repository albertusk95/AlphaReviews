angular.module('editprofile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/editprofile', {
		templateUrl: '../public/editprofile/editprofile.jsp',
		controller: 'editprofile_Ctrl'
	});
}])

.controller('editprofile_Ctrl', ['$scope', function($scope) {
	
	console.log("editprofile controller");
	
	
	
}]);
