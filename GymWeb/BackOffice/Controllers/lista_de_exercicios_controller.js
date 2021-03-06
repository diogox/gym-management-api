import { getExercises, getEquipmentByID, addExercises, getEquipment, removeExercise, editarExercise } from './pedidos.js'
import { getCookie } from './cookies.js'
import { paginationSplitInChunks, paginationOnDocumentReady, paginationSetPage } from './pagination.js'



//Controller da Gestão dos Exercicios
app.controller("exercisesCtrl", function ($scope, $http, $rootScope) {

    //Verifica se o admin está logged se não estiver redireciona para a página de Login (Comentário no "if statement" para testar na api sem auth)
    if (getCookie("admin") == "" || getCookie("usertype") != "Admin") {
        window.location.href = "#!login";
    }

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');


    //Estilo do Alerta de Erro
    $scope.redAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "red"
    }

    //Estilo do Alerta de Sucesso
    $scope.greenAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "green"
    }


    //Alertas
    $scope.alerts = [
        //Erro ao Adicionar um Exercicio Index:0
        { type: 'Error', msg: 'Erro ao Adicionar o Exercicio!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar um Exercicio Index:1
        { type: 'Success', msg: 'Exercicio Adicionado com Sucesso!', style: $scope.greenAlert, show: false },
        //Sucesso ao Editar um Exercicio Index:2
        { type: 'Success', msg: 'Exercicio Editado com Sucesso!', style: $scope.greenAlert, show: false },
        //Erro ao Editar um Exercicio Index:3
        { type: 'Error', msg: 'Erro ao Editar o Exercicio!', style: $scope.redAlert, show: false },
        //Erro ao Carregar a Tabela de Exercicios Index:4
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Exercicios!', style: $scope.redAlert, show: false },
        //Erro ao Carregar os Equipamentos
        { type: 'Error', msg: 'Erro ao Carregar os Equipamentos!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }


    //Dificuldade do Exercicio
    $scope.exDif = ["Easy", "Intermediate", "Hard"];
    $scope.exMus = ["Chest", "Back", "Arms", "Legs", "Abs", "Shoulders"];

    //Equipamentos disponíveis para o exercicio
    $scope.loadEq = function () {
        getEquipment($http, token, (response) => {
            if (response) {
                $scope.exEq = response.data;
            } else {
                $scope.alerts[5].show = true;
            }
        });
    };


    //Listar todos os Exercicios
    //Executa a função para pedir os dados à API
    let token = getCookie('admin');
    getExercises($http, token, (response) => {
        if (response) {
            //console.log(response.data);
            //A cada exercicio recebido é feito um pedido á apí pelo nome do equipamento que este necessita para ser realizado
            for (let i = 0; i < response.data.length; i++) {

                //Verifica se o id do equipamento utilizado é ou não null pois há exercicios que não precisam de equipamento para serem realizados
                if (response.data[i].equipmentId != null) {
                    //Vai buscar o equipamento
                    getEquipmentByID($http, response.data[i].equipmentId, token, (response1) => {
                        if (response1) {
                            response.data[i].equipmentId = response1.data.name;
                        } else {
                            $scope.alerts[4].show = true;
                            response.data[i].equipmentId = "Nome não carregado!"
                        }
                    });
                } else {
                    response.data[i].equipmentId = "Não necessita"
                }
            }

            ex = response.data;

            atualizarPagina();

        } else {
            $scope.alerts[4].show = true;
        }
    });


    //Adicionar um Exercicio
    $scope.submitADD = function () {
        let exercise = $scope.ex;

        //Verifica se o Valor do equipamento é none
        if ($scope.ex.equipmentId == "") {
            exercise.equipmentId = null;
        }

        let data = JSON.stringify(exercise);

        //console.log(data);
        let token = getCookie('admin');
        addExercises($http, data, token, (response) => {
            if (response) {

                //Substitui o id pelo nome do equipamento logo depois de adicionar o exercicio
                for (let i = 0; i < $scope.exEq.length; i++) {
                    if (response.data.equipmentId != null) {
                        if ($scope.exEq[i].id == response.data.equipmentId) {
                            response.data.equipmentId = $scope.exEq[i].name;
                        }
                    } else {
                        response.data.equipmentId = "Não necessita"
                    }
                }

                let resposta = response.data;

                //Atualiza a lista sem dar refresh na pagina
                ex.push(resposta);
                atualizarPagina();

                //Dá reset e close no Modal form
                $('#addEx form :input').val("");
                $('#addEx').modal('toggle');
                $scope.alerts[1].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#addEx form :input').val("");
                $('#addEx').modal('toggle');
                $scope.alerts[0].show = true;
                $scope.alerts[0].show = true;
            }
        });
    };


    //Remover Exercicio
    $scope.rmEx = function (id) {

        let token = getCookie("admin");
        removeExercise($http, id, token, (response) => {
            if (response) {

                //console.log("Removido com Sucesso!");
                ex = $.grep(ex, function (e) {
                    return e.id != id;
                });

                atualizarPagina();

                //Dá close no Modal from
                $('#removerEx').modal('toggle');


            } else {
                console.log("Erro ao Remover Exercicio!")

                //Dá close no Modal from
                $('#removerEx').modal('toggle');
            }
        });
    }

    //Antigo Exercicio
    let oldEx;
    //Editar um Exercicio
    $scope.exsubmit = function () {

        //console.log(oldEx);
        //Copia as informações todas do oldEx para um novo exercicio incluindo as informações inalteraveis
        let newEx = oldEx;

        //Atribui as novas informções ao newStaff
        newEx.id = $scope.idExedit;
        newEx.name = $scope.edex.name;
        newEx.targetMuscleGroup = $scope.edex.targetMuscleGroup;
        newEx.difficultyLevel = $scope.edex.difficultyLevel;
        newEx.equipmentId = $scope.edex.equipmentId;
        newEx.description = $scope.edex.description;
        newEx.imageUrl = $scope.edex.imageUrl;
        //console.log(newEx);

        let token = getCookie("admin");
        editarExercise($http, newEx, $scope.idExedit, token, (response) => {
            if (response) {

                $scope.edex = null;

                // Procura no array o Exercicio para o alterar na vista de forma dinamica
                for (let i = 0; i < ex.length; i++) {

                    if (ex[i].id == newEx.id) {
                        ex[i] = newEx;

                        // Obter qual o chunck que se localiza o Exercicio editado
                        let chunckNumber = Math.floor(i / elementsPerChunck);

                        // Dentro do chunck obter a posição onde se localiza o Exercicio editado
                        let chunckPosition = i % elementsPerChunck;

                        // Alterar o Exercicio dentro da lista de chuncks
                        exChuncks[chunckNumber][chunckPosition] = newEx;

                    }
                }

                //Dá reset e close no Modal form
                $('#editarEx form :input').val("");
                $('#editarEx').modal('toggle');
                $scope.alerts[2].show = true;

            } else {

                //Dá reset e close no Modal form
                $('#editarEx form :input').val("");
                $('#editarEx').modal('toggle');
                $scope.alerts[3].show = true;
            }
        });
    };

    //Abre um popup para colocar nova informação do Exercicio
    $scope.edEx = function (id) {
        $scope.idExedit = id;
        oldEx = $scope.exercicios.find(x => x.id === $scope.idExedit);
        $scope.edex = oldEx;
        $scope.edex.equipmentId = "";
        let token = getCookie("admin");
        getEquipment($http, token, (response) => {
            if (response) {
                $scope.edexEq = response.data;
            } else {
                $scope.alerts[5].show = true;
            }
        });
        //console.log($scope.idExedit);
    }

    //Abre um popup para confirmar a remoção do Equipamento
    $scope.removeEx = function (id) {
        $scope.idExremove = id;
        //console.log($scope.idExremove);
    }

    //###########################################Pagination###################################


    // Array que vai conter os Exercicios
    let ex = [];


    // Lista de Exercicios divididos em chuncks
    let exChuncks = [];


    // Quantidade de Exercicios por chunck
    let elementsPerChunck = 5;


    // Página atual da lista de Exercicios
    let currentPage = 0;


    //Função que atualiza as páginas
    function atualizarPagina() {

        let pagination = paginationSplitInChunks(ex, elementsPerChunck);

        exChuncks = pagination.arrayChuncks

        //Lista de Paginação com os numeros de Páginas
        $scope.numberPages = pagination.numberOfPages;

        //Atualiza a vista
        $scope.exercicios = exChuncks[0];

        $(document).ready(function () {

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationOnDocumentReady(exChuncks);

        });
    }


    //Função que é ativada quando um número da paginação é carregado
    $scope.setPage = function (page) {

        // currentPage recebe a página selecionada
        currentPage = page;

        // Atualiza a vista com os exercicios dessa página
        $scope.exercicios = exChuncks[page];

        // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
        paginationSetPage(exChuncks, page);

    }


    //Função que é ativada quando o botão previous é carregado
    $scope.previousPage = function () {
        if (currentPage > 0) {
            $scope.setPage(currentPage - 1);
        }
    }


    //Função que é ativada quando o botão next é carregado
    $scope.nextPage = function () {
        if (currentPage + 1 < exChuncks.length) {
            $scope.setPage(currentPage + 1);
        }
    }

});