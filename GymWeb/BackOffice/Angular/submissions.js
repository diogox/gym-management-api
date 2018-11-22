

//CLIENTE
//Controller que recolhe a informação do Form Client e envia para a API
app.controller("adicionarCliente", function ($scope, $http) {
    $scope.submit = function () {
        let data = JSON.stringify($scope.user);
        //console.log(data);
        $http({
            method: "POST",
            data: data,
            url: "https://localhost:5001/api/clients/",
            headers: {
                'content-type': "application/json"
            }
        }).then(function mySuccess(response) {
            console.log("Cliente adicionado com sucesso!");
            $scope.Clientes = $scope.Clientes.push(response.data);
        }, function myError(response) {
            console.log("Erro ao adicionar Cliente!");
        });

    };
});

//Controller que recolhe a informação do Form Client e envia para a API para editar o Cliente
app.controller("editarCliente", function ($scope, $http) {
    $scope.edsubmit = function () {
        /*Aviso: Como a notificação e o CheckIn ainda não foram implementados não dá para passar 
        esses atributos.*/
        let oldClient = $scope.Clientes.find(x => x.id === $scope.idclienteedit);
        //console.log(oldClient);
        let newClient = oldClient;
            newClient.id = $scope.idclienteedit;
            newClient.firstName = $scope.user.firstName;
            newClient.lastName  = $scope.user.lastName;
            newClient.age = $scope.user.age;
            newClient.birthDate = $scope.user.birthDate;
            newClient.nif = $scope.user.nif;
            newClient.heightInMeters = $scope.user.heightInMeters;
            newClient.weightInKg = $scope.user.weightInKg;
            newClient.imageUrl = $scope.user.imageUrl;
        //console.log(newClient);
        $http({
            method: "PUT",
            data: newClient,
            url: "https://localhost:5001/api/clients/"+$scope.idclienteedit,
            headers: {
                'content-type': "application/json"
            }
        }).then(function mySuccess(response) {
            console.log("Cliente editado com sucesso!");
        }, function myError(response) {
            console.log("Erro ao adicionar Cliente!");
        });
    };
});













//FUNCIONÁRIOS


//Equipamentos


//Tickets