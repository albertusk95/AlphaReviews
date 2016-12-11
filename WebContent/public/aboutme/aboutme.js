angular.module('aboutme', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/aboutme', {
		templateUrl: '../public/aboutme/aboutme.jsp',
		controller: 'aboutme_Ctrl'
	});
}])

.controller('aboutme_Ctrl', ['$scope', function($scope) {
	
	console.log("aboutme controller...");
	
	// default value of queryPlaceholder
	$scope.queryPlaceholder = "Enter a #hashtag to track";
	
	// default value of chosen query item
	$scope.activeMenu = 0;
	
	$scope.showQueryItems = function(queryID) {
		if (queryID === 0) {
			// #hashtag
			$scope.queryPlaceholder = "Enter a #hashtag to track";
		} else if (queryID === 1) {
			// @account
			$scope.queryPlaceholder = "Enter an @account to analyze its activity";
		} else if (queryID === 2) {
			// keyword
			$scope.queryPlaceholder = "Enter a keyword to track";
		} else if (queryID === 3) {
			// @mention
			$scope.queryPlaceholder = "Enter a username to track its @mention";
		} else {
			// URL
			$scope.queryPlaceholder = "Enter a URL to track";
		}
		
		// the chosen query item (#hashtag, @account, keyword, etc)
		$scope.activeMenu = queryID;
	};
		
}]);

