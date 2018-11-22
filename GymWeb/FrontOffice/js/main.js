var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/home.htm"
    })
});


app.controller('homeCtrl', function($scope, $http) {

    //alert("home");

    $scope.checkin = function() {
        alert("Checked in")
    };

});