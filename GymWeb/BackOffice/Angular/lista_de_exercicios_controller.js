import { getExercises, getEquipmentByID, addExercises, getEquipment, removeExercise, editarExercise } from './pedidos.js'
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
        //Erro ao Carregar os Equipamentos
        { type: 'Error', msg: 'Erro ao Carregar os Equipamentos!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }


    //Dificuldade do Exercicio
    $scope.exDif = ["Easy", "Intermediate", "Hard"];
    $scope.exMus = ["Chest", "Back", "Arms", "Legs", "Abs", "Shoulders"];

    //Equipamentos disponíveis para o exercicio
    $scope.loadEq = function () {
        getEquipment($http, token, (response) => {
            if (response) {
                $scope.exEq = response.data;
            } else {
                $scope.alerts[5].show = true;
            }
        });
    };


    //Listar todos os Exercicios
    //Executa a função para pedir os dados à API
    let token = getCookie('admin');
    getExercises($http, token, (response) => {
        if (response) {
            //console.log(response.data);
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
    $scope.submitADD = function () {
        let exercise = $scope.ex;

        //Verifica se o Valor do equipamento é none
        if ($scope.ex.equipmentId == "") {
            exercise.equipmentId = null;
        }

        let data = JSON.stringify(exercise);

        //console.log(data);
        let token = getCookie('admin');
        addExercises($http, data, token, (response) => {
            if (response) {

                //Substitui o id pelo nome do equipamento logo depois de adicionar o exercicio
                for (let i = 0; i < $scope.exEq.length; i++) {
                    if (response.data.equipmentId != null) {
                        if ($scope.exEq[i].id == response.data.equipmentId) {
                            response.data.equipmentId = $scope.exEq[i].name;
                        }
                    } else {
                        response.data.equipmentId = "Não necessita"
                    }
                }

                let resposta = response.data;

                //Atualiza a lista sem dar refresh na pagina
                let list = $scope.exercicios;
                list.push(resposta);
                $scope.exercicios = list

                //Dá reset e close no Modal form
                $('#addEx form :input').val("");
                $('#addEx').modal('toggle');
                $scope.alerts[1].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#addEx form :input').val("");
                $('#addEx').modal('toggle');
                $scope.alerts[0].show = true;
                $scope.alerts[0].show = true;
            }
        });
    };


    //Remover Exercicio
    $scope.rmEx = function (id) {

        let token = getCookie("admin");
        removeExercise($http, id, token, (response) => {
            if (response) {

                //console.log("Removido com Sucesso!");
                $scope.exercicios = $.grep($scope.exercicios, function (e) {
                    return e.id != id;
                });

                //Dá close no Modal from
                $('#removerEx').modal('toggle');


            } else {
                console.log("Erro ao Remover Exercicio!")

                //Dá close no Modal from
                $('#removerEx').modal('toggle');
            }
        });
    }

    //Antigo Exercicio
    let oldEx;
    //Editar um Exercicio
    $scope.exsubmit = function () {

        //console.log(oldEx);
        //Copia as informações todas do oldEx para um novo exercicio incluindo as informações inalteraveis
        let newEx = oldEx;

        //Atribui as novas informções ao newStaff
        newEx.id = $scope.idExedit;
        newEx.name = $scope.edex.name;
        newEx.targetMuscleGroup = $scope.edex.targetMuscleGroup;
        newEx.difficultyLevel = $scope.edex.difficultyLevel;
        newEx.equipmentId = $scope.edex.equipmentId;
        newEx.description = $scope.edex.description;
        newEx.imageUrl = $scope.edex.imageUrl;
        //console.log(newEx);

        let token = getCookie("admin");
        editarExercise($http, newEx, $scope.idExedit, token, (response) => {
            if (response) {

                $scope.edex = null;

                //Dá reset e close no Modal form
                $('#editarEx form :input').val("");
                $('#editarEx').modal('toggle');
                $scope.alerts[2].show = true;

            } else {

                //Dá reset e close no Modal form
                $('#editarEx form :input').val("");
                $('#editarEx').modal('toggle');
                $scope.alerts[3].show = true;
            }
        });
    };

    //Abre um popup para colocar nova informação do Exercicio
    $scope.edEx = function (id) {
        $scope.idExedit = id;
        oldEx = $scope.exercicios.find(x => x.id === $scope.idExedit);
        $scope.edex = oldEx;
        let token = getCookie("admin");
        getEquipment($http, token, (response) => {
            if (response) {
                $scope.exEq = response.data;
            } else {
                $scope.alerts[5].show = true;
            }
        });
        //console.log($scope.idExedit);
    }

    //Abre um popup para confirmar a remoção do Equipamento
    $scope.removeEx = function (id) {
        $scope.idExremove = id;
        //console.log($scope.idExremove);
    }



});