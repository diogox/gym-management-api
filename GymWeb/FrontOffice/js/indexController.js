// Controller do index
app.controller('indexCtrl', function ($scope, $http) {

    $scope.$on('show-window', function (event, arg) {

        let emitter = event.name;

        if(emitter === "show-window"){
            if(arg==="false"){
                $scope.hideMenus="y";
                document.getElementById("content").classList.remove("col-10");
                document.getElementById("content").classList.add("col-12");
            }else{
                $scope.hideMenus="";
                document.getElementById("content").classList.remove("col-12");
                document.getElementById("content").classList.add("col-10");
            }
        }
    });

});