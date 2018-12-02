import { getAllClients, getPlanosTreinoById, getPlanosTreino, changeClientPlan } from './pedidos.js'

// Controller da página de atribuir planos
app.controller('atribuirPlanoCtrl', function ($scope, $http) {

    let listClients = [];

    // Obter lista de todos os clients
    getAllClients($http, (response)=>{

        if(response){

            // Guardar os clientes num array
            for(let i=0; i<response.data.length; i++){
                listClients.push(response.data[i]);

                // Obter o plano atual deste cliente
                getPlanosTreinoById($http, listClients[i].trainingPlanId, (plan)=>{

                    if(plan){
                        
                        listClients[i].trainingPlan = plan.data;

                    }else{

                    }

                });

            }

        }else{

        }
        // Atualiza a vista do utilizador
        $scope.clients = listClients;

    });

    // Obtem todos os planos existentes
    getPlanosTreino($http, (planos)=>{
        
        if(planos){
            // Atualiza a vista de utilizador
            $scope.plans = planos.data;
        }else{

        }
    });

    // Quando alterar o item selected, altera o plano do utilizador
    $scope.changePlan = function(clientId, planId){

        for(let i=0; i<listClients.length; i++){

            if(listClients[i].id === clientId){

                listClients[i].trainingPlanId = planId;
                changeClientPlan($http, listClients[i].id, listClients[i], (response)=>{

                    if(response){
                        alert("Plano alterado com sucesso");
                    }else{
                        alert("Plano alterado sem sucesso");
                
                    }

                });
            }
        }

    }

});