import { getExercises, getEquipmentByID } from './pedidos.js'
import { setCookie, getCookie } from './cookies.js'



//Controller da Gestão dos Exercicios
app.controller("exercisesCtrl", function ($scope, $http, $rootScope) {

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
        //Erro ao Adicionar um Exercicio Index:0
        { type: 'Error', msg: 'Erro ao Adicionar o Exercicio!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar um Exercicio Index:1
        { type: 'Success', msg: 'Exercicio Adicionado com Sucesso!', style: $scope.greenAlert, show: false },
        //Sucesso ao Editar um Exercicio Index:2
        { type: 'Success', msg: 'Exercicio Editado com Sucesso!', style: $scope.greenAlert, show: false },
        //Erro ao Editar um Exercicio Index:3
        { type: 'Error', msg: 'Erro ao Editar o Exercicio!', style: $scope.redAlert, show: false },
        //Erro ao Carregar a Tabela de Exercicios Index:4
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Exercicios!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }


    //Dificuldade do Exercicio
    //$scope.edif = ["Easy", "Normal", "Hard"];


    //Listar todos os Exercicios
    //Executa a função para pedir os dados à API
    let token = getCookie('admin');
    getExercises($http, token, (response) => {
        if (response) {
            console.log(response.data);
            //A cada exercicio recebido é feito um pedido á apí pelo nome do equipamento que este necessita para ser realizado
            for (let i = 0; i < response.data.length; i++) {

                //Verifica se o id do equipamento utilizado é ou não null pois há exercicios que não precisam de equipamento para serem realizados
                if (response.data[i].equipmentId != null) {
                    //Vai buscar o equipamento
                    getEquipmentByID($http, response.data[i].equipmentId, token, (response1) => {
                        if (response1) {
                            response.data[i].equipmentId = response1.data.name;
                        } else {
                            $scope.alerts[4].show = true;
                            response.data[i].equipmentId = "Nome não carregado!"
                        }
                    });
                } else {
                    response.data[i].equipmentId = "Não necessita"
                }
            }

            $scope.exercicios = response.data;

        } else {
            $scope.alerts[4].show = true;
        }
    });


    //Adicionar um Exercicio















    //Antigo Exercicio
     let oldEx;
    //Editar um Exercicio










    









    //Abre um popup para colocar nova informação do Exercicio
    $scope.edEx = function (id) {
        $scope.idExedit = id;
        oldEx = $scope.exercicios.find(x => x.id === $scope.idExedit);
        $scope.edex = oldEx;
    }

    //Abre um popup para confirmar a remoção do Equipamento
    $scope.removeEx = function (id) {
        $scope.idExremove = id;
        console.log($scope.idExremove);
    }



});