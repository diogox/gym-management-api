import { getTicketById, addAnswerToTicket } from "./pedidos.js";

// Controller página de um ticket especifico
app.controller('ticketCtrl', function ($scope, $http, $routeParams) {

    // ::TODO:: Atualizar quando a API estiver a funcionar corretamente

    // Obter id do ticket
    let id = $routeParams.id;

    // Ocultar alertas no topo da página
    $scope.nova_resposta_sucesso = "y";
    $scope.nova_resposta_sem_sucesso = "y";
    $scope.nova_resposta_sem_sucesso_dados = "y";

    // Botão de submit é clicável
    $scope.disableSubmit = "";

    // Pede um ticket especifico à API
    getTicketById($http, id, (response) => {

        if (response) {
            /*let clientFName = response.data.client.firstName;
            let clientLName = response.data.client.lastName;

            if (clientFName === undefined || clientFName === null){
                clientFName = "";
            }

            if (clientLName === undefined || clientLName === null){
                clientLName = "";
            }*/

            //let clientName = clientFName + " " + clientLName;

            let clientName = response.data.clientId;
            let messages = response.data.messages;

            for (let i = 0; i < messages.length; i++) {
                let at = messages[i].at;
                let year = at.substring(0, 4);
                let month = at.substring(5, 7);
                let day = at.substring(8, 10);
                let hour = at.substring(11, 13);
                let minute = at.substring(14, 16);
                at = day + "-" + month + "-" + year + " " + hour + ":" + minute;
                messages[i].at = at;
            }

            let ticket = { clientName, messages };

            $scope.ticket = ticket;
        } else {

        }

    });


    // Se o cliente clicar no botão de adicionar resposta
    $scope.addAnswer = function () {

        if ($scope.answer === "" || $scope.answer === undefined) {

            // Mostra alerta de que os dados foram preenchidos sem sucesso
            $scope.nova_resposta_sem_sucesso_dados = "";

        } else {

            // Oculta warning de formulário preenchidos sem sucesso
            $scope.novo_ticket_sem_sucesso_dados = "y";

            // Disable do botão de submit para evitar enviar o mesmo ticket várias vezes
            $scope.disableSubmit = "y";

            let message = $scope.answer;
            let fromClientId = 1;
            let fromStaffId = 1;
            let supportTicketId = id;

            let dataSend = { message, fromClientId, fromStaffId, supportTicketId };

            // Pede à API para adicionar uma resposta a um ticket especifico
            addAnswerToTicket($http, id, dataSend, (response) => {

                // Se a API respondeu da forma correta
                if (response) {

                    // Mostra mensagem de sucesso
                    $scope.nova_resposta_sucesso = "";

                    // Se a resposta for enviado com sucesso, 
                    // é redireionado para a página de tickets em 2 segundos
                    setTimeout(function () {
                        window.location.href = "#!ticket/" + id;
                    }, 2000);

                // Se a API não respondeu da forma correta
                } else {

                }

            });

        }
    }


});