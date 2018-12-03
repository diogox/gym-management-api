import { getexercises, getEquipmentById } from './pedidos.js';

// Controller da página de exercicios
app.controller('exerciciosCtrl', function ($scope, $http) {

    // Pede os exercícios existentes à API
    getexercises($http, (response) => {

        // Se a API respondeu da forma correta
        if (response) {

            // Tamanho do array de exercicios
            let size = response.data.length;


            // Percorre o array de exercicios
            for (let i = 0; i < size; i++) {

                // Pede um exercicio especifico à API
                getEquipmentById($http, response.data[i].equipmentId, (response2) => {

                    // Se a API respondeu da forma correta
                    if (response2) {

                        response.data[i].equipment = response2.data;

                        // Se a API não respondeu da forma correta
                    } else {

                        response.data.equipment = {};

                    }

                });

            }
            
            // Atribui o array de exercicios para atualizar a vista
            $scope.exercicios = response.data;

            // Se a API não respondeu da forma correta
        } else {
        }

    });

});