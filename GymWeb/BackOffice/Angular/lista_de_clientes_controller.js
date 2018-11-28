import { getClients, removeClient } from './pedidos.js'

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

//Controller da Gestão dos Clientes
app.controller("clientesCtrl", function ($scope, $http) {

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
            console.log("Falha ao Carregar a Tabela!");
            $scope.firstName = "Falha ao Carregar a Tabela!"

            //Gestão de Erros
            //Validações
        }
    });

    //Remove o cliente da Base de Dados
    $scope.rmCliente = function (id) {
        //console.log($scope.Clientes);
        //console.log(id);

        removeClient($http, id, (response) => {
            if (response) {

                console.log("Removido com Sucesso!");
                $scope.Clientes = $.grep($scope.Clientes, function (e) {
                    return e.id != id;
                });

                //Dá close no Modal from
                $('#removercliente').modal('toggle');

            } else {

                console.log("Erro ao remover Cliente");
                //Dá close no Modal from
                $('#removercliente').modal('toggle');

                //Gestão de Erros
                //Validações

            }
        });
    };

    
    //Abre um popup para colocar nova informação do Cliente
    $scope.edCliente = function (id) {
        $scope.idclienteedit = id;
    }

    //Abre um popup para confirmar a remoção do Cliente
    $scope.removeClient = function (id) {
        $scope.idclienteremove = id;
    }
});





