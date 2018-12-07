import { login } from './pedidos.js'
import { setCookie, getCookie } from './cookies.js'

app.controller("loginCtrl", function ($scope, $http, $rootScope) {

    if (getCookie("admin") != "") {
        window.location.href = "#!";
    }

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'false');

    //Estilo do Alerta de Erro
    $scope.redAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "red"
    }

    //Alertas
    $scope.alerts = [
        //Erro ao realizar o Login Index:0
        { type: 'Error', msg: 'Erro no Login!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Login
    $scope.login = function () {
        let data = JSON.stringify($scope.admin);
        login($http, data, (response) => {
            if (response) {
                setCookie($scope.admin.username, response.data.token, response.data.expiration);
                window.location.reload();
            } else {
                $scope.alerts[0].show = true;
            }
        });

    }
});
