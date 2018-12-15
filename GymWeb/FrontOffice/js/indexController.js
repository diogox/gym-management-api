import { checkLogin, logout } from './myutil.js'
import { getAllClients, getPlanosTreinoById, getPlanosTreino, changeClientPlan, getClient, getStaff } from './pedidos.js'

// Controller do index
app.controller('indexCtrl', function ($scope, $http) {

    let login = checkLogin();
    if (!login) {
        window.location.href = "index.html#!login";
    }

    // Obtem o id do utilizador que fez login
    let myId = login.userTypeId;

    // Faz update das notificações se fizer refresh à página e se for cliente
    if (login.userType == "Client") {
        updateNotifications();
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
        updateImage();


    });

    //Quando clica em logout
    $scope.logoutBtn = function () {
        logout();
    }

    // Função que faz update do numero de notificações mostrado no item do menu
    function updateNotifications() {
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

    // Atualiza a imagem quando faz refresh ao browser
    updateImage();

    /**
     * Atualiza a imagem que é apresentado no menu lateral
     */
    function updateImage() {

        login = checkLogin();
        myId = login.userTypeId;
        let userType = login.userType;

        // Se for cliente, vai procurar pelo cliente com o id
        if (userType === "Client") {

            getClient($http, myId, (result) => {

                if (result) {

                    $scope.clientImage = result.data.imageUrl;

                }

            });

        // Se for staff, vai procurar pelo staff com o id
        } else if (userType === "Staff") {

            getStaff($http, myId, (result) => {

                if (result) {

                    $scope.clientImage = result.data.imageUrl;

                }

            });

        }else if (userType === "Admin") {
            $scope.clientImage = "https://cdn3.iconfinder.com/data/icons/gray-user-toolbar/512/oficcial-512.png";
        }else{
            $scope.clientImage = "";
        }

    }

    function removeClassByPrefix(el, prefix) {
        var regx = new RegExp('\\b' + prefix + '.*?\\b', 'g');
        el.className = el.className.replace(regx, '');
        return el;
    }

    /**
     * Resize tamanho do menu lateral e do conteudo conforme o tamanho da janela
     */
    $(window).resize(function () {
        let width = $(window).width();

        if (width < 600) {

            let menu = document.getElementById("menu");
            let content = document.getElementById("content");

            removeClassByPrefix(menu, "col");
            menu.classList.add("col-12");

            removeClassByPrefix(content, "col");
            content.classList.add("col-12");

        } else if (width < 800) {

            let menu = document.getElementById("menu");
            let content = document.getElementById("content");

            removeClassByPrefix(menu, "col");
            menu.classList.add("col-4");

            removeClassByPrefix(content, "col");
            content.classList.add("col-8");

        } else if (width < 1100) {

            let menu = document.getElementById("menu");
            let content = document.getElementById("content");

            removeClassByPrefix(menu, "col");
            menu.classList.add("col-3");

            removeClassByPrefix(content, "col");
            content.classList.add("col-9");

        } else {

            let menu = document.getElementById("menu");
            let content = document.getElementById("content");

            removeClassByPrefix(menu, "col");
            menu.classList.add("col-2");

            removeClassByPrefix(content, "col");
            content.classList.add("col-10");

        }


    });

});