import { getClient, checkin } from './pedidos.js';

// Controller da  página home
app.controller('homeCtrl', function ($scope, $http) {

    // Função que atualiza na pagina home as entradas no ginásio
    function atualizaEntradas() {

        // Pede os dados do cliente à API
        getClient($http, 2, (response) => {

            // Se a API respondeu da forma correta
            if (response) {

                // Obtem todo o histórico de entradas
                let history = response.data.checkInHistory;

                // Percorre todas as entradas
                for (let i = 0; i < history.length; i++) {

                    // Extrai a data da entrada
                    let data = history[i].at.split('T')[0];

                    // Extrai a hora da entrada
                    let hora = history[i].at.split('T')[1].split('.')[0];

                    // Cria nova entrada no objeto para adicionar hora e data separados
                    response.data.checkInHistory[i].date = data;
                    response.data.checkInHistory[i].time = hora;
                    

                }
                
                // Atualiza as entradas para atualizar a vista
                $scope.entradas = response.data.checkInHistory;

                // Se a API não respondeu da forma correta
            } else {
            }

        });
    }

    // Inicialmente todos os alertas são ocultados 
    $scope.warning_pagamento = "y";
    $scope.alert_pagamento = "y";
    $scope.check_in_sucesso = "y"
    $scope.check_in_sem_sucesso = "y"


    // Atualiza entradas ao entrar na página 
    atualizaEntradas();

    // Evento quando clica no botão de check-in
    $scope.checkin = function () {

        // Faz pedido de check-in à API
        checkin($http, 2, (response) => {

            // Se a API responder da forma correta
            if (response) {
                // Em caso de sucesso, mostra um alerta a indicar que o check-in foi bem sucedido
                $scope.check_in_sucesso = "";

                // Atualiza as entradas que são mostras quando fizer check-in
                atualizaEntradas();

                // Se a API não responder da forma correta
            } else {

                // Em caso de inssucesso, mostra um alerta a indicar que o check-in não foi bem sucedido
                $scope.check_in_sem_sucesso = ""

            }

        });
    }


});