angular.module('newsfeed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/newsfeed', {
		templateUrl: '../public/newsfeed/newsfeed.jsp',
		controller: 'newsfeed_Ctrl'
	});
}])

.controller('newsfeed_Ctrl', ['$scope', function($scope) {
	
	console.log("newsfeed controller...");
	
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

