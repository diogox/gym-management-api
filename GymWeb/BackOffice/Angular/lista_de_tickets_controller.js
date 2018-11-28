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


app.controller("ticketsCtrl", function ($scope, $http,$window) {
    //Lista dos Tickets
    getTickets($http, (response) => {
        if (Response) {

            //Formata a data dos Tickets para yyyy-mm-dd hh:mm:ss
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].openedAt = formatDate(response.data[i].openedAt);
                //console.log(response.data[i].birthDate);
            }

            //Atualiza a Lista de Clientes
            $scope.Tickets = response.data;

        } else {
            console.log("Falha ao Carregar a Tabela!");
            $scope.firstName = "Falha ao Carregar a Tabela!"

            //Gestão de Erros
            //Validações
        }
    });

    //Vai para a página do Ticket 
    $scope.getthisTicket = function(ticket){
        //console.log(ticket.id);
        window.location.href = '#!ticket/'+ticket.id;
    };
});