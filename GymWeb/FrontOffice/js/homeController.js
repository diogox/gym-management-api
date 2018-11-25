// Controller da  página home
app.controller('homeCtrl', function($scope, $http) {

    // Função que atualiza na pagina home as entradas no ginásio
    function atualizaEntradas(){
        // Obtem os dados do cliente
        $http({

            method : "GET",
            url : "https://localhost:5001/api/clients/4/"

        }).then(function mySuccess(response) {
            
            // Obtem todo o histórico de entradas
            let history = response.data.checkInHistory;
            let entradas = [];

            // Percorre todas as entradas
            for(let i=0; i<history.length; i++) {

                // Extrai a data da entrada
                let data = history[i].at.split('T')[0];

                // Extrai a hora da entrada
                let hora = history[i].at.split('T')[1].split('.')[0];

                // Introduz as informações num objeto e insere o objeto num array de entradas
                entradas.push({data, hora});

            }

            // Atualiza as entradas que são mostradas no ecra
            $scope.entradas = entradas;

        }, function myError(response) {

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
    $scope.checkin = function() {

        // Efetua pedido para realizar check-in do cliente
        $http({

            method : "GET",
            url : "https://localhost:5001/api/clients/4/check-in"

        }).then(function mySuccess(response) {

            // Em caso de sucesso, mostra um alerta a indicar que o check-in foi bem sucedido
            $scope.check_in_sucesso = "";

            // Atualiza as entradas que são mostras quando fizer check-in
            atualizaEntradas();

        }, function myError(response) {

            // Em caso de inssucesso, mostra um alerta a indicar que o check-in não foi bem sucedido
            $scope.check_in_sem_sucesso = ""

        });

    };

});