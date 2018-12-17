import { getTicketById, addAnswerToTicket, getClient, openTicket, closeTicket } from "../js/pedidos.js";
import { checkLogin } from '../js/myutil.js'

// Controller página de um ticket especifico
app.controller('ticketCtrl', function ($scope, $http, $routeParams, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;
    
    if (!login) {
        window.location.href = "index.html#!login";
    } else if(userType === "Staff"){

        window.location.href = "index.html#!403";

    } else if(userType === "Client" || userType==="Admin") {

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        // Botão de submit nova resposta é clicável
        $scope.disableSubmit = "";

        // Obter id do ticket
        let id = $routeParams.id;

        // Ticket currente
        let ticket = {};
        let clientName = "";

        // Ocultar alertas no topo da página
        $scope.nova_resposta_sucesso = "y";
        $scope.nova_resposta_sem_sucesso = "y";
        $scope.nova_resposta_sem_sucesso_dados = "y";

        // Botão de submit é clicável
        $scope.disableSubmit = "";

        // Abre o ticket currente
        function openTicketPage() {
            $scope.close = "";
            $scope.open = "y";
            $scope.message = "";
            $scope.disableSubmit = "";
            $scope.ticket.state = "Open";
        }


        // Fecha o ticket currente
        function closeTicketPage() {
            $scope.close = "y";
            $scope.open = "";
            $scope.message = "y";
            $scope.disableSubmit = "y";
            $scope.ticket.state = "Close";
        }


        // Pede um ticket especifico à API
        getTicketById($http, id, (response) => {

            // Se a API respondeu da forma correta
            if (response) {

                // Obtem os dados do cliente
                getClient($http, response.data.clientId, (response2) => {

                    // Se a API respondeu da forma correta
                    if (response2) {

                        // Obtem o nome completo do utilizador
                        let clientFName = response2.data.firstName;
                        let clientLName = response2.data.lastName;

                        // Se o primeiro nome do cliente não estiver definido, é substituido por uma string vazia
                        if (clientFName === undefined || clientFName === null) {
                            response2.data.firstName = "";
                        }

                        // Se o ultimo nome do cliente não estiver definido, é substituido por uma string vazia
                        if (clientLName === undefined || clientLName === null) {
                            response2.data.lastName = "";
                        }

                        // Percorre as mensagens e reorganiza a data num novo formato
                        for (let i = 0; i < response.data.messages.length; i++) {
                            let at = response.data.messages[i].at;
                            let year = at.substring(0, 4);
                            let month = at.substring(5, 7);
                            let day = at.substring(8, 10);
                            let hour = at.substring(11, 13);
                            let minute = at.substring(14, 16);
                            at = day + "-" + month + "-" + year + " " + hour + ":" + minute;
                            response.data.messages[i].at = at;

                            // Se a mensagem tiver sido enviado pelo cliente, o nome que aparece
                            // no ticket é o nome do cliente
                            if (response.data.messages[i].from === "Client") {
                                response.data.messages[i].name = response2.data.firstName + " " + response2.data.lastName;
                                clientName = response.data.messages[i].name;
                                // Se a mensagem tiver sido enviada pelo admin, aparece "admin" como
                                // emissor da mensagem
                            } else {
                                response.data.messages[i].name = "Admin";
                            }

                        }

                        ticket = response.data;

                        // Atualizar a vista
                        $scope.ticket = ticket;

                        // Verifica o estado do ticket e executa as ações necessárias
                        if (response.data.state === "Open") {
                            openTicketPage();
                        } else {
                            closeTicketPage();

                        }

                        // Se a API não respondeu da forma correta
                    } else {

                    }

                });

                // Se a API não respondeu da forma correta
            } else {
                bootbox.alert({
                    message: "Ocorreu um erro. O ticket requisitado não foi encontrado",
                    backdrop: true,
                    buttons: {
                        ok: {
                            label: "OK!",
                            className: 'btn-danger'
                        }
                    }
                });

                // Se o ticket não existe redireciona para a página 404
                window.location.href = "index.html#!404";

            }

        });

        // Ações quando clica em fechar ticket
        $scope.closeTicket = function () {
            closeTicket($http, id, (response) => {
                if (response) {
                    closeTicketPage();
                } else {
                    bootbox.alert({
                        message: "Ocorreu um erro. Não foi possível fechar o ticket",
                        backdrop: true,
                        buttons: {
                            ok: {
                                label: "OK!",
                                className: 'btn-danger'
                            }
                        }
                    });
                }
            });
        }

        // Ações quando clica em abrir ticket
        $scope.openTicket = function () {
            openTicket($http, id, (response) => {
                if (response) {
                    openTicketPage();
                } else {
                    bootbox.alert({
                        message: "Ocorreu um erro. Não foi possível re-abir o ticket!",
                        backdrop: true,
                        buttons: {
                            ok: {
                                label: "OK!",
                                className: 'btn-danger'
                            }
                        }
                    });
                }
            });
        }

        // Se o cliente clicar no botão de adicionar resposta
        $scope.addAnswer = function () {

            // Disable do botão de submit para evitar enviar a mesma resposta várias vezes
            $scope.disableSubmit = "y";

            if ($scope.answer === "" || $scope.answer === undefined) {

                // Mostra alerta de que os dados foram preenchidos sem sucesso
                bootbox.alert({
                    message: "Dados incorretamente preenchidos!",
                    backdrop: true,
                    buttons: {
                        ok: {
                            label: "OK!",
                            className: 'btn-warning'
                        }
                    }
                });

            } else {

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

                        // Obtem a data atual e converte num novo formato
                        let at = String(new Date());
                        let year = at.substring(0, 4);
                        let month = at.substring(5, 7);
                        let day = at.substring(8, 10);
                        let hour = at.substring(11, 13);
                        let minute = at.substring(14, 16);
                        at = day + "-" + month + "-" + year + " " + hour + ":" + minute;

                        let newMessage = {message, name:clientName, at};
                        ticket.messages.push(newMessage);

                        // Informa que a resposta foi enviada com sucesso
                        bootbox.alert({
                            message: "Resposta enviada com sucesso!",
                            backdrop: true,
                            buttons: {
                                ok: {
                                    label: "OK!",
                                    className: 'btn-success'
                                }
                            }
                        });

                        // Limpa a resposta enviada pelo utilizador
                        document.getElementById("newmessage").value=null;

                        // Habilita novamente o botão de enviar ticket
                        $scope.disableSubmit = "";

                        // Se a API não respondeu da forma correta
                    } else {

                        // Informa que a resposta foi enviada sem sucesso
                        bootbox.alert({
                            message: "Mensagem enviada sem sucesso!",
                            backdrop: true,
                            buttons: {
                                ok: {
                                    label: "OK!",
                                    className: 'btn-danger'
                                }
                            }
                        });
                    }

                });

            }
        }

    }

});