import { createTicket, addAnswerToTicket } from './pedidos.js'

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

        // Verificar se o formulário está incorretamente preeenchido
        if ($scope.assunto === "" || $scope.assunto === undefined || $scope.comentario === "" || $scope.comentario === undefined) {

            // Mostra alerta de que os dados foram preenchidos sem sucesso
            $scope.novo_ticket_sem_sucesso_dados = "";

            // Se o formulário estiver preenchido corretamente
        } else {

            // Oculta warning de formulário preenchidos sem sucesso
            $scope.novo_ticket_sem_sucesso_dados = "y";

            // Disable do botão de submit para evitar enviar o mesmo ticket várias vezes
            $scope.disableSubmit = "y";

            // Dados do formulário
            let clientId = 1;
            let openedAt = new Date();
            let ticket = { clientId, openedAt };

            ticket = JSON.stringify(ticket);

            // Pede à API para criar um ticket novo
            createTicket($http, ticket, (response) => {

                // Se a API respondeu da forma correta
                if (response) {

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

                    let data = { message, fromClientId, fromStaffId, supportTicketId, openedAt };

                    // Pede à API para adicionar a primeira resposta ao ticket
                    addAnswerToTicket($http, supportTicketId, data, (response2) => {

                        if (response2) {

                        } else {

                        }

                    })

                    // Se a API não respondeu da forma correta
                } else {

                    // Mostra mensagem de insucesso
                    $scope.novo_ticket_sem_sucesso = "";

                }

            });

        }
    }

});