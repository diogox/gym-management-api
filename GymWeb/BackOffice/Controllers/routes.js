var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Views/home.html",
    })
    .when("/listadeclientes", {
        templateUrl : "Views/lista_de_clients.html"
    })
    .when("/listadestaff", {
        templateUrl : "Views/lista_de_staff.html"
    })
    .when("/listadeequipamentos", {
        templateUrl : "Views/lista_de_equipamento.html"
    })
    .when("/listadetickets", {
        templateUrl : "Views/lista_de_tickets.html"
    })
    .when("/ticket/:id", {
        templateUrl : "Views/ticket.html"
    })
    .when("/listadeplanos",{
        templateUrl : "Views/lista_de_planos_treino.html"
    })
    .when("/plano/:id", {
        templateUrl : "Views/plano.html"
    })
    .when("/listadeexercicios",{
        templateUrl : "Views/lista_de_exercicios.html"
    })
    .when("/login",{
        templateUrl : "Views/login_page.html"
    })
    .otherwise({
        templateUrl : "Views/404.htm"
    })
});

