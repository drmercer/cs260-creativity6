angular
.module('myApp', ["firebase"])
.controller('viewCtrl', viewCtrl);

function viewCtrl($scope, $firebaseAuth, $firebaseArray) {
	var ref = firebase.database().ref('/wishlists/' + window.userID);
	$scope.wishlist = $firebaseArray(ref);
}
