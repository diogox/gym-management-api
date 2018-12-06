// Controller do registo
app.controller('registoCtrl', function ($scope, $http, $rootScope) {

    // Indicar ao controler da página principal que o menu lateral deve ser oculto
    $rootScope.$broadcast('show-window', 'false');
    // ::TODO:: VERIFICAR SE NÂO È PECISO INSERIR A IDADE

    // Verificar se a password e a confirmação de password são iguais
    $scope.checkPasswords = function () {
        if ($scope.registo.password === $scope.registo.confirmarpassword) {
            document.getElementById("confirmarpassword").setCustomValidity("");
        } else {
            document.getElementById("confirmarpassword").setCustomValidity("Passwords must match");
        }
    }

    // Verifica que a password introduzida cumpre os requisitos necessários
    $scope.checkPasswordStrength = function() {

        // Password que o utilizador introduziu
        var term = document.getElementById("password").value;

        // Padrão que verifica se na password introduzida tem pelo menos
        // uma letra maiuscula, um digito e pelo menos 8 caracteres
        var patt = /(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])/;
        
        // Verifica se a password corresponde aos requisitos
        if(patt.exec(term)){

            document.getElementById("password").setCustomValidity("");

        }else{
            let mensagem = "A password deve conter pelo menos uma letra maiuscula, uma letra e oito digitos";
            document.getElementById("password").setCustomValidity(mensagem);
        }

    }

    // Quando clica em submeter o registo
    $scope.submitRegisto = function () {

        bootbox.confirm({
            message: "Você confirma os seus dados e pretende efetuar o registo?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (resultConfirm) {

                if (resultConfirm) {

                    /*bootbox.alert({
                        message: "Registo efetuado com sucesso!",
                        backdrop: true,
                        buttons: {
                            ok: {
                                label: "OK!",
                                className: 'btn-success'
                            }
                        }
                    });*/

                }
            }
        });
    }
});