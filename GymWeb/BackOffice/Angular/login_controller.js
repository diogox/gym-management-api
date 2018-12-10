import { login } from './pedidos.js'
import { setCookie, getCookie, deletCookie } from './cookies.js'

app.controller("loginCtrl", function ($scope, $http, $rootScope) {

    if (getCookie("admin") != "" || getCookie("usertype") == "Admin") {
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
        { type: 'Error', msg: 'Erro no Login!',sugs: 'Username não existe ou Password errada!', style: $scope.redAlert, show: false },
        { type: 'Error', msg: 'User sem permissões!',sugs: '', style: $scope.redAlert, show: false },
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
                //Verificar se é o admin que está a fazer log
                if(response.data.userType == "Admin"){
                    //Token Cookie
                    setCookie($scope.admin.username, response.data.token, response.data.expiration);
                    //UserType Cookie
                    setCookie("usertype", response.data.userType, response.data.expiration);
                    window.location.reload();
                }else{
                    $scope.alerts[1].show = true;    
                }
            } else {
                $scope.alerts[0].show = true;
            }
        });

    }
});
