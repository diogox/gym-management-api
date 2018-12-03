import { getexercises, getEquipmentById, getexerciseById, getEquipments, changeExercise, createExercise, deleteExercise } from './pedidos.js';

// Controller da página de exercicios
app.controller('exerciciosCtrl', function ($scope, $http) {

    let listaExercicios = [];

    // Obtem lista de equipamentos e atualiza a vista para um select em editar e criar novo
    getEquipments($http, (response)=>{
        $scope.equipmentList = response.data;
    });

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
            
            listaExercicios = response.data;
            
            // Atribui o array de exercicios para atualizar a vista
            $scope.exercicios = listaExercicios;

            // Se a API não respondeu da forma correta
        } else {
        }

    });

    // Função que executa quando clica em editar exercicio ou eliminar exercicio,
    // coloca as informações do exercicio numa variavel que é utilizado posteriormente
    // para preencher o modal(em caso de edição) ou para conseguir eliminar do array (em caso de
    // de remoção)
    $scope.edit = function(id){

        // Obtem o exercicio
        getexerciseById($http, id, (response)=>{

            // Obtem o equipamento associado ao exercicio
            getEquipmentById($http, response.data.equipmentId, (response2) => {

                    response.data.equipmentName = response2.data.name;

                    // Atualiza a vista
                    $scope.editExercise = response.data;

            });
           

        });

        // Tipo de ação a executar quando clicar em submit
        $scope.type = "edit";

    }

    // Quando clica no botão de criar novo exercicio
    $scope.create = function(){

        // Elimina as informações que existam armazenadas temporariamente 
        // para efeitos de edição ou remoção, caso contrário o modal
        // seria preenchido com essas informações
        $scope.editExercise = {};   
        
        // Tipo de ação a executar quando clicar em submit
        $scope.type = "create";
        
    }

    // Quando clica em submeter um exercicio novo ou editado
    $scope.submitExercise = function(){
        

        // Confirmar que o utilizador realmente quer executar esta ação
        let executar = confirm("Are you sure?");
        if(!executar){
            return;
        }

        // Dados a enviar no body do pedido
        let dataSend = $scope.editExercise;

        // Caso seja uma ação de editar um exercicio
        if($scope.type === "edit"){

            // Efetua o pedido de alterar um exercicio
            changeExercise($http, $scope.editExercise.id, $scope.editExercise, (result)=>{
                if(result) {
                    
                    // Procura no array o exercicio para o alterar na vista de forma dinamica
                    for(let i=0; i<listaExercicios.length; i++){

                        if(listaExercicios[i].id == $scope.editExercise.id){
                            listaExercicios[i] = $scope.editExercise;
                        }
                    }
                    
                    alert("Exercicio editado com sucesso!");

                    // Simula um click no botão de fechar o modal
                    document.getElementById("closeExerciseModal").click();

                }else{
                    alert(false)
                }
            });
            
        // Caso seja uma ação de criar um exercicio
        }else{
            createExercise($http, dataSend, (result)=>{

                if(result){
                    listaExercicios.push($scope.editExercise)
                    alert("Exercicio criadp com sucesso!");
                    
                    // Simula um click no botão de fechar o modal
                    document.getElementById("closeExerciseModal").click();
                }else{
                    alert(false)
                }

            });
        }

    }

    // Quando o utilizador clica em eliminar o exercicio
    $scope.delete = function(id){

        // Confirmar que o utilizador realmente quer executar esta ação
        let executar = confirm("Are you sure?");
        if(!executar){
            return;
        }

        // Efetua o pedido de remoção
        deleteExercise($http, id, (result)=>{

            if(result){

                alert("Deleted");

                // Procura o exercicio na lista de forma a remover da lista de forma dinamica
                for(let i=0; i<listaExercicios.length; i++){

                    if(listaExercicios[i].id == $scope.editExercise.id){
                        listaExercicios.splice(i, 1);
                    }
                }
            }else{
                alert("Not deleted");
            }

        });
    }

});