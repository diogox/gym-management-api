import { loginUser } from './pedidos.js'
import { checkLogin, newLogin } from './myutil.js'

// Controller do login
app.controller('loginCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    if (login) {
        window.location.href = "index.html#!";
    }
    
    // Indicar ao controler da página principal que o menu lateral deve ser oculto
    $rootScope.$broadcast('show-window', 'false');

    $scope.submitLogin = function() {

        loginUser($http, $scope.login, (response)=>{

            if(response){

                let expiration = response.data.expiration;
                let token = response.data.token;
                let userType = response.data.userType;
                let userTypeId = response.data.userTypeId;
                
                newLogin(userType, token, userTypeId, expiration, ()=>{

                    if(userType === "Client"){
                        window.location.href = "index.html#!";

                        // Comjunto de ações a serem executadas apos efetuar login
                        $rootScope.$broadcast("after-login", "true");
                    }else{
                        window.location.href = "index.html#!planos";
                    }

                });

            }else{

                bootbox.alert({
                    message: "Login sem sucesso!",
                    backdrop: true,
                    buttons: {
                        ok: {
                            label: "OK!",
                            className: 'btn-danger'
                        }
                    }
                });

            }

        });

    }

});