import { getEquipment, removeEquipment, adicionarEquipment, editarEquipment } from './pedidos.js'
import { getCookie } from './cookies.js'
import { paginationSplitInChunks, paginationOnDocumentReady, paginationSetPage } from './pagination.js'

//Lista de Equipamentos
app.controller("EqCtrl", function ($scope, $http, $rootScope) {

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
        //Erro ao Adicionar um Equipamento Index:0
        { type: 'Error', msg: 'Erro ao Adicionar o Equipamento!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar um Equipamento Index:1
        { type: 'Success', msg: 'Equipamento Adicionado com Sucesso!', style: $scope.greenAlert, show: false },
        //Sucesso ao Editar um Equipamento Index:2
        { type: 'Success', msg: 'Equipamento Editado com Sucesso!', style: $scope.greenAlert, show: false },
        //Erro ao Editar um Equipamento Index:3
        { type: 'Error', msg: 'Erro ao Editar o Equipamento!', style: $scope.redAlert, show: false },
        //Erro ao Carregar a Tabela de Equipamentos Index:4
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Equipamentos!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Listar todos os Equipamentos
    //Executa a função para pedir os dados à API
    let token = getCookie('admin');
    getEquipment($http, token, (response) => {
        if (response) {
            //console.log(response.data);

            eq = response.data;
            atualizarPagina();

        } else {
            $scope.alerts[4].show = true;
        }
    });


    //Adicionar Equipamento
    $scope.submitADD = function () {

        let data = JSON.stringify($scope.eq);
        //console.log(data);
        let token = getCookie('admin');
        adicionarEquipment($http, data, token, (response) => {
            if (response) {
                let resposta = response.data;

                //Atualiza a lista sem dar refresh na pagina
                eq.push(resposta);
                atualizarPagina();

                //Dá reset e close no Modal form
                $('#addEq form :input').val("");
                $('#addEq').modal('toggle');
                $scope.alerts[1].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#addEq form :input').val("");
                $('#addEq').modal('toggle');
                $scope.alerts[0].show = true;
            }
        });
    };


    //Antigo Equipamento
    let oldEq;
    //Editar Equipamento
    $scope.edsubmit = function () {

        //console.log(oldEq);
        //Copia as informações todas do oldEq para um novo Equipamento incluindo as informações inalteraveis
        let newEq = oldEq;

        //Atribui as novas informções ao newEq
        newEq.id = $scope.idEqedit;
        newEq.name = $scope.edeq.name;
        newEq.brandName = $scope.edeq.brandName;
        newEq.quantity = $scope.edeq.quantity;
        newEq.priceInEuro = $scope.edeq.priceInEuro;
        newEq.supplierName = $scope.edeq.supplierName;
        newEq.description = $scope.edeq.description;
        newEq.imageUrl = $scope.edeq.imageUrl;
        //console.log(newEq);

        let token = getCookie('admin');
        editarEquipment($http, newEq, $scope.idEqedit, token, (response) => {
            if (response) {
                $scope.edeq = null;

                // Procura no array o Equipamento para o alterar na vista de forma dinamica
                for (let i = 0; i < eq.length; i++) {

                    if (eq[i].id == newEq.id) {
                        eq[i] = newEq;

                        // Obter qual o chunck que se localiza o Equipamento editado
                        let chunckNumber = Math.floor(i / elementsPerChunck);

                        // Dentro do chunck obter a posição onde se localiza o Equipamento editado
                        let chunckPosition = i % elementsPerChunck;

                        // Alterar o Equipamento dentro da lista de chuncks
                        eqChuncks[chunckNumber][chunckPosition] = newEq;

                    }
                }

                //Dá reset e close no Modal form
                $('#editarEq form :input').val("");
                $('#editarEq').modal('toggle');
                $scope.alerts[2].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#editarEq form :input').val("");
                $('#editarEq').modal('toggle');
                $scope.alerts[3].show = true;
            }
        });
    };


    //Remove o Equipamento da Base de Dados
    $scope.rmEq = function (id) {
        //console.log($scope.equipamentos);
        //console.log(id);

        let token = getCookie('admin');
        removeEquipment($http, id, token, (response) => {
            if (response) {

                //console.log("Removido com Sucesso!");
                eq = $.grep(eq, function (e) {
                    return e.id != id;
                });

                atualizarPagina();
                //Dá close no Modal from
                $('#removerEq').modal('toggle');
            } else {
                //Dá close no Modal from
                $('#removerEq').modal('toggle');
            }
        });
    }


    //Abre um popup para colocar nova informação do Equipamento
    $scope.edEq = function (id) {
        $scope.idEqedit = id;
        oldEq = $scope.equipamentos.find(x => x.id === $scope.idEqedit);
        $scope.edeq = oldEq;
    }

    //Abre um popup para confirmar a remoção do Equipamento
    $scope.removeEq = function (id) {
        $scope.idEqremove = id;
    }

    //###########################################Pagination###################################


    // Array que vai conter os Equipamentos
    let eq = [];


    // Lista de Equipamentos divididos em chuncks
    let eqChuncks = [];


    // Quantidade de Equipamentos por chunck
    let elementsPerChunck = 5;


    // Página atual da lista de Equipamentos
    let currentPage = 0;


    //Função que atualiza as páginas
    function atualizarPagina() {

        let pagination = paginationSplitInChunks(eq, elementsPerChunck);

        eqChuncks = pagination.arrayChuncks

        //Lista de Paginação com os numeros de Páginas
        $scope.numberPages = pagination.numberOfPages;

        //Atualiza a vista
        $scope.equipamentos = eqChuncks[0];

        $(document).ready(function () {

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationOnDocumentReady(eqChuncks);

        });
    }


    //Função que é ativada quando um número da paginação é carregado
    $scope.setPage = function (page) {

        // currentPage recebe a página selecionada
        currentPage = page;

        // Atualiza a vista com os clientes dessa página
        $scope.equipamentos = eqChuncks[page];

        // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
        paginationSetPage(eqChuncks, page);

    }


    //Função que é ativada quando o botão previous é carregado
    $scope.previousPage = function () {
        if (currentPage > 0) {
            $scope.setPage(currentPage - 1);
        }
    }


    //Função que é ativada quando o botão next é carregado
    $scope.nextPage = function () {
        if (currentPage + 1 < eqChuncks.length) {
            $scope.setPage(currentPage + 1);
        }
    }

});