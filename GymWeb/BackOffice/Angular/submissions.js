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

//CLIENTE
//Controller que recolhe a informação do Form Client e envia para a API
app.controller("adicionarCliente", function ($scope, $http) {
    $scope.submit = function () {
        //Formata a dob do user
        let date = new Date($scope.user.birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        let user = $scope.user;
        //Calcula a idade do user através da sua dob
        user.age = getAge(date);
        let data = JSON.stringify(user);
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
            let resposta = response.data;
            let list = $scope.Clientes;
            list.push(resposta);
            $scope.Clientes = list
            $('#addClient form :input').val("");
        }, function myError(response) {
            console.log("Erro ao adicionar Cliente!");

            //Gestão de Erros
            //Validações
        });

    };
});

//Controller que recolhe a informação do Form EdClient copia para um novo cliente e envia para a API para assim editar o Cliente
app.controller("editarCliente", function ($scope, $http) {
    $scope.edsubmit = function () {
        /*Aviso: Como a notificação e o CheckIn ainda não foram implementados não dá para passar 
        esses atributos.*/
        let oldClient = $scope.Clientes.find(x => x.id === $scope.idclienteedit);
        //Formata a dob do user
        let date = new Date(oldClient.birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

        //console.log(oldClient);
        let newClient = oldClient;
            newClient.id = $scope.idclienteedit;
            newClient.firstName = $scope.user.firstName;
            newClient.lastName = $scope.user.lastName;
            newClient.age = getAge(date); //Calcula a idade do user através da sua dob
            newClient.birthDate = $scope.user.birthDate;
            newClient.nif = $scope.user.nif;
            newClient.heightInMeters = $scope.user.heightInMeters;
            newClient.weightInKg = $scope.user.weightInKg;
            newClient.imageUrl = $scope.user.imageUrl;
        //console.log(newClient);
        $http({
            method: "PUT",
            data: newClient,
            url: "https://localhost:5001/api/clients/" + $scope.idclienteedit,
            headers: {
                'content-type': "application/json"
            }
        }).then(function mySuccess(response) {
            console.log("Cliente editado com sucesso!");
            $('#editarClient form :input').val("");
            $('#editarClient').modal('toggle');
        }, function myError(response) {
            console.log("Erro ao adicionar Cliente!");

            //Gestão de Erros
            //Validações
        });
    };
});























//FUNCIONÁRIOS


//Equipamentos


//Tickets