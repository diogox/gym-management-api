import { checkLogin, logout} from './myutil.js'
import { getAllClients, getPlanosTreinoById, getPlanosTreino, changeClientPlan } from './pedidos.js'

// Controller do index
app.controller('indexCtrl', function ($scope, $http) {

    let login = checkLogin();
    if (!login) {
        window.location.href = "index.html#!login";
    }

    // Quando recebe um broadcast do tipo show-window, irá decidir que partes da página
    // irá mostrar e quais irá ocultar
    $scope.$on('show-window', function (event, arg) {

        // Obtem as cookies do login
        login = checkLogin();
        let emitter = event.name;

        // Se for para ocultar os menus
        if (arg === "false") {
            $scope.hideMenus = "y";
            document.getElementById("content").classList.remove("col-10");
            document.getElementById("content").classList.add("col-12");

            // Se for para mostrar os menus
        } else {
            $scope.hideMenus = "";
            document.getElementById("content").classList.remove("col-12");
            document.getElementById("content").classList.add("col-10");

            let type = login.userType;

            if (type === "Client") {

                $scope.hideClient = "";
                $scope.hideStaff = "y";
                $scope.hideBoth = "";

            } else if (type === "Staff") {

                $scope.hideClient = "y";
                $scope.hideStaff = "";
                $scope.hideBoth = "";

            } else if(type === "Admin") {
                $scope.hideClient = "";
                $scope.hideStaff = "";
                $scope.hideBoth = "";
            }

        }
    });

    //Quando clica em logout
    $scope.logoutBtn = function() {
        logout();
    }

});