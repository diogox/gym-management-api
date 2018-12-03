import { getEquipments } from './pedidos.js'

// Controller da página de equipamentos
app.controller('equipamentosCtrl', function ($scope, $http) {

    // Pede os equipamentos existentes à API
    getEquipments($http, (response) => {

        // Se a API respondeu da forma correta
        if (response) {

            // Atribui o array de equipamentos para atualizar a vista
            $scope.equipamentos = response.data;

            // Se a API não respondeu da forma correta
        } else {
        }

    });

});