import { getPlanosTreino, getExerciceById } from './pedidos.js'

// Controller da  página planos de treino
app.controller('planosCtrl', function ($scope, $http) {


    // Obtem uma lista de planos de treino
    getPlanosTreino($http, (response)=>{

        // Se a API respondeu da forma correta
        if(response){

            // Array que vai conter os planos
            let plans = [];

            // Percorre todos os planos
            for(let i=0; i<response.data.length; i++){

                // Lista de exercicios de um plano
                let exercises = [];

                // Percorre os exercicicios todos de cada plano
                for(let j=0; j<response.data[i].exerciseBlocks.length; j++){

                    // Obtem as informações de cada exercicio
                    getExerciceById($http, response.data[i].exerciseBlocks[j].exerciseId, (response2)=>{

                        // Objeto que representa um exercicio no contexto de plano de treino
                        let exercicio = {
                            name: response2.data.name,
                            numberOfRepetitions : response.data[i].exerciseBlocks[j].numberOfRepetitions,
                            numberOfSeries : response.data[i].exerciseBlocks[j].numberOfSeries,
                            dayOfTheWeek : response.data[i].exerciseBlocks[j].dayOfTheWeek
                        }
                        
                        // Adiciona este exercicio ao array de exercicios deste plano
                        exercises.push(exercicio)

                    });

                }

                // Obtem o treinador deste plano
                let trainer = response.data[i].supervisingTrainer.firstName + " " + response.data[i].supervisingTrainer.lastName;

                // Objeto que representa este plano que contem treinador e array de exercicios
                let plan = {exercises, trainer}

                // Adiciona este plano à lista de planos
                plans.push(plan);

            }
            
            // Atualiza a vista do utilizador
            $scope.plans = plans;

        }else{

        }

    });


});