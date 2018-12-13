var app = angular.module('myApp', ["ngRoute"]);

// Rotas da aplicação web
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/home.htm"
    })
    .when("/registo", {
        templateUrl : "template/registo.htm"
    })
    .when("/login", {
        templateUrl : "template/login.htm"
    })
    .when("/planos", {
        templateUrl : "template/planos.htm"
    })
    .when("/atribuirPlano", {
        templateUrl : "template/atribuirPlano.htm"
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
        templateUrl : "template/relatorios.htm"
    })
    .when('/notificacoes', {
        templateUrl : "template/notificacoes.htm"
    })
    .when('/501', {
        templateUrl : "template/501.htm"
    })
    .when('/404',{
        templateUrl : "template/404.htm"
    })
    .when('/403', {
        templateUrl : "template/403.htm"
    })
    .otherwise({
        templateUrl : "template/404.htm"
    })
});
