app.controller('suporteCtrl', function($scope, $http) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/tickets"

    }).then(function mySuccess(response) {

        let tickets = [];

        for(let i=0; i<response.data.length; i++) {

            let ticketId = response.data[i].id;
            let message = response.data[i].message;
            
            let openedAt = response.data[i].openedAt;
            let year = openedAt.substring(0,4);
            let month = openedAt.substring(5,7);
            let day = openedAt.substring(8,10);
            let hour = openedAt.substring(11,13);
            let minute = openedAt.substring(14,16);
            openedAt = day + "-" + month + "-" + year + " " + hour + ":" + minute;

            let state = response.data[i].state;

            let lastMessageDate = response.data[i].messages[response.data[i].messages.length-1].at;
            let yearLast = lastMessageDate.substring(0,4);
            let monthLast = lastMessageDate.substring(5,7);
            let dayLast = lastMessageDate.substring(8,10);
            let hourLast = lastMessageDate.substring(11,13);
            let minuteLast = lastMessageDate.substring(14,16);
            lastMessageDate = day + "-" + month + "-" + year + " " + hour + ":" + minute;

            let ticket = {ticketId, message, openedAt, state, lastMessageDate};

            tickets.push(ticket);

        }

        $scope.tickets = tickets;

    }, function myError(response) {

    });

});