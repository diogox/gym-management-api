import { getClients, removeClient, adicionarClient, editarClient } from './pedidos.js'
import { getCookie } from './cookies.js'
import { paginationSplitInChunks, paginationOnDocumentReady, paginationSetPage } from './pagination.js'

//Format date to yyyy-mm-dd
function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//Age Function - Calcula a idade do user através da sua dob
function getAge(DOB) {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
}

//Controller da Gestão dos Clientes
app.controller("clientesCtrl", function ($scope, $http, $rootScope) {

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
        //Erro ao Adicionar um Cliente Index:0
        { type: 'Error', msg: 'Erro ao Adicionar o Cliente!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar um Cliente Index:1
        { type: 'Success', msg: 'Cliente Adicionado com Sucesso!', style: $scope.greenAlert, show: false },
        //Sucesso ao Editar um Cliente Index:2
        { type: 'Success', msg: 'Cliente Editado com Sucesso!', style: $scope.greenAlert, show: false },
        //Erro ao Editar um Cliente Index:3
        { type: 'Error', msg: 'Erro ao Editar o Cliente!', style: $scope.redAlert, show: false },
        //Erro ao Carregar a Tabela de Clientes Index:4
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Clientes!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Listar todos os Clientes
    //Executa a função para pedir os dados à API
    let token = getCookie('admin');
    getClients($http, token, (response) => {
        if (response) {

            //Formata a BirthDate dos Clientes para yyyy-mm-dd
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].birthDate = formatDate(response.data[i].birthDate);
                //console.log(response.data[i].birthDate);
            }

            Clientes = response.data;

            //Atualiza a Lista de Clientes
            // $scope.Clientes = response.data;

            atualizarPagina();

        } else {
            $scope.alerts[4].show = true;
        }
    });


    //Adicionar Cliente á Base de Dados
    $scope.submitADD = function () {
        //Formata a dob do user
        let date = new Date($scope.user.birthDate);
        let user = $scope.user;
        //Calcula a idade do user através da sua dob
        user.age = getAge(date);

        user.confirmPassword = null;
        let data = JSON.stringify(user);
        //console.log("Cliente"+data);

        let token = getCookie("admin");
        adicionarClient($http, data, token, (response) => {
            if (response) {
                let resposta = response.data;

                //Formata a birthdate do cliente para yyyy-mm-dd
                resposta.birthDate = formatDate(resposta.birthDate);

                //Atualiza a lista sem dar refresh na pagina
                let list = $scope.Clientes;
                list.push(resposta);
                $scope.Clientes = list

                //Dá reset e close no Modal form
                $('#addClient form :input').val("");
                $('#addClient').modal('toggle');
                $scope.alerts[1].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#addClient form :input').val("");
                $('#addClient').modal('toggle');
                $scope.alerts[0].show = true;
            }
        });
    };


    //Antigo Cliente
    let oldClient;
    //Editar Cliente
    $scope.edsubmit = function () {
        //Copia as informações todas do oldClient para um novo Cliente incluindo as informações inalteraveis (Pkanos de treino, etc)

        let newClient = oldClient;

        //Atribui as novas informções ao newClient
        newClient.id = $scope.idclienteedit;
        newClient.firstName = $scope.eduser.firstName;
        newClient.lastName = $scope.eduser.lastName;
        newClient.birthDate = formatDate($scope.eduser.birthDate);

        //Formata a dob do user
        let date = new Date(newClient.birthDate);
        //Calcula a idade do user através da sua dob
        newClient.age = getAge(date);

        newClient.nif = $scope.eduser.nif;
        newClient.heightInMeters = $scope.eduser.heightInMeters;
        newClient.weightInKg = $scope.eduser.weightInKg;
        newClient.imageUrl = $scope.eduser.imageUrl;

        let token = getCookie("admin");
        editarClient($http, newClient, $scope.idclienteedit, token, (response) => {
            if (response) {
                $scope.eduser = null;

                // Procura no array o Cliente para o alterar na vista de forma dinamica
                for (let i = 0; i < Clientes.length; i++) {

                    if (Clientes[i].id == newClient.id) {
                        Clientes[i] = newClient;

                        // Obter qual o chunck que se localiza o Cliente editado
                        let chunckNumber = Math.floor(i / elementsPerChunck);

                        // Dentro do chunck obter a posição onde se localiza o Cliente editado
                        let chunckPosition = i % elementsPerChunck;

                        // Alterar o Cliente dentro da lista de chuncks
                        clientesChuncks[chunckNumber][chunckPosition] = newClient;

                    }
                }


                //Dá reset e close no Modal form
                $('#editarClient form :input').val("");
                $('#editarClient').modal('toggle');
                $scope.alerts[2].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#editarClient form :input').val("");
                $('#editarClient').modal('toggle');
                $scope.alerts[3].show = true;
            }
        })
    };


    //Remove o cliente da Base de Dados
    $scope.rmCliente = function (id) {
        //console.log($scope.Clientes);
        //console.log(id);

        let token = getCookie("admin");
        removeClient($http, id, token, (response) => {
            if (response) {

                Clientes = $.grep(Clientes, function (e) {
                    return e.id != id;
                });

                atualizarPagina();

                //Dá close no Modal from
                $('#removercliente').modal('toggle');

            } else {

                //Dá close no Modal from
                $('#removercliente').modal('toggle');
            }
        });
    };


    //Abre um popup para colocar nova informação do Cliente
    $scope.edCliente = function (id) {
        $scope.idclienteedit = id;
        oldClient = $scope.Clientes.find(x => x.id === $scope.idclienteedit);
        $scope.eduser = oldClient;
        // $scope.eduser.birthDate = new Date(oldClient.birthDate);
    }

    //Abre um popup para confirmar a remoção do Cliente
    $scope.removeClient = function (id) {
        $scope.idclienteremove = id;
    }


    //###########################################Pagination###################################


    // Array que vai conter os Clientes
    let Clientes = [];


    // Lista de Clientes divididos em chuncks
    let clientesChuncks = [];


    // Quantidade de equipamentos por chunck
    let elementsPerChunck = 6;


    // Página atual da lista de Clientes
    let currentPage = 0;


    //Função que atualiza as páginas
    function atualizarPagina() {

        let pagination = paginationSplitInChunks(Clientes, elementsPerChunck);

        clientesChuncks = pagination.arrayChuncks

        //Lista de Paginação com os numeros de Páginas
        $scope.numberPages = pagination.numberOfPages;

        //Atualiza a vista
        $scope.Clientes = clientesChuncks[0];

        $(document).ready(function () {

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationOnDocumentReady(clientesChuncks);

        });
    }


    //Função que é ativada quando um número da paginação é carregado
    $scope.setPage = function (page) {

        // currentPage recebe a página selecionada
        currentPage = page;

        // Atualiza a vista com os clientes dessa página
        $scope.Clientes = clientesChuncks[page];

        // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
        paginationSetPage(clientesChuncks, page);

    }


    //Função que é ativada quando o botão previous é carregado
    $scope.previousPage = function () {
        if (currentPage > 0) {
            $scope.setPage(currentPage - 1);
        }
    }


    //Função que é ativada quando o botão next é carregado
    $scope.nextPage = function () {
        if (currentPage + 1 < clientesChuncks.length) {
            $scope.setPage(currentPage + 1);
        }
    }














});





