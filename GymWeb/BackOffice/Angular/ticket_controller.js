import { getTicketByID, getClientsByID, getMSGSTicket, sendMSGTicket, openTicket, closeTicket, suspendTicket } from './pedidos.js'

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
app.controller('ticketCtrl', function ($scope, $http, $routeParams, $rootScope) {

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');

    //Estilo do Alerta de Erro
    $scope.redAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "red"
    }

    //Alertas
    $scope.alerts = [
        //Erro ao Carregar o Ticket Index:0
        { type: 'Error', msg: 'Erro ao Carregar o Ticket!', style: $scope.redAlert, show: false },
        //Erro ao Carregar o Criador do Ticket Index:1
        { type: 'Error', msg: 'Erro ao Carregar o Criador do Ticket!', style: $scope.redAlert, show: false },
        //Erro ao Carregar as Mensagens do Ticket Index:2
        { type: 'Error', msg: 'Erro ao Carregar as Mensagens do Ticket!', style: $scope.redAlert, show: false },
        //Erro ao Enviar a Mensagens para a página do Ticket Index:3
        { type: 'Error', msg: 'Erro ao Enviar a Mensagens para a página do Ticket!', style: $scope.redAlert, show: false },
        //Erro a Abrir o Ticket Index:4
        { type: 'Error', msg: 'Erro ao Atualizar o Ticket!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Retirar o id do URL
    let id = $routeParams.id;
    $scope.novaMensagem = "Introduza uma mensagem.";

    getTicketByID($http, id, (response) => {
        if (response) {
            $scope.id_Ticket = response.data.id;
            $scope.titulo_Ticket = response.data.title;
            $scope.open_Ticket = formatDate(response.data.openedAt);
            $scope.state_Ticket = response.data.state;

            //Ver o estado do Ticket
            if ($scope.state_Ticket == "Closed") {
                $scope.ShowClose = false;
                // $scope.ShowSusp = true;
                $scope.ShowOpen = true;
                $scope.showTheForm = false;
            } else if ($scope.state_Ticket == "Open") {
                $scope.ShowClose = true;
                // $scope.ShowSusp = true;
                $scope.ShowOpen = false;
                $scope.showTheForm = true;
            } else {
                $scope.ShowClose = true;
                // $scope.ShowSusp = false;
                $scope.ShowOpen = true;
            }


            //Ligação para ir buscar o cliente responsável pela criação do Ticket
            getClientsByID($http, response.data.clientId, (response2) => {
                if (response2) {
                    $scope.nome_cliente = response2.data.firstName + " " + response2.data.lastName;
                } else {
                    $scope.alerts[1].show = true;
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
                    $scope.alerts[2].show = true;
                }
            });

        } else {
            $scope.alerts[0].show = true;
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
                let resposta = response4.data;

                //Formata a data da mensagem para yyyy-mm-dd hh:mm:ss
                resposta.at = formatDate(resposta.at);

                //Atualiza a lista sem dar refresh na pagina
                let list = $scope.Messages;
                list.push(resposta);
                $scope.Messages = list;
                $scope.novaMensagem = "\n";
            } else {
                $scope.alerts[3].show = true;
            }
        });
    }

    //Close Ticket
    $scope.closeTicket = function () {
        //Pedido para fechar um determinado Ticket
        closeTicket($http, $routeParams.id, (response5) => {
            if (response5) {
                $scope.state_Ticket = "Closed";
                $scope.ShowClose = false;
                //$scope.ShowSusp = true;
                $scope.ShowOpen = true;
                $scope.showTheForm = false;
            } else {
                $scope.alerts[4].show = true;
            }
        });
    }

    //ReOpen Ticket
    $scope.reOpenTicket = function () {
        openTicket($http, $routeParams.id, (response6) => {
            if (response6) {
                $scope.state_Ticket = "Open";
                $scope.ShowClose = true;
                //$scope.ShowSusp = true;
                $scope.ShowOpen = false;
                $scope.showTheForm = true;
            } else {
                $scope.alerts[4].show = true;
            }
        });
    }

    //Suspend Ticket (Futuramente Implementado)
    /*
    $scope.supsTicket = function(){
        suspendTicket($http,$routeParams.id,(response6)=>{
            if(response6){
                $scope.state_Ticket = "Suspend";
                $scope.ShowClose = true;
                $scope.ShowSusp = false;
                $scope.ShowOpen = true;
            }else{
                $scope.alerts[4].show = true;
            }
        });
    }*/
});