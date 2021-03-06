import { getexercises, getEquipmentById, getexerciseById, getEquipments, changeExercise, createExercise, deleteExercise } from '../js/pedidos.js';
import { checkLogin, paginationSplitInChuncks, paginationOnDocumentReady, paginationSetPage } from '../js/myutil.js'

// Controller da página de exercicios
app.controller('exerciciosCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    if (!login) {
        window.location.href = "index.html#!login";
    } else {

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        let listaExercicios = [];

        // Lista de exercicios divididas em chuncks
        let exerciciosChuncks = [];

        // Quantidade de elementos por chunck
        let elementsPerChunck = 5;

        // Página atual da lista de exercicios
        let currentPage = 0;

        // Obtem lista de equipamentos e atualiza a vista para um select em editar e criar novo
        getEquipments($http, (response) => {
            $scope.equipmentList = response.data;
        });

        // Pede os exercícios existentes à API
        getexercises($http, (response) => {

            // Se a API respondeu da forma correta
            if (response) {

                // Tamanho do array de exercicios
                let size = response.data.length;


                // Percorre o array de exercicios
                for (let i = 0; i < size; i++) {

                    if (response.data[i].equipmentId != null) {
                        // Pede um exercicio especifico à API
                        getEquipmentById($http, response.data[i].equipmentId, (response2) => {

                            // Se a API respondeu da forma correta
                            if (response2) {

                                response.data[i].equipment = response2.data;

                                // Se a API não respondeu da forma correta
                            } else {

                                response.data[i].equipment = {};

                            }
                        });
                    } else {
                        response.data[i].equipment = {};
                    }
                }

                listaExercicios = response.data;

                // Atribui o array de exercicios para atualizar a vista
                $scope.exercicios = listaExercicios;


                atualizarPaginas();


                // Se a API não respondeu da forma correta
            } else {
            }

        });

        // Quando clica no numero de uma página
        $scope.setPage = function (page) {

            // currentPage recebe a página selecionada
            currentPage = page;

            // Atualiza a vista com os exercicios dessa página
            $scope.exercicios = exerciciosChuncks[page];

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationSetPage(exerciciosChuncks, page);

        }

        // Se clicar no botão de página anterior, vai buscar a página atual a decrementa um
        $scope.previousPage = function () {
            $scope.setPage(currentPage - 1);
        }

        // Se clicar no botão de próxima página, vai buscar a página atual a incrementa um
        $scope.nextPage = function () {
            $scope.setPage(currentPage + 1);
        }

        // Função que executa quando clica em editar exercicio ou eliminar exercicio,
        // coloca as informações do exercicio numa variavel que é utilizado posteriormente
        // para preencher o modal(em caso de edição) ou para conseguir eliminar do array (em caso de
        // de remoção)
        $scope.edit = function (id) {

            // Obtem o exercicio
            getexerciseById($http, id, (response) => {

                if (response.data.equipmentId != null) {
                    // Obtem o equipamento associado ao exercicio
                    getEquipmentById($http, response.data.equipmentId, (response2) => {

                        response.data.equipmentName = response2.data.name;

                    });
                }

                // Atualiza a vista
                $scope.editExercise = response.data;


            });

            // Tipo de ação a executar quando clicar em submit
            $scope.type = "edit";

        }

        // Quando clica no botão de criar novo exercicio
        $scope.create = function () {

            // Elimina as informações que existam armazenadas temporariamente 
            // para efeitos de edição ou remoção, caso contrário o modal
            // seria preenchido com essas informações
            $scope.editExercise = {};

            // Tipo de ação a executar quando clicar em submit
            $scope.type = "create";

        }

        // Quando clica em submeter um exercicio novo ou editado
        $scope.submitExercise = function () {

            bootbox.confirm({
                message: "Você pretende adicionar/editar este exercício?",
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
                    let dataSend = $scope.editExercise;

                    if (dataSend.equipmentId === undefined) {
                        dataSend.equipmentId = null;
                    }

                    // Caso seja uma ação de editar um exercicio
                    if ($scope.type === "edit") {

                        // Efetua o pedido de alterar um exercicio
                        changeExercise($http, $scope.editExercise.id, $scope.editExercise, (result) => {
                            if (result) {

                                // Procura no array o exercicio para o alterar na vista de forma dinamica
                                for (let i = 0; i < listaExercicios.length; i++) {

                                    if (listaExercicios[i].id == $scope.editExercise.id) {

                                        if ($scope.editExercise.equipmentId != null) {
                                            // Vai buscar o objeto do equipmento associado a este exercicio
                                            getEquipmentById($http, $scope.editExercise.equipmentId, (response2) => {

                                                if (response2) {
                                                    $scope.editExercise.equipment = response2.data;
                                                }

                                            });
                                        }

                                        listaExercicios[i] = $scope.editExercise;

                                        // Obter qual o chunck que se localiza o exercicio editado
                                        let chunckNumber = Math.floor(i / elementsPerChunck);

                                        // Dentro do chunck obter a posição onde se localiza o exercicio editado
                                        let chunckPosition = i % elementsPerChunck;

                                        // Alterar o exercicio dentro da lista de chuncks
                                        exerciciosChuncks[chunckNumber][chunckPosition] = $scope.editExercise;
                                    }
                                }

                                bootbox.alert({
                                    message: "Exercício editado com sucesso!",
                                    backdrop: true,
                                    buttons: {
                                        ok: {
                                            label: "OK!",
                                            className: 'btn-success'
                                        }
                                    }
                                });

                                // Simula um click no botão de fechar o modal
                                document.getElementById("closeExerciseModal").click();

                            } else {
                                bootbox.alert({
                                    message: "Exercicio editado sem sucesso!",
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

                        // Caso seja uma ação de criar um exercicio
                    } else {
                        createExercise($http, dataSend, (result) => {

                            if (result) {
                                // Coloca o id do exercicio criado no objeto do exercicio
                                $scope.editExercise.id = result.data.id;

                                if ($scope.editExercise.equipmentId != null) {
                                    // Vai buscar o objeto do equipmento associado a este exercicio
                                    getEquipmentById($http, $scope.editExercise.equipmentId, (response2) => {

                                        if (response2) {
                                            $scope.editExercise.equipment = response2.data;
                                        }

                                    });
                                }

                                listaExercicios.push($scope.editExercise);

                                atualizarPaginas();

                                bootbox.alert({
                                    message: "Exercício criado com sucesso!",
                                    backdrop: true,
                                    buttons: {
                                        ok: {
                                            label: "OK!",
                                            className: 'btn-success'
                                        }
                                    }
                                });

                                // Simula um click no botão de fechar o modal
                                document.getElementById("closeExerciseModal").click();
                            } else {
                                bootbox.alert({
                                    message: "Exercicio criado sem sucesso!",
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

        // Quando o utilizador clica em eliminar o exercicio
        $scope.delete = function (id) {

            bootbox.confirm({
                message: "Você pretende remover este exercício? Não pode voltar atrás!",
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
                        deleteExercise($http, id, (result) => {

                            if (result) {

                                bootbox.alert({
                                    message: "Exercício apagado!",
                                    backdrop: true,
                                    buttons: {
                                        ok: {
                                            label: "OK!",
                                            className: 'btn-success'
                                        }
                                    }
                                });

                                // Procura o exercicio na lista de forma a remover da lista de forma dinamica
                                for (let i = 0; i < listaExercicios.length; i++) {

                                    if (listaExercicios[i].id == $scope.editExercise.id) {
                                        listaExercicios.splice(i, 1);

                                        atualizarPaginas();


                                    }
                                }
                            } else {
                                bootbox.alert({
                                    message: "Oops... O exercício não foi apagado!",
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

        /**
         * Atualizar a paginação, separar em chuncks e criar as páginas
         */
        function atualizarPaginas() {

            // Divide o array de exercicios em chuncks e retorna um 
            // objeto representativo de cada página(nº de chuncks)
            let pagination = paginationSplitInChuncks(listaExercicios, elementsPerChunck);

            // Define o array de chuncks
            exerciciosChuncks = pagination.arrayChuncks;

            // Lista com tantos elementos quanto o numero de chuncks
            $scope.numberPages = pagination.numberOfPages;

            // Atualiza a vista
            $scope.exercicios = exerciciosChuncks[0];

            // Quando a página estiver pronta, coloca a pagina 0 como selecionada
            // e coloca a pagina anterior como disabled
            $(document).ready(function () {

                // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
                paginationOnDocumentReady(exerciciosChuncks);

            });

        }

    }

});