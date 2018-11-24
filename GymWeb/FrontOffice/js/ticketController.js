app.controller('ticketCtrl',  function($scope, $http ,$routeParams) {
    
    // Obter id do ticket
    let id = $routeParams.id;
    
    $http({

        method : "GET",
        url : "https://localhost:5001/api/tickets/" + id

    }).then(function mySuccess(response) {

        console.log(response.data)

        let clientFName = response.data.client.firstName;
        let clientLName = response.data.client.lastName;

        if (clientFName === undefined || clientFName === null){
            clientFName = "";
        }

        if (clientLName === undefined || clientLName === null){
            clientLName = "";
        }

        let clientName = clientFName + " " + clientLName;
        let message = response.data.message;

        let ticket = {clientName, message};

        $scope.ticket = ticket;


    }, function myError(response) {

    });
    
  });