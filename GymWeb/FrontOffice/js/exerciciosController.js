import { getExercices } from './pedidos.js';

// Controller da página de exercicios
app.controller('exerciciosCtrl', function ($scope, $http) {

    // Pede os exercícios existentes à API
    getExercices($http, (response) => {

        // Se a API respondeu da forma correta
        if (response) {

            // Tamanho do array de exercicios
            let size = response.data.length;

            // Array que vai conter os exercicios
            let exercicios = [];

            // Percorre o array de exercicios
            for (let i = 0; i < size; i++) {

                // Retira os atributos todos de cada exercicios
                let id = response.data[i].id;
                let name = response.data[i].name;
                let description = response.data[i].description;
                let url = response.data[i].imageUrl;
                let muscle = response.data[i].targetMuscleGroup;
                let difficulty = response.data[i].difficultyLevel;
                let equipmentToUse = response.data[i].equipmentToUse;

                // Reorganiza os atributos num objeto novo de exercicio
                let ex = { id, name, description, url, muscle, difficulty, equipmentToUse };

                // Adiciona o exercicio ao array de exercicios
                exercicios.push(ex);
            }

            // Atribui o array de exercicios para atualizar a vista
            $scope.exercicios = exercicios;

            // Se a API não respondeu da forma correta
        } else {

        }

    });

});