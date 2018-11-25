// Controller da página de um novo ticket
app.controller('novoTicketCtrl', function ($scope, $http, $window) {

    // Ocultar alertas no topo da página
    $scope.novo_ticket_sucesso = "y";
    $scope.novo_ticket_sem_sucesso = "y";
    $scope.novo_ticket_sem_sucesso_dados = "y";

    // Botão de submit é clicável
    $scope.disableSubmit = "";

    // Quando clica no botão de submit
    $scope.submitTicket = function () {

        // Verificar se o formulário está corretamente preeenchido
        if ($scope.assunto === "" || $scope.assunto === undefined || $scope.comentario === "" || $scope.comentario === undefined) {
            
            // Mostra alerta de que os dados foram preenchidos sem sucesso
            $scope.novo_ticket_sem_sucesso_dados = "";

        } else {

            // Oculta warning de formulário preenchidos sem sucesso
            $scope.novo_ticket_sem_sucesso_dados = "y";

            // Disable do botão de submit para evitar enviar o mesmo ticket várias vezes
            $scope.disableSubmit = "y";

            // Dados do formulário
            let clientId = 1;
            let openedAt = new Date();
            let ticket = {clientId, openedAt};

            ticket = JSON.stringify(ticket);

            // Envia ticket para a API
            $http({

                method: "POST",
                data: ticket,
                url: "https://localhost:5001/api/tickets",
                headers: {
                    'content-type': "application/json"
                }

            }).then(function mySuccess(response) {

                // Mostra mensagem de sucesso
                $scope.novo_ticket_sucesso = "";

                // Se ticket for enviado com sucesso, 
                // é redireionado para a página de tickets em 2 segundos
                setTimeout(function () {
                    window.location.href = "#!suporte";
                }, 2000);

                let message = $scope.comentario;
                let fromClientId = 1;
                let fromStaffId = 1;
                let supportTicketId = response.data.id;

                let data = {message, fromClientId, fromStaffId, supportTicketId, openedAt};

                // Adiciona uma mensagem ao ticket
                $http({

                    method: "POST",
                    data: data,
                    url: "https://localhost:5001/api/tickets/" + supportTicketId + "/messages",
                    headers: {
                        'content-type': "application/json"
                    }

                }).then(function mySuccess(response) {


                }, function myError(response) {

                });


            }, function myError(response) {

                // Mostra mensagem de insucesso
                $scope.novo_ticket_sem_sucesso = "";

            });
        }
    }

});