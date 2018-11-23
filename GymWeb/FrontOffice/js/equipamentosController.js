app.controller('equipamentosCtrl', function($scope, $http) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/equipment/"

    }).then(function mySuccess(response) {

        let size = response.data.length;
        let equipamentos = [];

        for(let i=0; i<size; i++){
            let id = response.data[i].id;
            let name = response.data[i].name;
            let brandName = response.data[i].brandName;
            let url = response.data[i].imageUrl;
            let quantity = response.data[i].quantity;
            let priceInEuro = response.data[i].priceInEuro;
            let supplierName = response.data[i].supplierName;
            let description = response.data[i].description;

            let eq = {id, name, brandName, url, quantity, priceInEuro, supplierName,description};
            
            equipamentos.push(eq);
        }

        //console.log(equipments);
        $scope.equipamentos = equipamentos;

    }, function myError(response) {

    });

});