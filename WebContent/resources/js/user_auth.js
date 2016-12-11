/* SCRIPT FOR USER AUTHENTICATION */

(function() {

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

		dbRefObject.ref("users/" + uid).on("value", function(snap) {
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
			window.location.href = "views/appContainer.jsp";
		} else {
			console.log("not logged in");
		}
	});

}());
