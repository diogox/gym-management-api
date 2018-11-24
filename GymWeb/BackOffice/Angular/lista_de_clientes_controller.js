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

//lista_de_clientes
app.controller("clientesCtrl", function ($scope, $http) {
    //Listar todos os Clientes
    $http({
        method: "GET",
        url: "https://localhost:5001/api/clients/"
    }).then(function mySuccess(response) {
        //console.log(response.data);

        //Formata a BirthDate dos Clientes para yyyy-mm-dd
        for(let i=0;i<response.data.length;i++){
            response.data[i].birthDate = formatDate(response.data[i].birthDate);  
            //console.log(response.data[i].birthDate);
       }

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
            
            //Dá close no Modal from
            $('#removercliente').modal('toggle');

        }, function myError(response) {
            console.log("Erro ao remover Cliente");

            //Dá close no Modal from
            $('#removercliente').modal('toggle');


            //Gestão de Erros
            //Validações
        });
    };

    //Abre um popup para colocar nova informação do Cliente
    $scope.edCliente = function (id) {
        $scope.idclienteedit = id;
    }

    //Abre um popup para confirmar a remoção do Cliente
    $scope.removeClient = function (id){
        $scope.idclienteremove = id;
    }



});





