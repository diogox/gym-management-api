app.controller('planoTreinoCtrl', function($scope, $http) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/clients/8/"

    }).then(function mySuccess(response) {

        let trainingPlan = response.data.trainingPlan;

        let segunda = trainingPlan.mondayExercises;
        let terca = trainingPlan.tuesdayExercises;
        let quarta = trainingPlan.wednesdayExercises;
        let quinta = trainingPlan.thursdayExercises;
        let sexta = trainingPlan.fridayExercises;
        let sabado = trainingPlan.saturdayExercises;
        let domingo = trainingPlan.sundayExercises;

        $scope.plan = segunda;

        $scope.selectPlanDay = function(day) {
            switch(day){
                case 1:
                    $scope.plan = domingo;
                    break;
                case 2:
                    $scope.plan = segunda;
                    break;
                case 3:
                    $scope.plan = terca;
                    break;
                case 4:
                    $scope.plan = quarta;
                    break;
                case 5:
                    $scope.plan = quinta;
                    break;
                case 6:
                    $scope.plan = sexta;
                    break;
                case 7:
                    $scope.plan = sabado;
                    break;
            }
        };

    }, function myError(response) {

        
    });

});