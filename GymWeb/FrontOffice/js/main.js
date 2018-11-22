var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/home.htm"
    })
    .when("/exercicios", {
        templateUrl : "template/exercicios.htm"
    })
    .when("/equipamentos", {
        templateUrl : "template/equipamentos.htm"
    })
});
