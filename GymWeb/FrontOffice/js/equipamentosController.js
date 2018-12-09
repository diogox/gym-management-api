import { getEquipments, getEquipmentById, changeEquipment, createEquipment, deleteEquipment } from './pedidos.js'
import { checkLogin } from './myutil.js'

// Controller da página de equipamentos
app.controller('equipamentosCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    if(!login) {
        window.location.href = "index.html#!login";
    }

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');

    let listaEquipment = [];

    // Pede os equipamentos existentes à API
    getEquipments($http, (response) => {

        // Se a API respondeu da forma correta
        if (response) {

            listaEquipment = response.data;

            // Atribui o array de equipamentos para atualizar a vista
            $scope.equipamentos = response.data;

            // Se a API não respondeu da forma correta
        } else {
        }

    });

    // Função que executa quando clica em editar equipamento ou eliminar equipamento,
    // coloca as informações do equipamento numa variavel que é utilizado posteriormente
    // para preencher o modal(em caso de edição) ou para conseguir eliminar do array (em caso de
    // de remoção)
    $scope.edit = function (id) {

        // Obtem o equipamento
        getEquipmentById($http, id, (response) => {

            // Atualiza a vista
            $scope.editEquipment = response.data;
        });

        // Tipo de ação a executar quando clicar em submit
        $scope.type = "edit";

    }

    // Quando clica no botão de criar novo equipamento
    $scope.create = function () {

        // Elimina as informações que existam armazenadas temporariamente 
        // para efeitos de edição ou remoção, caso contrário o modal
        // seria preenchido com essas informações
        $scope.editEquipment = {};

        // Tipo de ação a executar quando clicar em submit
        $scope.type = "create";

    }

    // Quando clica em submeter um equipamento novo ou editado
    $scope.submitEquipment = function () {

        bootbox.confirm({
            message: "Você pretende adicionar/editar este equipamento?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (resultConfirm) {

                // Dados a enviar no body do pedido
                let dataSend = $scope.editEquipment;

                // Caso seja uma ação de editar um equipamento
                if ($scope.type === "edit") {

                    // Efetua o pedido de alterar um equipamento
                    changeEquipment($http, $scope.editEquipment.id, $scope.editEquipment, (result) => {
                        if (result) {

                            // Procura no array o equipamento para o alterar na vista de forma dinamica
                            for (let i = 0; i < listaEquipment.length; i++) {

                                if (listaEquipment[i].id == $scope.editEquipment.id) {
                                    listaEquipment[i] = $scope.editEquipment;
                                }
                            }

                            bootbox.alert({
                                message: "Equipamento editado com sucesso!",
                                backdrop: true,
                                buttons: {
                                    ok: {
                                        label: "OK!",
                                        className: 'btn-success'
                                    }
                                }
                            });

                            // Simula um click no botão de fechar o modal
                            document.getElementById("closeEquipmentModal").click();

                        } else {
                            bootbox.alert({
                                message: "Equipamento editado sem sucesso!",
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

                    // Caso seja uma ação de criar um equipamento
                } else {
                    createEquipment($http, dataSend, (result) => {

                        if (result) {
                            listaEquipment.push($scope.editEquipment)

                            bootbox.alert({
                                message: "Equipamento criado com sucesso!",
                                backdrop: true,
                                buttons: {
                                    ok: {
                                        label: "OK!",
                                        className: 'btn-success'
                                    }
                                }
                            });

                            // Simula um click no botão de fechar o modal
                            document.getElementById("closeEquipmentModal").click();
                        } else {
                            bootbox.alert({
                                message: "Equipamento criado sem sucesso!",
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

    // Quando o utilizador clica em eliminar o equipamento
    $scope.delete = function (id) {

        bootbox.confirm({
            message: "Você pretende remover este equipamento? Não pode voltar atrás!",
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
                    deleteEquipment($http, id, (result) => {

                        if (result) {

                            bootbox.alert({
                                message: "Equipamento apagado!",
                                backdrop: true,
                                buttons: {
                                    ok: {
                                        label: "OK!",
                                        className: 'btn-success'
                                    }
                                }
                            });

                            // Procura o equipamento na lista de forma a remover da lista de forma dinamica
                            for (let i = 0; i < listaEquipment.length; i++) {

                                if (listaEquipment[i].id == $scope.editEquipment.id) {
                                    listaEquipment.splice(i, 1);
                                }
                            }
                        } else {
                            bootbox.alert({
                                message: "Oops... O equipamento não foi apagado!",
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

});