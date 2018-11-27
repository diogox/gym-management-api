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

        // Se a API respondeu da forma correta
        if (response) {

            // Obtem o id do cliente deste ticket
            let clientId = response.data.clientId;

            // Obtem os dados do cliente
            getClient($http, clientId, (response2) => {

                // Se a API respondeu da forma correta
                if (response2) {

                    // Obtem o nome completo do utilizador
                    let clientFName = response2.data.firstName;
                    let clientLName = response2.data.lastName;

                    // Se o primeiro nome do cliente não estiver definido, é substituido por uma string vazia
                    if (clientFName === undefined || clientFName === null) {
                        clientFName = "";
                    }

                    // Se o ultimo nome do cliente não estiver definido, é substituido por uma string vazia
                    if (clientLName === undefined || clientLName === null) {
                        clientLName = "";
                    }

                    // Concatnar os nomes do cliente
                    let clientName = clientFName + " " + clientLName;

                    // Obtem as mensagens do ticket
                    let messages = response.data.messages;

                    // Percorre as mensagens e reorganiza a data num novo formato
                    for (let i = 0; i < messages.length; i++) {
                        let at = messages[i].at;
                        let year = at.substring(0, 4);
                        let month = at.substring(5, 7);
                        let day = at.substring(8, 10);
                        let hour = at.substring(11, 13);
                        let minute = at.substring(14, 16);
                        at = day + "-" + month + "-" + year + " " + hour + ":" + minute;
                        messages[i].at = at;

                        // Se a mensagem tiver sido enviado pelo cliente, o nome que aparece
                        // no ticket é o nome do cliente
                        if(messages[i].from === "Client"){
                            messages[i].name = clientName;
                        
                        // Se a mensagem tiver sido enviada pelo admin, aparece "admin" como
                        // emissor da mensagem
                        }else{
                            messages[i].name = "Admin";
                        }

                    }
                    
                    let ticket = { clientName, messages };

                    // Atualizar a vista
                    $scope.ticket = ticket;


                // Se a API não respondeu da forma correta
                }else{

                    alert("Something went wrong");

                }

            });

        // Se a API não respondeu da forma correta
        } else {

            alert("Something went wrong");

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