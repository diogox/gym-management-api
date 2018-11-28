import { getTicketByID, getClientsByID, getMSGSTicket, sendMSGTicket } from './pedidos.js'

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

//Controller do Ticket
app.controller('ticketCtrl', function ($scope, $http, $routeParams) {

    //Retirar o id do URL
    let id = $routeParams.id;

    getTicketByID($http, id, (response) => {
        if (response) {
            $scope.id_Ticket = response.data.id;
            $scope.titulo_Ticket = response.data.title;
            $scope.open_Ticket = formatDate(response.data.openedAt);
            $scope.state_Ticket = response.data.state;


            //Ligação para ir buscar o cliente responsável pela criação do Ticket
            getClientsByID($http, response.data.clientId, (response2) => {
                if (response2) {
                    $scope.nome_cliente = response2.data.firstName + " " + response2.data.lastName;
                } else {
                    console.log("Erro ao ir buscar o Cliente que criou o Ticket!");

                    //Gestão de Erros
                    //Validações
                }
            });

            //Ligação para ir buscar as Messagens de um Ticket
            getMSGSTicket($http, id, (response3) => {
                if (response3) {

                    //Formata a data dos Tickets para yyyy-mm-dd hh:mm:ss
                    for (let i = 0; i < response3.data.length; i++) {
                        response3.data[i].at = formatDate(response3.data[i].at);
                        //console.log(response.data[i].birthDate);
                    }
                    $scope.Messages = response3.data;
                } else {
                    console.log("Erro ao ir buscar as Mensagens!");
                }
            });

        } else {
            console.log("Erro ao ir buscar o Ticket!");
            //Gestão de Erros
            //Validações
        }
    });

    //Enviar Mensagem
    $scope.submit = function () {
        //console.log("Enviado!")


        let message = $scope.novaMensagem;
        let supportTicketId = $routeParams.id;
        let from = "Staff";

        let dataSend = { message, from, supportTicketId };

        let data = JSON.stringify(dataSend);
        sendMSGTicket($http, data, id, (response4) => {
            if (response4) {
                console.log("Mensagem enviada com sucesso!");
                let resposta = response4.data;

                //Formata a data da mensagem para yyyy-mm-dd hh:mm:ss
                resposta.at = formatDate(resposta.at);

                //Atualiza a lista sem dar refresh na pagina
                let list = $scope.Messages;
                list.push(resposta);
                $scope.Messages = list

            } else {
                console.log("Erro ao enviar a mensagem!");
                //Gestão de Erros
                //Validações
            }
        });
    }
});