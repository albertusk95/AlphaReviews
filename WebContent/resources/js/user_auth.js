/* SCRIPT FOR USER AUTHENTICATION */

(function() {
	
	// Initialize Firebase
	var config = {
			apiKey: "AIzaSyDnp8OIbH6RZsPp4lnZjUjLcNrghofwwUs",
			authDomain: "alphareviews-861a5.firebaseapp.com",
			databaseURL: "https://alphareviews-861a5.firebaseio.com",
			storageBucket: "alphareviews-861a5.appspot.com",
			messagingSenderId: "816045509354"
	  	};

	firebase.initializeApp(config);

	var authType;
	
	const txtEmailLogin = document.getElementById("login_email");
	const txtPasswordLogin = document.getElementById("login_password");
	const btnLogin = document.getElementById("login_button");
	
	const txtFirstNameSignUp = document.getElementById("reg_first_name");
	const txtLastNameSignUp = document.getElementById("reg_last_name");
	const txtEmailSignUp = document.getElementById("reg_email");
	const txtUsernameSignUp = document.getElementById("reg_username");
	const txtPasswordSignUp = document.getElementById("reg_password");
	const btnSignUp = document.getElementById("reg_button");
	
	// SIGN OUT
	const btnSignOut = document.getElementById("signout_button");
	
	// Add email validator
	function validateEmail(email) {
		if (email == "") {
			return false;
		}
		return true;
	}

	// Add password validator
	function validatePassword(password) {
		if (password == "") {
			return false;
		}
		return true;
	}

	// Add method for inserting the registered user to the realtime database with additional information
	function insertUserToRealTimeDB(uid) {

		console.log("Writing data to the realtime database");
		
		// Create references
		const dbRefObject = firebase.database();
		
		dbRefObject.ref("users").child(uid);
		dbRefObject.ref("users/" + uid).child("email");
		dbRefObject.ref("users/" + uid).child("username");
		dbRefObject.ref("users/" + uid).child("firstName");
		dbRefObject.ref("users/" + uid).child("lastName");
		dbRefObject.ref("users/" + uid).child("totalReviews");
		
		
		dbRefObject.ref("users/" + uid).set({
			email: txtEmailSignUp.value,
		    username: txtUsernameSignUp.value,
			firstName: txtFirstNameSignUp.value,
		    lastName: txtLastNameSignUp.value,
		    totalReviews: 0
		});

		dbRefObject.ref("users/" + uid + "/email").on("value", function(snap) {
			console.log("Inserted into the database");
			console.log(snap.val());
		});
		
	}
	
	// Add login event
	btnLogin.addEventListener("click", function() {
		
		console.log("Login event listener");
		
		// Get email and password
		const email = txtEmailLogin.value;
		const password = txtPasswordLogin.value;
			
		if (validateEmail(email)) {
			
			console.log("Email validation is OK");
			
			if (validatePassword(password)) {
				
				console.log("Password validation is OK");
				
				// Sign in
				const authLogin = firebase.auth();
				const promise = authLogin.signInWithEmailAndPassword(email, password);
				promise.catch(function(e) {
					console.log(e.message);
				});
					
				authType = "login";
				
			} else {
				alert("Password is required");
			}
			
		} else {
			alert("Email is required");
		}
		
	});

	// Add signup event
	btnSignUp.addEventListener("click", function() {
		
		console.log("SignUp event listener");
		
		// Get email and password
		const email = txtEmailSignUp.value;
		const password = txtPasswordSignUp.value;
		
		const authSignUp = firebase.auth();
		
		// Sign up
		const promise = authSignUp.createUserWithEmailAndPassword(email, password);
		promise.catch(function(e) {
			console.log(e.message);
		});
		
		authType = "signUp";
			
	});
	
	// Add sign out event
	btnSignOut.addEventListener("click", function(){
		firebase.auth().signOut();
	});
	
	
	// Add a realtime listener
	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			
			if (authType == "login") {
				
				console.log("Successfully logged in");
			
			} else if (authType == "signUp") {
				console.log("Successfully signed up");

				insertUserToRealTimeDB(firebaseUser.uid);
			}
			
			// show the authentication's information
			console.log(firebaseUser);
			
			// redirect to the main page
			//window.location.href = "views/main.jsp";
		} else {
			console.log("not logged in");
		}
	});

}());



/*
function login() {
	
	var username = document.getElementById("login_username").value;
	var password = document.getElementById("login_password").value;
	
	if (validateUsername(username)) {
		
		if (validatePassword(password)) {
			
			validateLogin(username, password);
			
		} else {
			alert("Password is required");
		}
		
	} else {
		alert("Username is required");
	}
	
}
*/

/*
function validateLogin(username, password) {
	
	var xmlhttp;
	
	if (window.XMLHttpRequest) { 
		// for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { 
		// for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function() {
		
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
			// parse JSON
	    	if (xmlhttp.responseText == "200") {
	    		console.log("user was successfully authenticated");
	    		window.location.href = "views/main.jsp";
	    	} else {
	    		console.log("authentication was fail");
	    		alert("Invalid username or password");
	    	}

		}
	}
	
	console.log("validating username and password...");
	
	var url = "userAuth?service=login";
	xmlhttp.open("POST", url, true);

	// Send the proper header information along with the request
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	var params = "username=" + username + "&" + "password=" + password;

	xmlhttp.send(params);

}
*/
