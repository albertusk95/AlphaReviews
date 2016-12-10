<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Welcome to AlphaReviews</title>
	
	<!-- CUSTOM CSS -->
	<link href="resources/css/custom.css" rel="stylesheet" />
	
	<!-- BOOTSTRAP -->
	<link href="resources/css/bootstrap.min.css" rel="stylesheet" />
	
	<!-- FIREBASE SCRIPT -->
	<script src="https://www.gstatic.com/firebasejs/3.6.3/firebase.js"></script>
	
</head>
<body>

	<div class="container">	
		
		<!-- TOP NAVBAR FOR LOGIN FORM -->
		<div id="top-navbar">
			<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
				<div class="container-fluid">
				  
					<!-- Project's title -->
					<div class="navbar-header">
				  		<h1><a style="vertical-align: middle" href="#">AlphaReviews</a></h1>
					</div>
				
					<form class="navbar-form navbar-right" role="search">
	                    <div class="form-group">
	                        <input type="text" id="login_email" class="form-control" name="email" placeholder="Email">
	                    </div>
	                    <div class="form-group">
	                        <input type="text" id="login_password" class="form-control" name="password" placeholder="Password">
	                    </div>
	                    
	                	<button type="button" id="login_button" class="btn btn-default navbar-btn">Sign in</button>
	                </form>
	    
				</div><!-- /.container-fluid -->
			</nav>
		</div>
		<!-- END OF TOP NAVBAR -->
		
		
		<!-- SIGN UP AREA -->
		<div id="signup_area" class="row">
			<div class="col-sm-6">AlphaReviews helps you to review the products before deciding to buy them</div>
		  	<div class="col-sm-6">
		  	
		  		<h1 style="margin-bottom: 30px">Join us!</h1>
		  		<form method="post">
		  			
		  			<table border=0>
		  			
		  				<tr class="spaceUnder">
		  					<td><input type="text" class="form-control" id="reg_first_name" name="reg_first_name" placeholder="First name" /></td>
		  					<td><input type="text" class="form-control" id="reg_last_name" name="reg_last_name" placeholder="Last name"  /></td>
		  				</tr>
						
						<tr class="spaceUnder">
							<td colspan=2><input type="text" class="form-control" id="reg_email" name="reg_email" placeholder="Email" /></td>
						</tr>
						
						<tr class="spaceUnder">
							<td colspan=2><input type="text" class="form-control" id="reg_username" name="reg_username" placeholder="Username" /></td>
						</tr>
							
						<tr class="spaceUnder">
							<td colspan=2><input type="password" class="form-control" id="reg_password" name="reg_password" placeholder="Password" /></td>
						</tr>
							  			  			
						<tr class="spaceAbove">
							<td>
								<button type="button" id="reg_button" class="btn btn-warning">Create an account</button>
							</td>
						</tr>
		  			</table>
		  			
		  		</form>
		  		
		  	</div>
		</div>
		<!-- END OF SIGN UP AREA -->
		
	</div>

	<!-- CUSTOM JS -->
	<script src="resources/js/user_auth.js"></script>
	
</body>
</html>