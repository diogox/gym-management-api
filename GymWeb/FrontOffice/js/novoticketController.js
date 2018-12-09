import { createTicket, addAnswerToTicket } from './pedidos.js'
import { checkLogin } from './myutil.js'

// Controller da página de um novo ticket
app.controller('novoTicketCtrl', function ($scope, $http, $window, $rootScope) {

    let login = checkLogin();
    if(!login) {
        window.location.href = "index.html#!login";
    }

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');

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
            let clientId = 2;
            let title = $scope.assunto;
            let message = $scope.comentario;
            let openedAt = new Date();
            let messages = [{ "message": message, "at": openedAt, "from": "Client" }]
            let state = "Open";

            let ticket = { title, clientId, openedAt, messages, state };

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

                    // Se a API não respondeu da forma correta
                } else {

                    // Mostra mensagem de insucesso
                    $scope.novo_ticket_sem_sucesso = "";

                }

            });

        }
    }

});