angular
.module('myApp', ["firebase"])
.controller('myCtrl', myCtrl);

function myCtrl($scope, $firebaseArray) {
	$scope.test = "Hello World!";
	initFirebase($scope);
}

//======================================================================
//			Firebase setup

function initFirebase($scope) {

	$scope.signInStatus = firebase.auth().currentUser ? "Signed in!" : "Not signed in";
	$scope.signingIn = false;
	$scope.toggleSignIn = function toggleSignIn() {
		$scope.signingIn = true;
		if (!firebase.auth().currentUser) {
			var provider = new firebase.auth.GithubAuthProvider();
			console.log("Signing in");
			firebase.auth().signInWithRedirect(provider);
		} else {
			console.log("Signing out");
			firebase.auth().signOut();
		}
	};

	$scope.user = null;
	firebase.auth().getRedirectResult().then(function(result) {
		// The signed-in user info.
		$scope.signingIn = false;
		$scope.user = result.user;
		$scope.signInStatus = "Signed in!";
		$scope.$apply();
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		if (errorCode === 'auth/account-exists-with-different-credential') {
			alert('You have already signed up with a different auth provider for that email.');
			// If you are using multiple auth providers on your app you should handle linking
			// the user's accounts here.
		} else {
			console.error(error);
		}
	});
	// Listening for auth state changes.
	firebase.auth().onAuthStateChanged(function(user) {
		console.log("auth state changed:", user);
		$scope.signInStatus = user ? "Signed in!" : "Not signed in";
		$scope.user = user || null;
		$scope.signingIn = false;
		$scope.$apply() 
	});
}
