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
        $scope.firstName = "Error: Table Failed to Load!"
    });


    //Remove o cliente da Base de Dados
    $scope.rmCliente = function (id) {
        console.log($scope.Clientes);
        console.log(id);
        $http({
            method: "DELETE",
            url: "https://localhost:5001/api/clients/"+id
        }).then(function mySuccess() {
            console.log("Removido com Sucesso!");
            $scope.Clientes = $.grep($scope.Clientes, function(e){ 
                return e.id != id; 
           });
        }, function myError(response) {
            console.log("Erro ao remover Cliente");
        });
    };


    //Abre um popup para colocar nova informação do Cliente
    $scope.edCliente = function (id) {
        $scope.idclienteedit = id;
    }

});





