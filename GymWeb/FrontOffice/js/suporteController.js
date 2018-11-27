import { getTickets } from "./pedidos.js";

// Controller da página de suporte
app.controller('suporteCtrl', function ($scope, $http) {

    // Pede os tickets à API
    getTickets($http, (response) => {

        // Se a API respondeu da forma correta
        if (response) {
            let tickets = [];

            for (let i = 0; i < response.data.length; i++) {

                let ticketId = response.data[i].id
                let title = response.data[i].title;
                let messages = response.data[i].messages;

                let openedAt = response.data[i].openedAt;
                let year = openedAt.substring(0, 4);
                let month = openedAt.substring(5, 7);
                let day = openedAt.substring(8, 10);
                let hour = openedAt.substring(11, 13);
                let minute = openedAt.substring(14, 16);
                openedAt = day + "-" + month + "-" + year + " " + hour + ":" + minute;

                let state = response.data[i].state;

                let ticket = { ticketId, title, openedAt, state };

                tickets.push(ticket);

            }

            $scope.tickets = tickets;

        // Se a API não respondeu da forma correta
        } else {

        }
    });

});