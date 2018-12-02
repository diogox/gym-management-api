import { getPlanosTreino, getexerciseById, getexercises, createPlan } from './pedidos.js'

// Controller da  página planos de treino
app.controller('planosCtrl', function ($scope, $http) {


    // Ocultar planos no topo da página
    $scope.novo_plano_sucesso = "y";
    $scope.novo_plano_sem_sucesso = "y";
    $scope.novo_plano_sem_sucesso_dados = "y";

    // Array que vai conter os planos
    let plans = [];


    // CRIAR PLANO

    // Lista de exercicios existentes
    let exercises = [];

    // Obter lista de todos os exercicios
    getexercises($http, (response)=>{
        if(response){

            for(let i=0; i<response.data.length; i++){
                let exerciseId = response.data[i].id;
                let exerciseName = response.data[i].name;
                let exercise = {exerciseId, exerciseName}
                exercises.push(exercise)
            }

            $scope.exercisesList = exercises;

        }else{

        }
    });

    // Lista de exercises que estão no modal como sendo os exercicios do plano de treino
    $scope.newExercises = [];

    // Adicionar um novo exercicio ao plano a ser criado
    $scope.addRow = function() {

        $scope.newExercises.push({
        });
    
    }


    // Quando clica no botão de submeter plano
    $scope.submitPlan = function() {

        if ($scope.name === "" || $scope.name === undefined) {

            // Mostra alerta de que os dados foram preenchidos sem sucesso
            $scope.nova_resposta_sem_sucesso_dados = "";

        } else {
            //console.log(exercises)
            let name = $scope.name;
            //let exercises = $scope.newExercises;

            let exerciseBlocks = $scope.newExercises;

            let supervisingTrainerId = 1;
            let newPlan = {name, exerciseBlocks, supervisingTrainerId}

            // Criar um novo plano
            createPlan($http, newPlan, (response)=>{

                if(response){
                    $scope.novo_plano_sucesso = "";
                    $scope.novo_plano_sem_sucesso = "y";
                    $scope.novo_plano_sem_sucesso_dados = "y";

                    // Disable do botão de submit para evitar enviar a mesma resposta várias vezes
                    $scope.disableSubmit = "y";

                    // ADICIONAR PLANO À PÁGINA ATUAL
                    
                    // Lista de exercicios de um plano
                    let exercises = [];

                    // Percorre os exercicicios todos de cada plano
                    for(let j=0; j<response.data.exerciseBlocks.length; j++){

                        // Obtem as informações de cada exercicio
                        getexerciseById($http, response.data.exerciseBlocks[j].exerciseId, (response2)=>{

                            // Objeto que representa um exercicio no contexto de plano de treino
                            let exercicio = {
                                name: response2.data.name,
                                numberOfRepetitions : response.data.exerciseBlocks[j].numberOfRepetitions,
                                numberOfSeries : response.data.exerciseBlocks[j].numberOfSeries,
                                dayOfTheWeek : response.data.exerciseBlocks[j].dayOfTheWeek
                            }
                            
                            // Adiciona este exercicio ao array de exercicios deste plano
                            exercises.push(exercicio)

                        });

                    }

                    // Obtem o treinador deste plano
                    let trainer = "";
                    //let trainer = response.data.supervisingTrainer.firstName + " " + response.data.supervisingTrainer.lastName;

                    // Nome do plano
                    let name = response.data.name;

                    // Objeto que representa este plano que contem treinador e array de exercicios
                    let plan = {exercises, trainer, name};
                    console.log(plan)

                    // Adiciona este plano à lista de planos
                    plans.push(plan);

                    //////////////////////////////////////////////////


                    // Apaga o formulário atual
                    $scope.newExercises = [];
                    $scope.name = "";

                }else{
                    $scope.novo_plano_sucesso = "y";
                    $scope.novo_plano_sem_sucesso = "";
                    $scope.novo_plano_sem_sucesso_dados = "y";
                }

            });
        }
    }

    // LISTA DE PLANOS

    // Obtem uma lista de planos de treino
    getPlanosTreino($http, (response)=>{

        // Se a API respondeu da forma correta
        if(response){

            // Percorre todos os planos
            for(let i=0; i<response.data.length; i++){

                // Lista de exercicios de um plano
                let exercises = [];

                // Percorre os exercicicios todos de cada plano
                for(let j=0; j<response.data[i].exerciseBlocks.length; j++){

                    // Obtem as informações de cada exercicio
                    getexerciseById($http, response.data[i].exerciseBlocks[j].exerciseId, (response2)=>{

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

                // Nome do plano
                let name = response.data[i].name;

                // Objeto que representa este plano que contem treinador e array de exercicios
                let plan = {exercises, trainer, name};

                // Adiciona este plano à lista de planos
                plans.push(plan);

            }
            
            // Atualiza a vista do utilizador
            $scope.plans = plans;

        }else{

        }

    });


});