angular.module('newsfeed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/newsfeed', {
		templateUrl: '../public/newsfeed/newsfeed.jsp',
		controller: 'newsfeed_Ctrl'
	});
}])

.controller('newsfeed_Ctrl', ['$scope', function($scope) {
	
	console.log("user active: " + localStorage.getItem("uid_active"));
	
	// Controller's notification
	console.log("newsfeed controller...");
	
	// Controller's variables
	var user_key = [];
	var fullName = [];
	var reviewedProduct = [];
	var review = [];
	var ratingStar = [];
	var date = [];
	var time = [];
	var profPic = [];
	var following = [];
	var totalActivities = 0;
	
	// User variables
	var uid_user = [];
	var firstName_user = [];
	var lastName_user = [];
	var profPic_user = [];
	
	
	// retrieve all user information for further usage
	var query = firebase.database().ref("users").orderByKey();
	query.once("value")
		.then(function(snapshot) {
		
			console.log("List of users");
			
			snapshot.forEach(function(childSnapshot) {
				// key will be the user ID
				var key = childSnapshot.key;
				
				uid_user.push(key);
				firstName_user.push(childSnapshot.child("firstName").val());
				lastName_user.push(childSnapshot.child("lastName").val());
				profPic_user.push(childSnapshot.child("profPic").val());
			});
			
			$scope.retrieveFollowing();
			
		});
	
	
	// get the users who are followed by this user
	$scope.retrieveFollowing = function() {
		var query = firebase.database().ref("following").orderByKey();
		query.once("value")
			.then(function(snapshot) {
				
				console.log("retrieving the following");
				console.log(snapshot);
				
				var idx = 1;
				
				snapshot.forEach(function(childSnapshot) {
					
					// key will be the user ID
					var key = childSnapshot.key;
					
					if (key == localStorage.getItem("uid_active")) {
						
						while(childSnapshot.child("user" + idx).exists()) {
							console.log("following: " + childSnapshot.child("user" + idx).val());
							following.push(childSnapshot.child("user" + idx).val());
							idx++;
						}
						
					}
					
				});
				
				$scope.retrieveActivities();
				
			});
	}
	
	$scope.retrieveActivities = function() {
		var query = firebase.database().ref("activities").orderByKey();
		query.once("value")
			.then(function(snapshot) {
			
				console.log("List of recent activities");
				
				snapshot.forEach(function(childSnapshot) {
					// key will be the user ID
					var key = childSnapshot.key;
					
					for (var idx = 0; idx < following.length; idx++) {
						if (key == following[idx]) {
							
							for (var idy = 0; idy < uid_user.length; idy++) {
								if (uid_user[idy] == key) {
									fullName.push(firstName_user[idy] + " " + lastName_user[idy]);
									profPic.push(profPic_user[idy]);
									break;
								}
							}
							
							// childData will be the actual contents of the child
							var childData = childSnapshot.val();
							console.log(childData);
							
							// set the arrays
							reviewedProduct.push(childSnapshot.child("reviewedProduct").val());
							review.push(childSnapshot.child("review").val());
							ratingStar.push(childSnapshot.child("rating").val());
							date.push(childSnapshot.child("date").val());
							time.push(childSnapshot.child("time").val());
						
							break;
						}
					}
				});
				
				// assign the length of array to the number of activities
				totalActivities = review.length;
				
				if (totalActivities > 0) {
					// clear the news feed
					$scope.clearCatalogTable();
				
					// generate the HTML
					$scope.generateRecentActivities();
				}
				
			});
	}
		
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
		
			
			// horizontal line 1
			row = document.getElementById("recentActivities" + idx).insertRow(0);
			row.insertCell(0);
			
			document.getElementById("recentActivities" + idx).rows[0].cells[0].innerHTML = "<hr align='left'; width='89%'>";
			document.getElementById("recentActivities" + idx).rows[0].cells[0].colSpan = 4;
			
			// image
			row = document.getElementById("recentActivities" + idx).insertRow(1);
			row.insertCell(0);
			
			document.getElementById("recentActivities" + idx).rows[1].cells[0].innerHTML = "<img src='"+ "../resources/img/" + profPic[idx]+ "' width='120' height='120'>";
			document.getElementById("recentActivities" + idx).rows[1].cells[0].rowSpan = 5;
			document.getElementById("recentActivities" + idx).rows[1].cells[0].style = "width: 50px; height: 50px; vertical-align: top";
		
			// fullname
			row.insertCell(1);
			
			document.getElementById("recentActivities" + idx).rows[1].cells[1].innerHTML = "<b>" + fullName[idx] + "</b>" + " wrote a review for " + "<b>" + reviewedProduct[idx] + "</b>";
			document.getElementById("recentActivities" + idx).rows[1].cells[1].colSpan = 3;
			document.getElementById("recentActivities" + idx).rows[1].cells[1].style = "font-size: 14px; padding-left: 25px";
			
			// rating star
			row = document.getElementById("recentActivities" + idx).insertRow(2);
			row.insertCell(0);
			
			document.getElementById("recentActivities" + idx).rows[2].cells[0].innerHTML = '<ul class="c-rating"></ul>';
			document.getElementById("recentActivities" + idx).rows[2].cells[0].style = "padding-left: 25px";
			
			// date and time
			row.insertCell(1);
			
			document.getElementById("recentActivities" + idx).rows[2].cells[1].innerHTML = date[idx] + " " + time[idx];
			//document.getElementById("recentActivities" + idx).rows[2].cells[1].colSpan = 2;
			document.getElementById("recentActivities" + idx).rows[2].cells[1].style = "padding-left: 70px; font-size: 14px";
			
			// review
			row = document.getElementById("recentActivities" + idx).insertRow(3);
			row.insertCell(0);
			row.insertCell(1);
			
			document.getElementById("recentActivities" + idx).rows[3].cells[0].innerHTML = review[idx];
			//document.getElementById("recentActivities" + idx).rows[3].cells[0].rowSpan = 2;
			document.getElementById("recentActivities" + idx).rows[3].cells[0].colSpan = 2;
			document.getElementById("recentActivities" + idx).rows[3].cells[0].style = "padding-left: 25px; width: 390px; word-wrap: break-word; vertical-align: top";
			
			// was this review ...?
			row = document.getElementById("recentActivities" + idx).insertRow(4);
			row.insertCell(0);
			
			document.getElementById("recentActivities" + idx).rows[4].cells[0].innerHTML = "<b>Was this review ...?</b>";
			document.getElementById("recentActivities" + idx).rows[4].cells[0].colSpan = 2;
			document.getElementById("recentActivities" + idx).rows[4].cells[0].style = "padding-left: 25px; width: 390px; word-wrap: break-word; vertical-align: top";
		
			// Useful, Funny, Cool
			row = document.getElementById("recentActivities" + idx).insertRow(5);
			row.insertCell(0);
			
			document.getElementById("recentActivities" + idx).rows[5].cells[0].innerHTML = "" +
											"<input type='button' style='margin-right: 20px' value='Useful' />" + 
											"<input type='button' style='margin-right: 20px' value='Funny' />" +
											"<input type='button' style='margin-right: 20px' value='Cool' />";
			document.getElementById("recentActivities" + idx).rows[5].cells[0].colSpan = 2;
			document.getElementById("recentActivities" + idx).rows[5].cells[0].style = "padding-left: 25px";
			
			// add rating widget for the activity
			$scope.addRatingWidget(table, idx);
		}
		
		/*
		// add rating widget for every activity
		for (var idx = 0; idx < totalActivities; idx++) {
			$scope.addRatingWidget(table, idx);
		}
		*/
		
	}
	
    // ADD RATING WIDGET
    $scope.addRatingWidget = function(shopItem, data) {
    	var ratingElement = shopItem.querySelector('.c-rating');
    	var currentRating = 3;
    	var maxRating = 5;
    	var callback = function(rating) { alert(rating); };
    	var r = rating("newsfeed", ratingElement, currentRating, maxRating, callback);
    }

}]);

