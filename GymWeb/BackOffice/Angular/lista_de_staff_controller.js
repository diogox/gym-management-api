import { getStaff, removeStaff } from './pedidos.js'

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

//Lista de Staff
app.controller("staffCtrl", function ($scope, $http) {
    //Listar todos os Funcionários
    getStaff($http, (response) => {
        if (response) {
            //console.log(response.data);

            //Formata a BirthDate dos Funcionários para yyyy-mm-dd
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].birthDate = formatDate(response.data[i].birthDate);
                //console.log(response.data[i].birthDate);
            }

            $scope.funcionarios = response.data;
        } else {

            console.log("Falha ao Carregar a Tabela!");
            $scope.firstName = "Falha ao Carregar a Tabela!"

            //Gestão de Erros
            //Validações

        }
    });

    //Remove o Staff da Base de Dados
    $scope.rmStaff = function (id) {
        //console.log($scope.funcionarios);
        //console.log(id);

        removeStaff($http, id, (response) => {
            if (response) {

                console.log("Removido com Sucesso!");
                $scope.funcionarios = $.grep($scope.funcionarios, function (e) {
                    return e.id != id;
                });

                //Dá close no Modal from
                $('#removerfunc').modal('toggle');

            } else {

                console.log("Erro ao remover Funcionário");

                //Dá close no Modal from
                $('#removerfunc').modal('toggle');

                //Gestão de Erros
                //Validações

            }
        });
    }
    //Abre um popup para colocar nova informação do Funcionário
    $scope.edStaff = function (id) {
        $scope.idstaffedit = id;
    }

    //Abre um popup para confirmar a remoção do Funcionário
    $scope.removeFunc = function (id) {
        $scope.idfuncremove = id;
    }
});