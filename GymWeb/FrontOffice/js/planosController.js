import { getPlanosTreino, getexerciseById, getexercises, createPlan, getPlanosTreinoById, changePlan, deletePlan } from './pedidos.js'

// Controller da  página planos de treino
app.controller('planosCtrl', function ($scope, $http) {


    // Ocultar planos no topo da página
    $scope.novo_plano_sucesso = "y";
    $scope.novo_plano_sem_sucesso = "y";
    $scope.novo_plano_sem_sucesso_dados = "y";

    // Array que vai conter os planos
    let plans = [];


    // CRIAR PLANO

    $scope.create = function () {
        // Tipo de ação a executar quando clicar em submit
        $scope.type = "create";
    }

    // Lista de exercicios existentes
    let exercises = [];

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

                    $scope.plan.supervisingTrainerId = 1;

                    // Se for para criar um plano
                    if ($scope.type === "create") {

                        // Criar um novo plano
                        createPlan($http, $scope.plan, (response) => {

                            if (response) {

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

                                for (let i = 0; i < $scope.plan.exerciseBlocks.length; i++) {
                                    getexerciseById($http, $scope.plan.exerciseBlocks[i].exerciseId, (response2) => {
                                        if (response2) {
                                            $scope.plan.exerciseBlocks[i].exercise = response2.data;
                                        } else {

                                        }

                                        // Coloca os dados do modal vazios
                                        $scope.plan = {};

                                    });
                                }
                                plans.push($scope.plan)

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

            for (let i = 0; i < response.data.exerciseBlocks.length; i++) {

                getexerciseById($http, response.data.exerciseBlocks[i].exerciseId, (response2) => {
                    response.data.exerciseBlocks[i].exercise = response2.data;
                    $scope.plan = response.data;
                });

            }

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

        } else {

        }

    });


});