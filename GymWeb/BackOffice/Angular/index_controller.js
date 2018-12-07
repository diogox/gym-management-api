import { setCookie, getCookie, deletCookie } from './cookies.js'
app.controller("indexCtrl", function ($scope, $rootScope) {

    //Verifica se o admin está logged se não estiver redireciona para a página de Login (Comentário no "if statement" para testar na api sem auth)
    if (getCookie("admin") == "") {
        window.location.href = "#!login";
    }

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');

    $scope.$on('show-window', function (event, arg) {

        let emitter = event.name;

        if (emitter === "show-window") {
            if (arg === "false") {
                $scope.hideMenus = "y";
                try {
                    document.getElementById("content").classList.remove("col-10");
                    document.getElementById("content").classList.add("col-12");
                } catch (e) {

                }
            } else {
                $scope.hideMenus = "";
                try{
                    document.getElementById("content").classList.remove("col-10");
                    document.getElementById("content").classList.add("col-12"); 
                } catch (e) {

                }
            }
        }
    });


    //LogOut
    $scope.logout = function () {
        deletCookie("admin");
        window.location.href = "#!login";
    }


});