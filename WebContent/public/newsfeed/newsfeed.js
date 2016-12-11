angular.module('newsfeed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/newsfeed', {
		templateUrl: '../public/newsfeed/newsfeed.jsp',
		controller: 'newsfeed_Ctrl'
	});
}])

.controller('newsfeed_Ctrl', ['$scope', function($scope) {
	
	// Controller's notification
	console.log("newsfeed controller...");
	
	// Controller's variables
	var username;
	var reviewed_product;
	var review;
	var totalActivities = 0;
	
	var query = firebase.database().ref("activities").orderByKey();
	query.once("value")
		.then(function(snapshot) {
			
			console.log("List of recent activities");
			
			// initialize the arrays
			username = [];
			reviewed_product = [];
			review = [];
			
			snapshot.forEach(function(childSnapshot) {
				// key will be the user ID
				var key = childSnapshot.key;
				
				// childData will be the actual contents of the child
				var childData = childSnapshot.val();
				console.log(childData);
				
				// set the arrays
				username.push(childSnapshot.child("username").val());
				reviewed_product.push(childSnapshot.child("reviewed_product").val());
				review.push(childSnapshot.child("review").val());
			});
			
			// assign the length of array to the number of activities
			totalActivities = username.length;
			
			if (totalActivities > 0) {
				// clear the news feed
				$scope.clearCatalogTable();
			
				// generate the HTML
				$scope.generateRecentActivities();
			}
			
		});
	
	$scope.clearCatalogTable = function() {
		
		var tables = document.getElementsByTagName("TABLE");
		
		for (var i = tables.length - 1; i >= 0; i -= 1) {
			if (tables[i].className.indexOf("alphareviews_navigation") < 0) { 
				tables[i].parentNode.removeChild(tables[i]);
			}
		}
	}
	
	$scope.generateRecentActivities = function() {
		
		var myTableDiv, table, tableBody, tr, td;
		var row;
		
		console.log("Generating HTML for " + totalActivities + " activities");
		
		myTableDiv = document.getElementById("recent_activities");
		
		for (var idx = 0; idx < totalActivities; idx++) {
			table = document.createElement("TABLE");
			table.border = 0;
			table.width = 835;
			table.id = "recentActivities" + idx;
			table.style = "margin-bottom: 30px";
			//table.style = "table-layout: fixed; word-wrap: break-word; margin-bottom: 50px";
			
			myTableDiv.appendChild(table);
		
			// username
			row = document.getElementById("recentActivities" + idx).insertRow(0);
			row.insertCell(0);
			
			document.getElementById("recentActivities" + idx).rows[0].cells[0].innerHTML = username[idx];
			
			// rating star
			row = document.getElementById("recentActivities" + idx).insertRow(1);
			row.insertCell(0);
			
			document.getElementById("recentActivities" + idx).rows[1].cells[0].innerHTML = '<ul class="c-rating"></ul>';
			
		}
		
		// add rating widget for every activity
		for (var idx = 0; idx < totalActivities; idx++) {
			$scope.addRatingWidget(table, idx);
		}
		
	}
	
    // ADD RATING WIDGET
    $scope.addRatingWidget = function(shopItem, data) {
    	var ratingElement = shopItem.querySelector('.c-rating');
    	var currentRating = 3;
    	var maxRating = 5;
    	var callback = function(rating) { alert(rating); };
    	var r = rating(ratingElement, currentRating, maxRating, callback);
    }

}]);

