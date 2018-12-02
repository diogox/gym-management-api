import { getEquipments } from './pedidos.js'

// Controller da página de equipamentos
app.controller('equipamentosCtrl', function ($scope, $http) {

    // Pede os equipamentos existentes à API
    getEquipments($http, (response) => {

        // Se a API respondeu da forma correta
        if (response) {

            // Tamanho do array de equipamentos
            let size = response.data.length;

            // Array que vai conter os equipamentos
            let equipamentos = [];

            // Percorre o array de equipamentos
            for (let i = 0; i < size; i++) {

                // Retira os atributos todos de cada equipamento
                let id = response.data[i].id;
                let name = response.data[i].name;
                let brandName = response.data[i].brandName;
                let url = response.data[i].imageUrl;
                let quantity = response.data[i].quantity;
                let priceInEuro = response.data[i].priceInEuro;
                let supplierName = response.data[i].supplierName;
                let description = response.data[i].description;

                // Reorganiza os atributos num objeto novo de equipamento
                let eq = { id, name, brandName, url, quantity, priceInEuro, supplierName, description };

                // Adiciona o equipamento ao array de equipamentos
                equipamentos.push(eq);
            }

            // Atribui o array de equipamentos para atualizar a vista
            $scope.equipamentos = equipamentos;

            // Se a API não respondeu da forma correta
        } else {
        }

    });

});