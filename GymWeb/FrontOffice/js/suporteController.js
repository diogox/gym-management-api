import { getTickets } from "./pedidos.js";
import { checkLogin, paginationSplitInChuncks, paginationOnDocumentReady, paginationSetPage } from './myutil.js'

// Controller da página de suporte
app.controller('suporteCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;

    if (!login) {
        window.location.href = "index.html#!login";
    } else if (userType === "Staff") {

        window.location.href = "index.html#!403";

    } else if (userType === "Client" || userType === "Admin") {

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // Array que vai conter todos os ticket do cliente
        let tickets = [];

        // Lista de tickets divididas em chuncks
        let ticketsChuncks = [];

        // Quantidade de elementos por chunck
        let elementsPerChunck = 5;

        // Página atual da lista de tickets
        let currentPage = 0;


        // Indicar ao controler da página principal que o menu lateral deve ser mostrado
        $rootScope.$broadcast('show-window', 'true');

        // Pede os tickets à API
        getTickets($http, myId, (response) => {

            // Se a API respondeu da forma correta
            if (response) {



                // Percorre cada um dos tickets
                for (let i = 0; i < response.data.length; i++) {

                    // Reorganiza o formato da data
                    let openedAt = response.data[i].openedAt;
                    let year = openedAt.substring(0, 4);
                    let month = openedAt.substring(5, 7);
                    let day = openedAt.substring(8, 10);
                    let hour = openedAt.substring(11, 13);
                    let minute = openedAt.substring(14, 16);
                    openedAt = day + "-" + month + "-" + year + " " + hour + ":" + minute;

                    // Reorganiza a data e hora num formato mais legível
                    response.data[i].openedAt = openedAt;

                }

                tickets = response.data;

                // Atualiza os tickets para atualizar a vista
                $scope.tickets = tickets;

                atualizarPaginas();

                // Se a API não respondeu da forma correta
            } else {
            }
        });

        // Quando clica no numero de uma página
        $scope.setPage = function (page) {

            // currentPage recebe a página selecionada
            currentPage = page;

            // Atualiza a vista com os tickets dessa página
            $scope.tickets = ticketsChuncks[page];

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationSetPage(ticketsChuncks, page);

        }

        // Se clicar no botão de página anterior, vai buscar a página atual a decrementa um
        $scope.previousPage = function () {
            $scope.setPage(currentPage - 1);
        }

        // Se clicar no botão de próxima página, vai buscar a página atual a incrementa um
        $scope.nextPage = function () {
            $scope.setPage(currentPage + 1);
        }

        /**
         * Atualizar a paginação, separar em chuncks e criar as páginas
         */
        function atualizarPaginas() {

            // Divide o array de tickets em chuncks e retorna um 
            // objeto representativo de cada página(nº de chuncks)
            let pagination = paginationSplitInChuncks(tickets, elementsPerChunck);

            // Define o array de chuncks
            ticketsChuncks = pagination.arrayChuncks;

            // Lista com tantos elementos quanto o numero de chuncks
            $scope.numberPages = pagination.numberOfPages;

            // Atualiza a vista
            $scope.tickets = ticketsChuncks[0];

            // Quando a página estiver pronta, coloca a pagina 0 como selecionada
            // e coloca a pagina anterior como disabled
            $(document).ready(function () {

                // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
                paginationOnDocumentReady(ticketsChuncks);

            });

        }

    }
});