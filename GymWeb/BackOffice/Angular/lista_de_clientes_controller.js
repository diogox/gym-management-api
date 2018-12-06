import { getClients, removeClient, adicionarClient, editarClient } from './pedidos.js'

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
app.controller("clientesCtrl", function ($scope, $http) {

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
    getClients($http, (response) => {
        if (response) {

            //Formata a BirthDate dos Clientes para yyyy-mm-dd
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].birthDate = formatDate(response.data[i].birthDate);
                //console.log(response.data[i].birthDate);
            }

            //Atualiza a Lista de Clientes
            $scope.Clientes = response.data;
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
        let data = JSON.stringify(user);

        adicionarClient($http, data, (response) => {
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

        editarClient($http, newClient, $scope.idclienteedit, (response) => {
            if (response) {
                $scope.eduser = null;

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

        removeClient($http, id, (response) => {
            if (response) {

                $scope.Clientes = $.grep($scope.Clientes, function (e) {
                    return e.id != id;
                });

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
    }

    //Abre um popup para confirmar a remoção do Cliente
    $scope.removeClient = function (id) {
        $scope.idclienteremove = id;
    }


});





