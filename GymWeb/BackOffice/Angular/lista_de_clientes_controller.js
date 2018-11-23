//lista_de_clientes
app.controller("clientesCtrl", function ($scope, $http) {
    //Listar todos os Clientes
    $http({
        method: "GET",
        url: "https://localhost:5001/api/clients/"
    }).then(function mySuccess(response) {
        //console.log(response.data);
        $scope.Clientes = response.data;
    }, function myError(response) {
        console.log("Falha ao Carregar a Tabela!");
        $scope.firstName = "Falha ao Carregar a Tabela!"
        //Gestão de Erros
        //Validações
    });


    //Remove o cliente da Base de Dados
    $scope.rmCliente = function (id) {
        //console.log($scope.Clientes);
        //console.log(id);
        $http({
            method: "DELETE",
            url: "https://localhost:5001/api/clients/" + id
        }).then(function mySuccess() {
            console.log("Removido com Sucesso!");
            $scope.Clientes = $.grep($scope.Clientes, function (e) {
                return e.id != id;
            });
        }, function myError(response) {
            console.log("Erro ao remover Cliente");

            //Gestão de Erros
            //Validações
        });
    };

    //Abre um popup para colocar nova informação do Cliente
    $scope.edCliente = function (id) {
        $scope.idclienteedit = id;
    }

});





