import { getEquipment, removeEquipment, adicionarEquipment, editarEquipment } from './pedidos.js'

//Lista de Equipamentos
app.controller("EqCtrl", function ($scope, $http, $rootScope) {

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
        //Erro ao Adicionar um Equipamento Index:0
        { type: 'Error', msg: 'Erro ao Adicionar o Equipamento!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar um Equipamento Index:1
        { type: 'Success', msg: 'Equipamento Adicionado com Sucesso!', style: $scope.greenAlert, show: false },
        //Sucesso ao Editar um Equipamento Index:2
        { type: 'Success', msg: 'Equipamento Editado com Sucesso!', style: $scope.greenAlert, show: false },
        //Erro ao Editar um Equipamento Index:3
        { type: 'Error', msg: 'Erro ao Editar o Equipamento!', style: $scope.redAlert, show: false },
        //Erro ao Carregar a Tabela de Equipamentos Index:4
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Equipamentos!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Listar todos os Equipamentos
    getEquipment($http, (response) => {
        if (response) {
            //console.log(response.data);

            $scope.equipamentos = response.data;

        } else {
            $scope.alerts[4].show = true;
        }
    });


    //Adicionar Equipamento
    $scope.submitADD = function () {

        let data = JSON.stringify($scope.eq);
        //console.log(data);
        adicionarEquipment($http, data, (response) => {
            if (response) {
                let resposta = response.data;

                //Atualiza a lista sem dar refresh na pagina
                let list = $scope.equipamentos;
                list.push(resposta);
                $scope.equipamentos = list

                //Dá reset e close no Modal form
                $('#addEq form :input').val("");
                $('#addEq').modal('toggle');
                $scope.alerts[1].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#addEq form :input').val("");
                $('#addEq').modal('toggle');
                $scope.alerts[0].show = true;
            }
        });
    };


    //Antigo Equipamento
    let oldEq;
    //Editar Equipamento
    $scope.edsubmit = function () {

        //console.log(oldEq);
        //Copia as informações todas do oldEq para um novo Equipamento incluindo as informações inalteraveis
        let newEq = oldEq;

        //Atribui as novas informções ao newEq
        newEq.id = $scope.idEqedit;
        newEq.name = $scope.edeq.name;
        newEq.brandName = $scope.edeq.brandName;
        newEq.quantity = $scope.edeq.quantity;
        newEq.priceInEuro = $scope.edeq.priceInEuro;
        newEq.supplierName = $scope.edeq.supplierName;
        newEq.description = $scope.edeq.description;
        newEq.imageUrl = $scope.edeq.imageUrl;
        //console.log(newEq);

        editarEquipment($http, newEq, $scope.idEqedit, (response) => {
            if (response) {
                $scope.edeq = null;
                //Dá reset e close no Modal form
                $('#editarEq form :input').val("");
                $('#editarEq').modal('toggle');
                $scope.alerts[2].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#editarEq form :input').val("");
                $('#editarEq').modal('toggle');
                $scope.alerts[3].show = true;
            }
        });
    };


    //Remove o Equipamento da Base de Dados
    $scope.rmEq = function (id) {
        //console.log($scope.equipamentos);
        //console.log(id);

        removeEquipment($http, id, (response) => {
            if (response) {
                $scope.equipamentos = $.grep($scope.equipamentos, function (e) {
                    return e.id != id;
                });

                //Dá close no Modal from
                $('#removerEq').modal('toggle');
            } else {
                //Dá close no Modal from
                $('#removerEq').modal('toggle');
            }
        });
    }


    //Abre um popup para colocar nova informação do Equipamento
    $scope.edEq = function (id) {
        $scope.idEqedit = id;
        oldEq = $scope.equipamentos.find(x => x.id === $scope.idEqedit);
        $scope.edeq = oldEq;
    }

    //Abre um popup para confirmar a remoção do Equipamento
    $scope.removeEq = function (id) {
        $scope.idEqremove = id;
    }


});