import { getAllClients } from '../js/pedidos.js'
import { checkLogin } from '../js/myutil.js'
import { newCalendarChart, newHistogtramChart, newLineChart, newLineClientChart } from '../js/reports.js'

// Controller do notificacoes
app.controller('relatoriosCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;

    if (!login) {

        window.location.href = "index.html#!login";

    } else {

        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        if (userType === "Staff" || userType === "Admin") {

            newCalendarChart($http);

            newHistogtramChart($http);

            newLineChart($http);


        }else if(userType === "Client") {
            newLineClientChart($http, myId);
        }
    }

});
