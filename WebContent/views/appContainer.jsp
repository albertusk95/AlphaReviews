<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="alphareviews">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>AlphaReviews &dot; News Feed</title>
	
	<!-- CUSTOM CSS -->
	<link href="../resources/css/custom.css" rel="stylesheet" />
	
	<!-- RATING CSS -->
	<link href="../resources/css/rating.css" rel="stylesheet" />
	
	<!-- BOOTSTRAP -->
	<script src="../resources/js/jquery.js"></script>
	<script src="../resources/js/bootstrap.min.js"></script>
	<link href="../resources/css/bootstrap.min.css" rel="stylesheet" />
	
	<!-- ANGULAR -->
	<script src="../resources/js/angular.min.js"></script>
	<script src="../node_modules/angular-route/angular-route.min.js"></script>
	
	<!-- FIREBASE SCRIPT -->
	<script src="https://www.gstatic.com/firebasejs/3.6.3/firebase.js"></script>
	
</head>
<body>

	<!-- TOP NAVBAR FOR SEARCH BAR -->
	<div id="top-navbar">
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="container-fluid">
			  		
			  		<!-- Project's title -->
					<div class="navbar-header">
			  			<h3><a style="vertical-align: middle" href="#">AlphaReviews</a></h3>
					</div>
			
					<!-- Search feature -->
					<div class="collapse navbar-collapse">
					
						<form class="nav navbar-nav" role="search">
							<div class="row" style="padding-top: 12px">
		                    	<div class="form-group col-xs-5">
		                        	<input type="text" id="newsfeed_find" class="form-control" name="newsfeed_find" placeholder="restaurant, art, shopping">
		                    	</div>
		                    
			                    <div class="form-group col-xs-5">
			                        <input type="text" id="newsfeed_location" class="form-control" name="newsfeed_location" placeholder="New York">
			                    </div>
			           		 	
			           		 	<div class="form-group col-xs-2">
			                    	<button type="button" style="margin-top: 0px" id="newsfeed_search_button" class="btn btn-default navbar-btn">Search</button>
		                		</div>
		                	</div>
		                </form>
		    
		                <ul class="nav navbar-nav navbar-right">
		                    <li class="dropdown">
		                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Account <span class="caret"></span></a>
		                        <ul class="dropdown-menu" role="menu">
		                            <li><a id="#/editprofile">Edit profile</a></li>
		                            <li class="divider"></li>
		                            <li><a id="signout_button">Sign out</a></li>
		                        </ul>
		                    </li>
		                </ul>
				
					</div>
   		
   		
   					<!-- App's menu -->
   					<div class="collapse navbar-collapse">
						<div class="nav navbar-nav" role="search">
							<table border=0 class="alphareviews_navigation">
	    					
	    						<tr>
	    							<td align="right" style="padding-right: 70px">
	    								<a href="#/newsfeed">Home</a>
	    							</td>
	    							<td align="center">
	    								<a href="#/aboutme">About Me</a>
	    							</td>
	    							<td align="left" style="padding-left: 70px">
	    								<a href="#/writeareview">Write a Review</a>
	    							</td>
	    						</tr>
	    					
	    					</table>
    					</div>
   					</div>
   		
			</div><!-- /.container-fluid -->
		</nav>
	</div>
	<!-- END OF TOP NAVBAR -->
			
	
	<!-- CONTROLLED BY ANGULAR -->
	<div ng-view></div>
	
	
	<!-- FIREBASE INIT -->
	<script src="../resources/js/firebase_init.js"></script>
	
	<script>
		
		const btnSignOut = document.getElementById("signout_button");
		
		// Add sign out event
		btnSignOut.addEventListener("click", function() {
			console.log("Clicked sign out");
			firebase.auth().signOut();
		});
		
	</script>
	
	<!-- RATING JS -->
	<script src="../resources/js/rating.js"></script>
	
	<!-- APP JS -->
	<script src="../public/app.js"></script>
	<script src="../public/newsfeed/newsfeed.js"></script>
	<script src="../public/aboutme/aboutme.js"></script>
	<script src="../public/writeareview/writeareview.js"></script>
	<script src="../public/editprofile/editprofile.js"></script>
	
</body>
</html>