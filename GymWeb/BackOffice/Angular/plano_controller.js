import { getPlanoTreinoByID, removeExercisePlanoTreinoByID, getExerciseByID, } from './pedidos.js'
import { setCookie, getCookie } from './cookies.js'




app.controller('planoCtrl', function ($scope, $http, $routeParams, $rootScope) {

    //Verifica se o admin está logged se não estiver redireciona para a página de Login (Comentário no "if statement" para testar na api sem auth)
    if (getCookie("admin") == "" || getCookie("usertype") != "Admin") {
        window.location.href = "#!login";
    }

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');



    //Estilo do Alerta de Erro
    $scope.redAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "red"
    }


    //Estilo do Alerta de Sucesso
    $scope.greenAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "green"
    }

    //Alertas
    $scope.alerts = [
        //Erro ao Carregar o Plano Index:0
        { type: 'Error', msg: 'Erro ao Carregar o Plano!', style: $scope.redAlert, show: false },
        //Erro ao Carregar o Exercicio Index:1
        { type: 'Error', msg: 'Erro ao Carregar o Exercicio!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    
    function recerberExercicio(id) {
        let token = getCookie('admin');
        getExerciseByID($http, id, token, (response) => {
            if (response) {
                return response;
            } else {
                $scope.alerts[1].show = true;
                return false;
            }
        });
    }

    //Retirar o id do URL
    let id = $routeParams.id;

    let token = getCookie('admin');
    getPlanoTreinoByID($http, id, token, (response) => {
        if (response) {
            $scope.Plano_nome = response.data.name;
            $scope.Plano_Treinador = response.data.supervisingTrainer;
            $scope.Exercicios = response.data.exerciseBlocks;
            for (let i = 0; i < response.data.exerciseBlocks.length; i++) {
                //Receber o Exercicio
                getExerciseByID($http, i+1, token, (response) => {
                    if (response) {
                        $scope.Exercicios[i].nome = response.data.name;
                    } else {
                        $scope.alerts[1].show = true;
                        $scope.Exercicios[i].nome = "Erro ao Carregar o Nome!"
                    }
                });
            }
        } else {
            $scope.alerts[0].show = true;
        }
    });




























});