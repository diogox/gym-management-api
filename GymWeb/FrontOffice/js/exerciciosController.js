app.controller('exerciciosCtrl', function($scope, $http) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/exercises/"

    }).then(function mySuccess(response) {

        let size = response.data.length;
        let exercicios = [];

        for(let i=0; i<size; i++){
            let id = response.data[i].id;
            let name = response.data[i].name;
            let description = response.data[i].description;
            let url = response.data[i].imageUrl;
            let muscle = response.data[i].targetMuscleGroup;
            let difficulty = response.data[i].difficultyLevel;
            let equipmentToUse = response.data[i].equipmentToUse;

            let ex = {id, name, description, url, muscle, difficulty, equipmentToUse};
            
            exercicios.push(ex);
        }

        $scope.exercicios = exercicios;

    }, function myError(response) {

    });

});