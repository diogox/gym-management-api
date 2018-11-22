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
    .when("/suporte", {
        templateUrl : "template/suporte.htm"
    })
    .when("/ticket", {
        templateUrl : "template/ticket.htm"
    })
    .when('/novoticket', {
        templateUrl : "template/novoTicket.htm"
    })
    .otherwise({
        templateUrl : "template/404.htm"
    })
});