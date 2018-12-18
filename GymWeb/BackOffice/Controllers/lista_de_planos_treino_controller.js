import { getStaff, getPlanosTreino, addPlanoTreino, removePlanoTreino, editarPlanoTreino, getPlanoTreinoByID, getStaffByID } from './pedidos.js'
import { getCookie } from './cookies.js'
import { paginationSplitInChunks, paginationOnDocumentReady, paginationSetPage } from './pagination.js'


//Controller para a Lista de Planos de Treinos
app.controller("planosTreinoCtrl", function ($scope, $http, $rootScope) {

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
        //Erro ao Carregar a Tabela de Planos de Treino Index:0
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Planos de Treino!', style: $scope.redAlert, show: false },
        //Erro ao Carregar Funcionários Index:1
        { type: 'Error', msg: 'Erro ao Carregar Funcionários!', style: $scope.redAlert, show: false },
        //Erro ao Carregar Treinador Index:2
        { type: 'Error', msg: 'Erro ao Carregar Treinador!', style: $scope.redAlert, show: false },
        //Adicionou Plano com Sucesso Index:3
        { type: 'Success', msg: 'Adicionou Plano com Sucesso!', style: $scope.greenAlert, show: false },
        //Erro ao Adicionar Plano Index:4
        { type: 'Error', msg: 'Erro ao Adicionar Plano!', style: $scope.redAlert, show: false },
        //Erro ao Editar Plano Index:5
        { type: 'Error', msg: 'Erro ao Editar Plano!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar Plano Index:6
        { type: 'Sucesso', msg: 'Sucesso ao Editar Plano!', style: $scope.greenAlert, show: false },
        //Erro ao Remover Plano Index:7
        { type: 'Erro', msg: 'Erro ao Remover Plano pois este já foi atribuido!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Lista de Planos de Treinos
    //Executa a função para pedir os dados à API
    let token = getCookie('admin');
    getPlanosTreino($http, token, (response) => {
        if (response) {


            pt = response.data;

            //Atualiza a Lista de Planos de Treino
            //$scope.pTreino = response.data;

            atualizarPagina();

        } else {
            $scope.alerts[0].show = true;
        }
    });


    //Remover um Plano de Treino da BD
    //Executa a função para pedir os dados à API
    $scope.rmPlano = function (id) {
        let token = getCookie("admin");
        removePlanoTreino($http, id, token, (response) => {
            if (response) {

                pt = $.grep(pt, function (e) {
                    return e.id != id;
                });

                atualizarPagina();

                //Dá close no Modal from
                $('#removerPlanoT').modal('toggle');

            } else {
                $scope.alerts[7].show = true;

                //Dá close no Modal from
                $('#removerPlanoT').modal('toggle');
            }
        });
    }


    //Adicionar um Plano de Treino à BD
    $scope.submitADD = function () {

        let novoPlano = $scope.pt;

        novoPlano.exerciseBlocks = null;
        let token = getCookie("admin");
        getStaffByID($http, novoPlano.supervisingTrainerId, token, (response) => {
            if (response) {
                novoPlano.supervisingTrainer = response.data;
            } else {
                $scope.alerts[2].show = true;
            }
        });

        addPlanoTreino($http, novoPlano, token, (response) => {
            if (response) {
                let resposta = response.data;

                getPlanoTreinoByID($http, resposta.id, token, (response2) => {
                    if (response2) {
                        resposta.supervisingTrainer = response2.data.supervisingTrainer;
                    }
                });

                //Atualiza a lista sem dar refresh na pagina
                pt.push(resposta);
                atualizarPagina();

                //Dá reset e close no Modal form
                $('#addPT form :input').val("");
                $('#addPT').modal('toggle');
                $scope.alerts[3].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#addPT form :input').val("");
                $('#addPT').modal('toggle');
                $scope.alerts[4].show = true;
            }
        });
    }


    let oldPT;
    //Editar um Plano de Treino
    $scope.submitED = function () {

        //console.log(oldPT);
        //Copia as informações todas do oldPT para um novo Plano incluindo as informações inalteraveis
        let newPT = oldPT;

        //Atribui as novas informções ao newStaff
        newPT.name = $scope.editarpt.name;
        newPT.supervisingTrainerId = $scope.editarpt.supervisingTrainerId;
        //console.log(newPT);

        let token = getCookie("admin");
        editarPlanoTreino($http, newPT, $scope.idPTedit, token, (response) => {
            if (response) {

                getPlanoTreinoByID($http, $scope.idPTedit, token, (response2) => {
                    if (response2) {
                        for (let i = 0; i < $scope.pTreino.length; i++) {
                            if ($scope.pTreino[i].id == newPT.id) {
                                $scope.pTreino[i].supervisingTrainer = response2.data.supervisingTrainer;
                            }
                        }
                    }
                });

                $scope.editarpt = null;

                // Procura no array o Plano de Treino para o alterar na vista de forma dinamica
                for (let i = 0; i < pt.length; i++) {

                    if (pt[i].id == newPT.id) {
                        pt[i] = newPT;

                        // Obter qual o chunck que se localiza o Plano de Treino editado
                        let chunckNumber = Math.floor(i / elementsPerChunck);

                        // Dentro do chunck obter a posição onde se localiza o Plano de Treino editado
                        let chunckPosition = i % elementsPerChunck;

                        // Alterar o Plano de Treino dentro da lista de chuncks
                        ptChuncks[chunckNumber][chunckPosition] = newPT;

                    }
                }


                //Dá reset e close no Modal form
                $('#edPT form :input').val("");
                $('#edPT').modal('toggle');
                $scope.alerts[6].show = true;

            } else {

                //Dá reset e close no Modal form
                $('#edPT form :input').val("");
                $('#edPT').modal('toggle');
                $scope.alerts[5].show = true;
            }
        });
    }


    //Array com todos os Treinadores na BD
    let Treinadores = [];
    //Vai buscar todos os treinadores da lista de Staff e guarda na variável Treinadores
    $scope.loadT = function () {
        Treinadores = []
        getStaff($http, token, (response) => {
            if (response) {
                //Filtra o staff por treinadores e adiciona ao array Treinadores
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].rank == "Trainer") {
                        Treinadores.push(response.data[i]);
                    }
                }
                $scope.PTrainer = Treinadores;
            } else {
                $scope.alerts[1].show = true;
            }
        });
    }


    //Abre um popup para colocar nova informação do Exercicio
    $scope.ediPT = function (id) {
        $scope.loadT();
        $scope.PTrainer = Treinadores;
        $scope.idPTedit = id;
        oldPT = $scope.pTreino.find(x => x.id === $scope.idPTedit);
        $scope.editarpt = oldPT;
    }

    //Abre um popup para confirmar a remoção do Plano de Treino
    $scope.removePlanoT = function (id) {
        $scope.idplanoTremove = id;
    }

    //Vai para a página do Plano de Treino 
    $scope.getthisPlano = function (plano) {
        //console.log(ticket.id);
        window.location.href = '#!plano/' + plano.id;
    };


    //###########################################Pagination###################################


    // Array que vai conter os Planos de Treino
    let pt = [];


    // Lista de Planos de Treino divididos em chuncks
    let ptChuncks = [];


    // Quantidade de Planos de Treino por chunck
    let elementsPerChunck = 5;


    // Página atual da lista de Planos de Treino
    let currentPage = 0;


    //Função que atualiza as páginas
    function atualizarPagina() {

        let pagination = paginationSplitInChunks(pt, elementsPerChunck);

        ptChuncks = pagination.arrayChuncks

        //Lista de Paginação com os numeros de Páginas
        $scope.numberPages = pagination.numberOfPages;

        //Atualiza a vista
        $scope.pTreino = ptChuncks[0];

        $(document).ready(function () {

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationOnDocumentReady(ptChuncks);

        });
    }


    //Função que é ativada quando um número da paginação é carregado
    $scope.setPage = function (page) {

        // currentPage recebe a página selecionada
        currentPage = page;

        // Atualiza a vista com os Planos de Treino dessa página
        $scope.pTreino = ptChuncks[page];

        // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
        paginationSetPage(ptChuncks, page);

    }


    //Função que é ativada quando o botão previous é carregado
    $scope.previousPage = function () {
        if (currentPage > 0) {
            $scope.setPage(currentPage - 1);
        }
    }


    //Função que é ativada quando o botão next é carregado
    $scope.nextPage = function () {
        if (currentPage + 1 < ptChuncks.length) {
            $scope.setPage(currentPage + 1);
        }
    }

});