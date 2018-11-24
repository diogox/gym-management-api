app.controller('suporteCtrl', function($scope, $http) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/tickets"

    }).then(function mySuccess(response) {

        let tickets = [];

        for(let i=0; i<response.data.length; i++) {

            let ticketId = response.data[i].id;
            let message = response.data[i].message;
            
            let ticket = {ticketId, message};

            tickets.push(ticket);

        }

        $scope.tickets = tickets;

    }, function myError(response) {

    });

});