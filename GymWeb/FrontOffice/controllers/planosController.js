import { getPlanosTreino, getexerciseById, getexercises, createPlan, getPlanosTreinoById, changePlan, deletePlan } from '../js/pedidos.js'
import { checkLogin, paginationSplitInChuncks, paginationOnDocumentReady, paginationSetPage } from '../js/myutil.js'

// Controller da  página planos de treino
app.controller('planosCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;

    if (!login) {
        window.location.href = "index.html#!login";
    } else if (userType === "Client") {

        window.location.href = "index.html#!403";

    } else if (userType === "Staff" || userType === "Admin") {

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        // Array que vai conter os planos
        let plans = [];

        // Lista de equipamentos divididas em chuncks
        let plansChuncks = [];

        // Quantidade de equipamentos por chunck
        let elementsPerChunck = 5;

        // Página atual da lista de equipamentos
        let currentPage = 0;

        // CRIAR PLANO

        $scope.create = function () {

            $scope.plan = {};
            // Tipo de ação a executar quando clicar em submit
            $scope.type = "create";
        }

        // Lista de exercicios existentes
        let exercises = [];

        $scope.removeExercise = function (index) {
            console.log($scope.plan.exerciseBlocks)
            $scope.plan.exerciseBlocks.splice(index, 1);
            console.log($scope.plan.exerciseBlocks)
        }

        // Obter lista de todos os exercicios
        getexercises($http, (response) => {
            if (response) {

                for (let i = 0; i < response.data.length; i++) {
                    let exerciseId = response.data[i].id;
                    let exerciseName = response.data[i].name;
                    let exercise = { exerciseId, exerciseName }
                    exercises.push(exercise)
                }

                $scope.exercisesList = exercises;

            } else {

            }
        });

        // Lista de exercises que estão no modal como sendo os exercicios do plano de treino
        $scope.newExercises = [];

        // Adicionar um novo exercicio ao plano a ser criado
        $scope.addRow = function () {

            // Se o plan tiver vazio, cria um novo
            if ($scope.plan === undefined) {
                $scope.plan = {}
            }

            // Se o exerciseBlocks tiver vazio cria um array vazio
            if ($scope.plan.exerciseBlocks === undefined) {
                $scope.plan.exerciseBlocks = [];
            }

            $scope.plan.exerciseBlocks.push({
            });

        }


        // Quando clica no botão de submeter plano
        $scope.submitPlan = function () {

            bootbox.confirm({
                message: "Você pretende adicionar/editar este plano?",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                },
                callback: function (resultConfirm) {

                    if (resultConfirm) {

                        $scope.plan.supervisingTrainerId = myId;

                        // Se for para criar um plano
                        if ($scope.type === "create") {

                            // Criar um novo plano
                            createPlan($http, $scope.plan, (response) => {

                                if (response) {

                                    $scope.plan.id = response.data.id;

                                    bootbox.alert({
                                        message: "Plano criado com sucesso!",
                                        backdrop: true,
                                        buttons: {
                                            ok: {
                                                label: "OK!",
                                                className: 'btn-success'
                                            }
                                        }
                                    });

                                    // Simula um click no botão de fechar o modal
                                    document.getElementById("closePlanModal").click();

                                    // Se adicionou exercicios ao plano de treino
                                    if ($scope.plan.exerciseBlocks) {


                                        for (let i = 0; i < $scope.plan.exerciseBlocks.length; i++) {

                                            getexerciseById($http, $scope.plan.exerciseBlocks[i].exerciseId, (response2) => {
                                                if (response2) {
                                                    $scope.plan.exerciseBlocks[i].exercise = response2.data;
                                                } else {

                                                }

                                            });

                                        }

                                    } else {

                                    }

                                    plans.push($scope.plan);

                                    atualizarPaginas();

                                } else {
                                    bootbox.alert({
                                        message: "Plano criado sem sucesso!",
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

                            // Se for para editar um plano
                        } else {

                            // Altera o plano de treino
                            changePlan($http, $scope.plan.id, $scope.plan, (result) => {

                                if (result) {

                                    bootbox.alert({
                                        message: "Plano editado com sucesso!",
                                        backdrop: true,
                                        buttons: {
                                            ok: {
                                                label: "OK!",
                                                className: 'btn-success'
                                            }
                                        }
                                    });

                                    for (let i = 0; i < plans.length; i++) {

                                        if (plans[i].id == $scope.plan.id) {

                                            plans[i] = $scope.plan;

                                            // Obter qual o chunck que se localiza o exercicio editado
                                            let chunckNumber = Math.floor(i / elementsPerChunck);

                                            // Dentro do chunck obter a posição onde se localiza o exercicio editado
                                            let chunckPosition = i % elementsPerChunck;

                                            // Alterar o exercicio dentro da lista de chuncks
                                            plansChuncks[chunckNumber][chunckPosition] = $scope.plan;


                                        }

                                    }

                                    // Simula um click no botão de fechar o modal
                                    document.getElementById("closePlanModal").click();

                                } else {

                                    bootbox.alert({
                                        message: "Plano editado sem sucesso!",
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

        }

        // ELIMINAR PLANOS

        $scope.delete = function (id) {

            bootbox.confirm({
                message: "Você pretende remover este plano? Não pode voltar atrás!",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                },
                callback: function (resultConfirm) {

                    if (resultConfirm) {
                        // Efetua o pedido de remoção
                        deletePlan($http, id, (result) => {

                            if (result) {

                                bootbox.alert({
                                    message: "Plano apagado!",
                                    backdrop: true,
                                    buttons: {
                                        ok: {
                                            label: "OK!",
                                            className: 'btn-success'
                                        }
                                    }
                                });

                                // Procura o plano na lista de forma a remover da lista de forma dinamica
                                for (let i = 0; i < plans.length; i++) {

                                    if (plans[i].id == $scope.plan.id) {
                                        plans.splice(i, 1);
                                        atualizarPaginas();
                                    }
                                }
                            } else {
                                bootbox.alert({
                                    message: "Oops... O plano não foi apagado!",
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

        }

        // EDITAR PLANOS

        $scope.edit = function (id) {
            // Obtem o plano
            getPlanosTreinoById($http, id, (response) => {

                // Se o exercicio tiver planos vai buscalos
                if (response.data.exerciseBlocks.length > 0) {
                    for (let i = 0; i < response.data.exerciseBlocks.length; i++) {

                        getexerciseById($http, response.data.exerciseBlocks[i].exerciseId, (response2) => {
                            response.data.exerciseBlocks[i].exercise = response2.data;

                        });

                    }

                }

                $scope.plan = response.data;

            });

            // Tipo de ação a executar quando clicar em submit
            $scope.type = "edit";
        }


        // LISTA DE PLANOS

        // Obtem uma lista de planos de treino
        getPlanosTreino($http, (response) => {

            // Se a API respondeu da forma correta
            if (response) {

                // Percorre todos os planos
                for (let i = 0; i < response.data.length; i++) {

                    // Lista de planos
                    let exercises = [];

                    // Percorre os exercicicios todos de cada plano
                    for (let j = 0; j < response.data[i].exerciseBlocks.length; j++) {

                        // Obtem as informações de cada exercicio
                        getexerciseById($http, response.data[i].exerciseBlocks[j].exerciseId, (response2) => {

                            // Adiciona o objeto deste exercicio ao bloco de exercicios
                            response.data[i].exerciseBlocks[j].exercise = response2.data

                        });

                    }

                    // Adiciona este plano à lista de planos
                    plans.push(response.data[i]);

                }

                // Atualiza a vista do utilizador
                $scope.plans = plans;

                atualizarPaginas();

            } else {

            }
        });

        // Quando clica no numero de uma página
        $scope.setPage = function (page) {

            // currentPage recebe a página selecionada
            currentPage = page;

            // Atualiza a vista com os equipamentos dessa página
            $scope.plans = plansChuncks[page];

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationSetPage(plansChuncks, page);

        }

        // Se clicar no botão de página anterior, vai buscar a página atual a decrementa um
        $scope.previousPage = function () {
            $scope.setPage(currentPage - 1);
        }

        // Se clicar no botão de próxima página, vai buscar a página atual a incrementa um
        $scope.nextPage = function () {
            $scope.setPage(currentPage + 1);
        }

        /**
         * Atualizar a paginação, separar em chuncks e criar as páginas
         */
        function atualizarPaginas() {

            // Divide o array de exercicios em chuncks e retorna um 
            // objeto representativo de cada página(nº de chuncks)
            let pagination = paginationSplitInChuncks(plans, elementsPerChunck);

            // Define o array de chuncks
            plansChuncks = pagination.arrayChuncks;

            // Lista com tantos elementos quanto o numero de chuncks
            $scope.numberPages = pagination.numberOfPages;

            // Atualiza a vista
            $scope.plans = plansChuncks[0];

            // Quando a página estiver pronta, coloca a pagina 0 como selecionada
            // e coloca a pagina anterior como disabled
            $(document).ready(function () {

                // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
                paginationOnDocumentReady(plansChuncks);

            });

        }


    }
});