// Controller do login
app.controller('loginCtrl', function ($scope, $http, $rootScope) {
    
    // Indicar ao controler da página principal que o menu lateral deve ser oculto
    $rootScope.$broadcast('show-window', 'false');

    $scope.submitLogin = function() {
        console.log($scope.login)
    }

});