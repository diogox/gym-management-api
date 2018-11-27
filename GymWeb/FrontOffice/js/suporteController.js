import { getTickets } from "./pedidos.js";

// Controller da página de suporte
app.controller('suporteCtrl', function ($scope, $http) {

    // Pede os tickets à API
    getTickets($http, (response) => {

        // Se a API respondeu da forma correta
        if (response) {

            // Array que vai conter todos os ticket do cliente
            let tickets = [];

            // Percorre cada um dos tickets
            for (let i = 0; i < response.data.length; i++) {

                // Extrai os dados dos tickets
                let ticketId = response.data[i].id
                let title = response.data[i].title;
                let messages = response.data[i].messages;
                let state = response.data[i].state;

                // Reorganiza o formato da data
                let openedAt = response.data[i].openedAt;
                let year = openedAt.substring(0, 4);
                let month = openedAt.substring(5, 7);
                let day = openedAt.substring(8, 10);
                let hour = openedAt.substring(11, 13);
                let minute = openedAt.substring(14, 16);
                openedAt = day + "-" + month + "-" + year + " " + hour + ":" + minute;

                // Cria um objeto de ticket com a nova estrutura
                let ticket = { ticketId, title, openedAt, state };

                // Coloca o ticket no array de ticket
                tickets.push(ticket);

            }

            // Atualiza os tickets para atualizar a vista
            $scope.tickets = tickets;

            // Se a API não respondeu da forma correta
        } else {
            alert("Something went wrong");
        }
    });

});