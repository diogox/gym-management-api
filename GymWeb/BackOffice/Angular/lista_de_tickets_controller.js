import { getTickets } from './pedidos.js'

//Format date to yyyy-mm-dd hh:mm:ss
function formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let formatedDate = [year, month, day].join('-') + " " + [hour, minute, seconds].join(':')

    return formatedDate;
}


app.controller("ticketsCtrl", function ($scope, $http, $window) {

    //Estilo do Alerta de Erro
    $scope.redAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "red"
    }

    //Alertas
    $scope.alerts = [
        //Erro ao Carregar a Tabela de Tickets Index:0
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Tickets!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Lista dos Tickets
    getTickets($http, (response) => {
        if (response) {

            //Formata a data dos Tickets para yyyy-mm-dd hh:mm:ss
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].openedAt = formatDate(response.data[i].openedAt);
                //console.log(response.data[i].birthDate);
            }

            //Atualiza a Lista de Clientes
            $scope.Tickets = response.data;

        } else {
            $scope.alerts[0].show = true;
        }
    });

    //Vai para a página do Ticket 
    $scope.getthisTicket = function (ticket) {
        //console.log(ticket.id);
        window.location.href = '#!ticket/' + ticket.id;
    };
});