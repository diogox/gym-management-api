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
    .when("/listadetickets", {
        templateUrl : "Templates/lista_de_tickets.html"
    })
    .when("/ticket/:id", {
        templateUrl : "Templates/ticket.html"
    })
    .when("/listadeplanos",{ //Página com a lista de Planos de Exercicios
        templateUrl : "Templates/404.htm"
    })
    .when("/listadeexercicios",{ //Página com a lista de Exercicios
        templateUrl : "Templates/404.htm"
    })
    .otherwise({
        templateUrl : "Templates/404.htm"
    })
});

