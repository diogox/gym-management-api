import { getTickets } from "./pedidos.js";
import { checkLogin } from './myutil.js'

// Controller da página de suporte
app.controller('suporteCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;
    
    if (!login) {
        window.location.href = "index.html#!login";
    } else if(userType !== "Client"){

        window.location.href = "index.html#!403";

    }else {

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        // Pede os tickets à API
        getTickets($http, myId, (response) => {

            // Se a API respondeu da forma correta
            if (response) {

                // Array que vai conter todos os ticket do cliente
                let tickets = [];

                // Percorre cada um dos tickets
                for (let i = 0; i < response.data.length; i++) {

                    // Reorganiza o formato da data
                    let openedAt = response.data[i].openedAt;
                    let year = openedAt.substring(0, 4);
                    let month = openedAt.substring(5, 7);
                    let day = openedAt.substring(8, 10);
                    let hour = openedAt.substring(11, 13);
                    let minute = openedAt.substring(14, 16);
                    openedAt = day + "-" + month + "-" + year + " " + hour + ":" + minute;

                    // Reorganiza a data e hora num formato mais legível
                    response.data[i].openedAt = openedAt;

                }

                // Atualiza os tickets para atualizar a vista
                $scope.tickets = response.data;

                // Se a API não respondeu da forma correta
            } else {
            }
        });
    }
});