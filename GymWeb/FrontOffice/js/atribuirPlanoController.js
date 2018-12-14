import { getAllClients, getPlanosTreinoById, getPlanosTreino, changeClientPlan } from './pedidos.js'
import { checkLogin, paginationSplitInChuncks, paginationOnDocumentReady, paginationSetPage } from './myutil.js'

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

        // Lista de equipamentos divididas em chuncks
        let clientsChuncks = [];

        // Quantidade de equipamentos por chunck
        let elementsPerChunck = 5;

        // Página atual da lista de equipamentos
        let currentPage = 0;

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

            atualizarPaginas();

        });

        // Quando clica no numero de uma página
        $scope.setPage = function (page) {

            // currentPage recebe a página selecionada
            currentPage = page;

            // Atualiza a vista com os equipamentos dessa página
            $scope.clients = clientsChuncks[page];

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationSetPage(clientsChuncks, page);

        }

        // Se clicar no botão de página anterior, vai buscar a página atual a decrementa um
        $scope.previousPage = function () {
            $scope.setPage(currentPage - 1);
        }

        // Se clicar no botão de próxima página, vai buscar a página atual a incrementa um
        $scope.nextPage = function () {
            $scope.setPage(currentPage + 1);
        }

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
                    
                     // Obter qual o chunck que se localiza o exercicio editado
                     let chunckNumber = Math.floor(i / elementsPerChunck);

                     // Dentro do chunck obter a posição onde se localiza o exercicio editado
                     let chunckPosition = i % elementsPerChunck;

                     // Alterar o plano de treino do cliente
                     getPlanosTreinoById($http, listClients[i].trainingPlanId, (plan) => {

                        if (plan) {

                            listClients[i].trainingPlan = plan.data;

                            clientsChuncks[chunckNumber][chunckPosition].trainingPlan = plan.data;

                        } else {

                        }
                    });
                 
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

        /**
         * Atualizar a paginação, separar em chuncks e criar as páginas
         */
        function atualizarPaginas() {

            // Divide o array de exercicios em chuncks e retorna um 
            // objeto representativo de cada página(nº de chuncks)
            let pagination = paginationSplitInChuncks(listClients, elementsPerChunck);

            // Define o array de chuncks
            clientsChuncks = pagination.arrayChuncks;

            // Lista com tantos elementos quanto o numero de chuncks
            $scope.numberPages = pagination.numberOfPages;

            // Atualiza a vista
            $scope.clients = clientsChuncks[0];

            // Quando a página estiver pronta, coloca a pagina 0 como selecionada
            // e coloca a pagina anterior como disabled
            $(document).ready(function () {

                // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
                paginationOnDocumentReady(clientsChuncks);

            });

        }

    }
});