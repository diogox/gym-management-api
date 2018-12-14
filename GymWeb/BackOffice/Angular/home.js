import { getCookie } from './cookies.js'
import { newHistogram, newLineChart, newCalendario } from './data.js'


//Controller da Home Pag (Num patch futuro irá ter os relatórios)
app.controller("homeCtrl", function ($scope, $http, $rootScope) {

    //Verifica se o admin está logged se não estiver redireciona para a página de Login (Comentário no "if statement" para testar na api sem auth)
    if (getCookie("admin") == "" || getCookie("usertype") != "Admin") {
        window.location.href = "#!login";
    } else {

        //Indicar ao controler da página principal que o menu lateral deve ser mostrado
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
            //Erro ao Carregar Histograma de Entradas! Index:0
            { type: 'Error', msg: 'Erro ao Carregar Histograma de Entradas!', style: $scope.redAlert, show: false },
            //Erro ao Carregar Calendario de Entradas! Index:1
            { type: 'Error', msg: 'Erro ao Carregar Calendario de Entradas!', style: $scope.redAlert, show: false },
            //Erro ao Carregar Gráfico Linear de Entradas! Index:2
            { type: 'Error', msg: 'Erro ao Carregar Gráfico Linear de Entradas!', style: $scope.redAlert, show: false },
        ];



        //Calendario
        newCalendario($http, (response) => {
            if (!response) {
                $scope.alerts[1].show = true;
            }
        });

        //Histograma
        newHistogram($http, (response) => {
            if (!response) {
                $scope.alerts[0].show = true;
            }
        });

        //Gráfico Linear
        newLineChart($http, (response) => {
            if (!response) {
                $scope.alerts[2].show = true;
            }
        });

    }
});
