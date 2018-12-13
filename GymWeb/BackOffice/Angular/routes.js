var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Templates/home.html",
        controller : "homeCtrl"
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
    .when("/listadeplanos",{
        templateUrl : "Templates/lista_de_planos_treino.html"
    })
    .when("/plano/:id", {
        templateUrl : "Templates/plano.html" //Página para um plano de Treino
    })
    .when("/listadeexercicios",{
        templateUrl : "Templates/lista_de_exercicios.html"
    })
    .when("/login",{
        templateUrl : "Templates/login_page.html"
    })
    .otherwise({
        templateUrl : "Templates/404.htm"
    })
});

//Controller da Home Pag (Num patch futuro irá ter os relatórios)
app.controller("homeCtrl", function ($rootScope) {
    //Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');
});
