import { getClient, checkin } from './pedidos.js';
import { checkLogin } from './myutil.js'

// Controller da  página home
app.controller('homeCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;

    // Se não tem login efetuado
    if (!login) {
        // Redireciona para a página de login
        window.location.href = "index.html#!login";

    // Se tem login efetuado
    } else if(userType === "Staff"){

        window.location.href = "index.html#!403";

    }else if(userType === "Client" || userType==="Admin"){
        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        // Função que atualiza na pagina home as entradas no ginásio
        function atualizaEntradas() {

            // Pede os dados do cliente à API
            getClient($http, myId, (response) => {

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

        // Atualiza entradas ao entrar na página 
        atualizaEntradas();

        // Evento quando clica no botão de check-in
        $scope.checkin = function () {

            // Faz pedido de check-in à API
            checkin($http, myId, (response) => {

                // Se a API responder da forma correta
                if (response) {
                    // Em caso de sucesso, mostra um alerta a indicar que o check-in foi bem sucedido
                    bootbox.alert({
                        message: " Check-in com sucesso!",
                        backdrop: true,
                        buttons: {
                            ok: {
                                label: "OK!",
                                className: 'btn-success'
                            }
                        }
                    });

                    // Atualiza as entradas que são mostras quando fizer check-in
                    atualizaEntradas();

                    // Se a API não responder da forma correta
                } else {

                    // Em caso de inssucesso, mostra um alerta a indicar que o check-in não foi bem sucedido
                    bootbox.alert({
                        message: "Check-in sem sucesso. Verifique a sua situação com o responsável!",
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

});