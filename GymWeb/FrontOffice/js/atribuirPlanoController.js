import { getAllClients, getPlanosTreinoById, getPlanosTreino, changeClientPlan } from './pedidos.js'
import { checkLogin } from './myutil.js'

// Controller da página de atribuir planos
app.controller('atribuirPlanoCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;
    
    if (!login) {
        window.location.href = "index.html#!login";
    } else if(userType === "Client"){

        window.location.href = "index.html#!403";

    }else if(userType === "Staff" || userType==="Admin"){

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        let listClients = [];

        // Obter lista de todos os clients
        getAllClients($http, (response) => {

            if (response) {

                // Guardar os clientes num array
                for (let i = 0; i < response.data.length; i++) {
                    listClients.push(response.data[i]);

                    if (listClients[i].trainingPlanId != null) {
                        // Obter o plano atual deste cliente
                        getPlanosTreinoById($http, listClients[i].trainingPlanId, (plan) => {

                            if (plan) {

                                listClients[i].trainingPlan = plan.data;

                            } else {

                            }
                        });
                    }
                }
            } else {

            }

            // Atualiza a vista do utilizador
            $scope.clients = listClients;

        });

        // Obtem todos os planos existentes
        getPlanosTreino($http, (planos) => {

            if (planos) {
                // Atualiza a vista de utilizador
                $scope.plans = planos.data;
            } else {

            }
        });

        // Quando alterar o item selected, altera o plano do utilizador
        $scope.changePlan = function (clientId, planId) {

            for (let i = 0; i < listClients.length; i++) {

                if (listClients[i].id === clientId) {

                    listClients[i].trainingPlanId = planId;

                    // Objeto a enviar no body do pedido
                    let obj = {planId: planId};

                    changeClientPlan($http, listClients[i].id, obj, (response) => {

                        if (response) {
                            bootbox.alert({
                                message: "Plano alterado com sucesso!",
                                backdrop: true,
                                buttons: {
                                    ok: {
                                        label: "OK!",
                                        className: 'btn-success'
                                    }
                                }
                            });
                        } else {
                            bootbox.alert({
                                message: "Plano alterado sem sucesso!",
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
    }
});