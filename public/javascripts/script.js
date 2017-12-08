angular
.module('myApp', [])
.controller('myCtrl', myCtrl);

function myCtrl($scope) {
	$scope.test = "Hello World!";
}
