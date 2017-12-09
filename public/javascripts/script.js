angular
.module('myApp', ["firebase"])
.controller('myCtrl', myCtrl);

function myCtrl($scope, $firebaseAuth) {
	$scope.test = "Hello World!";

	$scope.authObj = $firebaseAuth();
	initFirebase($scope);

    $scope.wishlist = [];

    $scope.addItem = function() {
      var newItem = {name:$scope.formName,URL:$scope.formURL};
	console.log($scope);
	console.log(newItem);
      //$scope.create(newObj);
      $scope.wishlist.push(newItem);
      $scope.formName = '';
      $scope.formURL = '';
    }
}

//======================================================================
//			Firebase setup

function initFirebase($scope) {

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
			$scope.authObj.$signOut();
		}
	};

	// Listening for auth state changes.
	$scope.authObj.$onAuthStateChanged(function(user) {
		console.log("auth state changed:", user);
		$scope.signInStatus = user ? "Signed in!" : "Not signed in";
		$scope.user = user || null;
		$scope.signingIn = false;
	});
}
