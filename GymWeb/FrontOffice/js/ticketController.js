import { getTicketById, addAnswerToTicket, getClient } from "./pedidos.js";

// Controller página de um ticket especifico
app.controller('ticketCtrl', function ($scope, $http, $routeParams) {

    // Botão de submit nova resposta é clicável
    $scope.disableSubmit = "";

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


            let clientId = response.data.clientId;

            getClient($http, clientId, (response2) => {
                if (response2) {

                    let clientFName = response2.data.firstName;
                    let clientLName = response2.data.lastName;

                    if (clientFName === undefined || clientFName === null) {
                        clientFName = "";
                    }

                    if (clientLName === undefined || clientLName === null) {
                        clientLName = "";
                    }

                    let clientName = clientFName + " " + clientLName;

                    let clientId = response2.data.clientId;

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

                        if(messages[i].from === "Client"){
                            messages[i].name = clientName;
                        }else{
                            messages[i].name = "Admin";
                        }

                    }
                    
                    let ticket = { clientName, messages };

                    $scope.ticket = ticket;


                }else{

                }

            });

        } else {

        }

    });


    // Se o cliente clicar no botão de adicionar resposta
    $scope.addAnswer = function () {

        // Disable do botão de submit para evitar enviar a mesma resposta várias vezes
        $scope.disableSubmit = "y";

        if ($scope.answer === "" || $scope.answer === undefined) {

            // Mostra alerta de que os dados foram preenchidos sem sucesso
            $scope.nova_resposta_sem_sucesso_dados = "";

        } else {

            // Oculta warning de formulário preenchidos sem sucesso
            $scope.novo_ticket_sem_sucesso_dados = "y";

            // Disable do botão de submit para evitar enviar o mesmo ticket várias vezes
            $scope.disableSubmit = "y";

            let message = $scope.answer;
            let supportTicketId = id;
            let from = "Client";

            let dataSend = { message, from, supportTicketId };

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

                    // Mostra mensagem de insucesso
                    $scope.nova_resposta_sem_sucesso = "";
                }

            });

        }
    }


});