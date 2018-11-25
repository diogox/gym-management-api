//Lista de Equipamentos
app.controller("EqCtrl", function ($scope, $http) {
    //Listar todos os Equipamentos
    $http({
        method: "GET",
        url: "https://localhost:5001/api/equipment"
    }).then(function mySuccess(response) {
        //console.log(response.data);

        $scope.equipamentos = response.data;

    }, function myError(response) {
        console.log("Falha ao Carregar a Tabela!");
        $scope.firstName = "Falha ao Carregar a Tabela!"

        //Gestão de Erros
        //Validações
    });


    //Remove o Equipamento da Base de Dados
    $scope.rmEq = function (id) {
        //console.log($scope.equipamentos);
        //console.log(id);
        $http({
            method: "DELETE",
            url: "https://localhost:5001/api/equipment/" + id
        }).then(function mySuccess() {
            console.log("Removido com Sucesso!");
            $scope.equipamentos = $.grep($scope.equipamentos, function (e) {
                return e.id != id;
            });

            //Dá close no Modal from
            $('#removerEq').modal('toggle');

        }, function myError(response) {
            console.log("Erro ao remover Funcionário");

            //Dá close no Modal from
            $('#removerEq').modal('toggle');

            //Gestão de Erros
            //Validações
        });
    }


    //Abre um popup para colocar nova informação do Equipamento
    $scope.edEq = function (id) {
        $scope.idEqedit = id;
    }

    //Abre um popup para confirmar a remoção do Equipamento
    $scope.removeEq = function (id) {
        $scope.idEqremove = id;
    }


});