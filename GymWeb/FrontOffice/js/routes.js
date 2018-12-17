var app = angular.module('myApp', ["ngRoute"]);

// Rotas da aplicação web
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.htm"
    })
    .when("/registo", {
        templateUrl : "views/registo.htm"
    })
    .when("/login", {
        templateUrl : "views/login.htm"
    })
    .when("/planos", {
        templateUrl : "views/planos.htm"
    })
    .when("/atribuirPlano", {
        templateUrl : "views/atribuirPlano.htm"
    })
    .when("/exercicios", {
        templateUrl : "views/exercicios.htm"
    })
    .when("/equipamentos", {
        templateUrl : "views/equipamentos.htm"
    })
    .when("/suporte", {
        templateUrl : "views/suporte.htm"
    })
    .when("/ticket/:id", {
        templateUrl : "views/ticket.htm"
    })
    .when('/novoticket', {
        templateUrl : "views/novoTicket.htm"
    })
    .when("/planotreino", {
        templateUrl : "views/planoTreino.htm"
    })
    .when('/relatorios', {
        templateUrl : "views/relatorios.htm"
    })
    .when('/notificacoes', {
        templateUrl : "views/notificacoes.htm"
    })
    .when('/501', {
        templateUrl : "views/501.htm"
    })
    .when('/404',{
        templateUrl : "views/404.htm"
    })
    .when('/403', {
        templateUrl : "views/403.htm"
    })
    .otherwise({
        templateUrl : "views/404.htm"
    })
});
