import { createTicket, addAnswerToTicket } from '../js/pedidos.js'
import { checkLogin } from '../js/myutil.js'

// Controller da página de um novo ticket
app.controller('novoTicketCtrl', function ($scope, $http, $window, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;

    if (!login) {
        window.location.href = "index.html#!login";
    } else if (userType === "Staff") {

        window.location.href = "index.html#!403";

    } else if (userType === "Client" || userType === "Admin") {

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        // Botão de submit é clicável
        $scope.disableSubmit = "";

        // Quando clica no botão de submit
        $scope.submitTicket = function () {

            // Verificar se o formulário está incorretamente preeenchido
            if ($scope.assunto === "" || $scope.assunto === undefined || $scope.comentario === "" || $scope.comentario === undefined) {

                // Mostra alerta de que os dados foram preenchidos sem sucesso
                bootbox.alert({
                    message: "Mensagem enviada sem sucesso. Dados incorretamente preenchidos!",
                    backdrop: true,
                    buttons: {
                        ok: {
                            label: "OK!",
                            className: 'btn-warning'
                        }
                    }
                });

                // Se o formulário estiver preenchido corretamente
            } else {

                // Disable do botão de submit para evitar enviar o mesmo ticket várias vezes
                $scope.disableSubmit = "y";

                // Dados do formulário
                let clientId = myId;
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

                        let message = $scope.comentario;
                        let supportTicketId = response.data.id;
                        let from = "Client";

                        let dataSend = { message, from, supportTicketId };

                        // Pede à API para adicionar uma resposta ao ticket criado
                        addAnswerToTicket($http, supportTicketId, dataSend, (response) => {

                            // Se a API respondeu da forma correta
                            if (response) {

                                // Mostra mensagem de sucesso
                                bootbox.alert({
                                    message: "Mensagem enviada com sucesso",
                                    backdrop: true,
                                    buttons: {
                                        ok: {
                                            label: "OK!",
                                            className: 'btn-success'
                                        }
                                    }
                                });

                                 // Se ticket for enviado com sucesso, 
                                // é redireionado para o ticket criado em 2 segundos
                                setTimeout(function () {
                                    window.location.href = "#!ticket/" + supportTicketId;
                                }, 2000);

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



                       

                        // Se a API não respondeu da forma correta
                    } else {

                        // Mostra mensagem de insucesso
                        bootbox.alert({
                            message: "Mensagem enviada sem sucesso",
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