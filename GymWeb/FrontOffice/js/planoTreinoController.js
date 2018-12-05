import { getClient, getPlanExercisesById, getexerciseById } from "./pedidos.js";

// Controller da página de plano de treino
app.controller('planoTreinoCtrl', function($scope, $http) {

    // Pede o cliente à API
    getClient($http, 2, (response)=>{

        // Se a API respondeu da forma correta
        if(response){

            // Obtem o id do plano de treino do cliente
            let planId = response.data.trainingPlanId;

            // Obtem os id's, numero de repetições e numero de series 
            // dos exercicios do plano de treino do utilizador
            getPlanExercisesById($http, planId, (response2)=>{

                // Se a API respondeu da forma correta
                if(response2){

                    // Arrays que vao conter os exercicios de cada dia
                    let monday = [];
                    let tuesday = [];
                    let wednesday = [];
                    let thursday = [];
                    let friday = [];
                    let saturday = [];
                    let sunday = [];

                    // Percorre a lista de exercicios para os separar por dias
                    for(let i=0; i<response2.data.length; i++){

                        // Pede a descrição promonorizada de cada um dos exercícios à api
                        getexerciseById($http, response2.data[i].exerciseId, (response3)=>{

                            // Se a API respondeu da forma correta
                            if(response3){

                                response2.data[i].exercise = response3.data;

                                // Adiciona o exercico ao dia que lhe pertence
                                switch(response2.data[i].dayOfTheWeek){

                                    case 'Monday':
                                        monday.push(response2.data[i]);
                                        break;
                                    
                                    case 'Tuesday':
                                        tuesday.push(response2.data[i]);
                                        break;
        
                                    case 'Wednesday':
                                        wednesday.push(response2.data[i]);
                                        break;
        
                                    case 'Thursday':
                                        thursday.push(response2.data[i]);
                                        break;
        
                                    case 'Friday':
                                        friday.push(response2.data[i]);
                                        break;
        
                                    case 'Saturday':
                                        saturday.push(response2.data[i]);
                                        break;
        
                                    case 'Sunday':
                                        sunday.push(response2.data[i]);
                                        break;
                                }

                            // Se a API não respondeu da forma correta
                            }else{
                            }

                        });

                    }

                    // Inicialmente, quando o utilizador abre a página vê o plano se segunda-feira
                    $scope.plan = monday;

                    // Quando o utilizador mudar o dia, atualiza a vista com o plano desse dia
                    $scope.selectPlanDay = function(day) {
                        switch(day){
                            case 1:
                                $scope.plan = sunday;
                                break;
                            case 2:
                                $scope.plan = monday;
                                break;
                            case 3:
                                $scope.plan = tuesday;
                                break;
                            case 4:
                                $scope.plan = wednesday;
                                break;
                            case 5:
                                $scope.plan = thursday;
                                break;
                            case 6:
                                $scope.plan = friday;
                                break;
                            case 7:
                                $scope.plan = saturday;
                                break;
                        }
                    };

                // Se a API não respondeu da forma correta
                }else{
                }

            });

        // Se a API não respondeu da forma correta
        }else{
        }

    });

});