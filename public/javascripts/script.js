angular
.module('myApp', ["firebase"])
.controller('myCtrl', myCtrl);

function myCtrl($scope, $firebaseAuth, $firebaseArray) {


	$scope.authObj = $firebaseAuth();
	$scope.addItem = function() {
		var newItem = {name:$scope.formName,URL:$scope.formURL};
		console.log($scope);
		console.log(newItem);
		$scope.wishlist.$add(newItem);
		$scope.formName = '';
		$scope.formURL = '';
	}
	initFirebase($scope, setupWishlist);

	function setupWishlist() {
		if (!$scope.authObj.$getAuth()) {
			$scope.wishlist = null;
			return;
		}
		console.log($scope.authObj);
		var ref = firebase.database().ref('/wishlists/' + $scope.authObj.$getAuth().uid);
		$scope.wishlist = $firebaseArray(ref);
	}
}

//======================================================================
//			Firebase setup

function initFirebase($scope, callback) {

	$scope.signInStatus = "";
	$scope.signingIn = false;
	$scope.user = null;

	$scope.toggleSignIn = function toggleSignIn() {
		$scope.signingIn = true;
		if (!$scope.authObj.$getAuth()) {
			var provider = new firebase.auth.GithubAuthProvider();
			console.log("Signing in");
			$scope.authObj.$signInWithRedirect(provider);
		} else {
			console.log("Signing out");
			$scope.authObj.$signOut().then(callback);
		}
	};

	// Listening for auth state changes.
	$scope.authObj.$onAuthStateChanged(function(user) {
		console.log("auth state changed:", user);
		$scope.signInStatus = user ? "Signed in!" : "Not signed in";
		$scope.user = user || null;
		$scope.signingIn = false;
		callback();
	});
}
