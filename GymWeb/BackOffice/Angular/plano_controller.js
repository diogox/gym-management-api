import { getPlanoTreinoByID, removeExercisePlanoTreinoByID, getExerciseByID, getExercises, editarPlanoTreino } from './pedidos.js'
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
        //Erro ao Adicionar o Exercicio Index:2
        { type: 'Error', msg: 'Erro ao Adicionar o Exercicio!', style: $scope.redAlert, show: false },
        //Erro ao Remover Exercicio Index:3
        { type: 'Erro', msg: 'Erro ao Remover Exercicio!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar o Exercicio Index:4
        { type: 'Success', msg: 'Sucesso ao Adicionar o Exercicio!', style: $scope.greenAlert, show: false },
        //Sucesso ao Editar o Exercicio Index:5
        { type: 'Success', msg: 'Sucesso ao Editar o Exercicio!', style: $scope.greenAlert, show: false },
        //Erro ao Editar Exercicio Index:6
        { type: 'Erro', msg: 'Erro ao Editar Exercicio!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Retirar o id do URL
    let id = $routeParams.id;

    //Dias da Semana
    $scope.diaSemana = ["Monday", "Tuesday", "Wednesday", "Thursdays", "Friday", "Saturday", "Sunday"];

    //Exercicios Disponiveis
    let token = getCookie('admin');

    getExercises($http, token, (response) => {
        if (response) {
            $scope.PTEX = response.data;
        } else {
            $scope.PTEX = "Erro ao Carregar os Exercicios!"
        }
    });

    //Devolve toda a informação do Plano selecionado
    getPlanoTreinoByID($http, id, token, (response) => {
        if (response) {
            $scope.Plano_nome = response.data.name;
            $scope.Plano_Treinador = response.data.supervisingTrainer;
            $scope.Exercicios = response.data.exerciseBlocks;
            for (let i = 0; i < response.data.exerciseBlocks.length; i++) {
                //Receber o Exercicio
                getExerciseByID($http, $scope.Exercicios[i].exerciseId, token, (response) => {
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


    //Adicionar Exercicio ao Plano
    $scope.submitADD = function () {

        let token = getCookie("admin");

        let novoExercicio = $scope.ptex;

        //ID do Plano a que vou adicionar o novo Exercicio
        let idPlano = id;
        let currentPlano;

        //Chamar o Plano e guardá-lo num objecto
        getPlanoTreinoByID($http, id, token, (response) => {
            if (response) {
                currentPlano = response.data;

                //Adicionar o novo Exercicio ao currentPlano
                currentPlano.exerciseBlocks.unshift(novoExercicio);

                //Fazer um PUT do currentPlano
                editarPlanoTreino($http, currentPlano, id, token, (response) => {
                    if (response) {

                        //Receber o Exercicio
                        getExerciseByID($http, novoExercicio.exerciseId, token, (response) => {
                            if (response) {
                                novoExercicio.nome = response.data.name;

                                //Atualiza a lista sem dar refresh na pagina
                                let list = $scope.Exercicios;
                                list.push(novoExercicio);
                                $scope.Exercicios = list

                            } else {
                                $scope.alerts[1].show = true;
                                $scope.Exercicios[i].nome = "Erro ao Carregar o Nome!"
                            }
                        });

                        $scope.alerts[4].show = true;
                        //Dá reset e close no Modal form
                        $('#addExPT form :input').val("");
                        $('#addExPT').modal('toggle');
                    } else {

                        //Dá reset e close no Modal form
                        $('#addExPT form :input').val("");
                        $('#addExPT').modal('toggle');
                        $scope.alerts[2].show = true;
                    }
                });

            } else {
                $scope.alerts[0].show = true;
            }
        });
    }


    //Remover Exercicio do Plano
    $scope.rmEx = function (index) {
        let token = getCookie("admin");
        let currentPlano;
        //Get Current Plano
        //Chamar o Plano e guardá-lo num objecto
        getPlanoTreinoByID($http, id, token, (response) => {
            if (response) {
                currentPlano = response.data;

                //Remover o Exercicio ao currentPlano
                currentPlano.exerciseBlocks.splice(index, 1);

                //Fazer um PUT do currentPlano
                editarPlanoTreino($http, currentPlano, id, token, (response) => {
                    if (response) {
                        //Atualiza a lista sem dar refresh na pagina
                        let list = $scope.Exercicios;
                        list.splice(index, 1);
                        $scope.Exercicios = list
                    }
                });
                //Dá reset e close no Modal form
                $('#removerPlanoEx form :input').val("");
                $('#removerPlanoEx').modal('toggle');
            } else {
                //Dá reset e close no Modal form
                $('#removerPlanoEx form :input').val("");
                $('#removerPlanoEx').modal('toggle');
                $scope.alerts[3].show = true;
            }
        });
    };


    //Antigo Exercicio
    let oldEx;
    //Editar Exercicio do Plano
    $scope.submitED = function (idExercicio) {

        let token = getCookie("admin");
        let currentPlano;
        let novoEx = $scope.edptex;
        
        getPlanoTreinoByID($http, id, token, (response) => {
            if (response) {
                currentPlano = response.data;

                //Remover o Exercicio ao currentPlano
                currentPlano.exerciseBlocks.splice(idExercicio, 1,novoEx);

                //Fazer um PUT do currentPlano
                editarPlanoTreino($http, currentPlano, id, token, (response) => {
                    if (response) {
                        //Atualiza a lista sem dar refresh na pagina
                        let list = $scope.Exercicios;
                        list.splice(idExercicio, 1,novoEx);
                        $scope.Exercicios = list
                    }
                });
                //Dá reset e close no Modal form
                $('#editarPlanoEx form :input').val("");
                $('#editarPlanoEx').modal('toggle');
                $scope.alerts[5].show = true;
            } else {
                //Dá reset e close no Modal form
                $('#editarPlanoEx form :input').val("");
                $('#editarPlanoEx').modal('toggle');
                $scope.alerts[6].show = true;
            }
        });
    }





















    $scope.edPlanoEx = function (x) {
        $scope.idExed = x;
        oldEx = $scope.Exercicios[x];
        $scope.edptex = oldEx;
    }

    //Abre um popup para confirmar a remoção do Exercicio
    $scope.removePlanoEx = function (x) {
        $scope.idExremove = x
    }
});