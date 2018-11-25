var app = angular.module('myApp', ["ngRoute"]);

// Rotas da aplicação web
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
    .when("/suporte", {
        templateUrl : "template/suporte.htm"
    })
    .when("/ticket/:id", {
        templateUrl : "template/ticket.htm"
    })
    .when('/novoticket', {
        templateUrl : "template/novoTicket.htm"
    })
    .when("/planotreino", {
        templateUrl : "template/planoTreino.htm"
    })
    .when('/relatorios', {
        templateUrl : "template/501.htm"
    })
    .when('/notificacoes', {
        templateUrl : "template/501.htm"
    })
    .when('/logout', {
        templateUrl : "template/501.htm"
    })
    .otherwise({
        templateUrl : "template/404.htm"
    })
});