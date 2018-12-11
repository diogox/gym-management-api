import { checkLogin, logout } from './myutil.js'
import { getAllClients, getPlanosTreinoById, getPlanosTreino, changeClientPlan, getClient } from './pedidos.js'

// Controller do index
app.controller('indexCtrl', function ($scope, $http) {

    let login = checkLogin();
    if (!login) {
        window.location.href = "index.html#!login";
    }

    // Obtem o id do utilizador que fez login
    let myId = login.userTypeId;
    
    // Faz update das notificações se fizer refresh à página
    updateNotifications();

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

            } else if (type === "Admin") {
                $scope.hideClient = "";
                $scope.hideStaff = "";
                $scope.hideBoth = "";
            }

        }
    });

    // Quando recebe uma mensgem para diminuir o numero associado ao item das notificações
    $scope.$on('decrease-notification', function (event, arg) {

        // Diminui o numero de notificações por ler
        $scope.numberNotifications--;
    });

    // Após efetuar login
    $scope.$on('after-login', function (event, arg) {
        
        updateNotifications();

    });

    //Quando clica em logout
    $scope.logoutBtn = function () {
        logout();
    }

    // Função que faz update do numero de notificações mostrado no item do menu
    function updateNotifications(){
        login = checkLogin();
        myId = login.userTypeId;

        getClient($http, myId, (result) => {

            if (result) {

                // Obtem para um array as notificações do cliente
                let notifications = result.data.notifications;
                let unRead = 0;

                // Percorre todas as notificações e incrementa o numero
                // de nao lidas sempre que encontra uma notificação por ler
                for (let i = 0; i < notifications.length; i++) {
                    if (notifications[i].isUnread) {
                        unRead += 1;
                    }
                }

                // Atualiza a vista
                $scope.numberNotifications = unRead;

            }

        });
    }

});