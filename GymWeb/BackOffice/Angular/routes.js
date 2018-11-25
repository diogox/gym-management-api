var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Templates/home.html"
    })
    .when("/listadeclientes", {
        templateUrl : "Templates/lista_de_clients.html"
    })
    .when("/listadestaff", {
        templateUrl : "Templates/lista_de_staff.html"
    })
    .when("/listadeequipamentos", {
        templateUrl : "Templates/lista_de_equipamento.html"
    })
    .otherwise({
        templateUrl : "Templates/404.htm"
    })
});

