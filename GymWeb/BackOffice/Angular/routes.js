var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Templates/home.html"
    })
    .when("/listadeclientes", {
        templateUrl : "Templates/lista_de_clients.html"
    })
    .otherwise({
        templateUrl : "Templates/404.htm"
    })
});

