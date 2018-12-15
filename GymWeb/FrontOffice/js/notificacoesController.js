import { getClientNotifications, readNotification } from './pedidos.js'
import { checkLogin, paginationSplitInChuncks, paginationOnDocumentReady, paginationSetPage } from './myutil.js'

// Controller do notificacoes
app.controller('notificacoesCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;

    if (!login) {

        window.location.href = "index.html#!login";

    } else if (userType === "Staff") {

        window.location.href = "index.html#!403";

    } else if (userType === "Client" || userType === "Admin") {

        // Indicar ao controler da página principal que o menu lateral deve ser oculto
        $rootScope.$broadcast('show-window', 'true');

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // lista de notificações
        let notificacoes = [];

        // Lista de notificações divididas em chuncks
        let notificationChuncks = [];

        // Quantidade de elementos por chunck
        let elementsPerChunck = 5;

        // Página atual da lista de notificações
        let currentPage = 0;

        // links com as imagens de notificações lidas ou nao lidas
        const okImage = "https://png.pngtree.com/svg/20170526/ok_icon_977110.png";
        const notOkImage = "https://cdn4.iconfinder.com/data/icons/basic-ui/512/ui-02-512.png";

        getClientNotifications($http, myId, (response) => {

            if (response) {

                notificacoes = response.data;


                // Percorre todas as notificações
                for (let i = 0; i < notificacoes.length; i++) {

                    // Extrai a data da notificação
                    let data = notificacoes[i].timestamp.split('T')[0];

                    // Extrai a hora da notificação
                    let hora = notificacoes[i].timestamp.split('T')[1].split('.')[0];

                    // Cria nova entrada no objeto para adicionar hora e data separados
                    notificacoes[i].timestamp = data + " " + hora;

                    // Verifica se a notificação está lida ou não para escolher o icon associado
                    if (response.data[i].isUnread) {
                        notificacoes[i].iconNotification = notOkImage;
                    } else {
                        notificacoes[i].iconNotification = okImage;
                    }
                }

                // Reverte o array para as notificações mais recentes ficarem em primeiro lugar
                notificacoes.reverse();

                // Divide o array de notificações em chuncks e retorna um 
                // objeto representativo de cada página(nº de chuncks)
                let pagination = paginationSplitInChuncks(notificacoes, elementsPerChunck);

                // Define o array de chuncks
                notificationChuncks = pagination.arrayChuncks;

                // Lista com tantos elementos quanto o numero de chuncks
                $scope.numberPages = pagination.numberOfPages;

                // Atualiza a vista
                $scope.notificacoes = notificationChuncks[0];

                // Quando a página estiver pronta, coloca a pagina 0 como selecionada
                // e coloca a pagina anterior como disabled
                $(document).ready(function () {

                    // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
                    paginationOnDocumentReady(notificationChuncks);

                });
            } else {

            }
        });

        // Quando clica no numero de uma página
        $scope.setPage = function (page) {

            // currentPage recebe a página selecionada
            currentPage = page;

            // Atualiza a vista com as notificações dessa página
            $scope.notificacoes = notificationChuncks[page];

            // Atualiza a vista dos botões da paginação (clicáveis, desativados, etc)
            paginationSetPage(notificationChuncks, page);

        }

        // Se clicar no botão de página anterior, vai buscar a página atual a decrementa um
        $scope.previousPage = function () {
            $scope.setPage(currentPage - 1);
        }

        // Se clicar no botão de próxima página, vai buscar a página atual a incrementa um
        $scope.nextPage = function () {
            $scope.setPage(currentPage + 1);
        }


        // Quando clica em ler notificação
        $scope.readNotification = function (notificationId) {

            // Pede à API para marcar a ntotificação como lida
            readNotification($http, myId, notificationId, (response) => {

                if (response) {

                    // Percorre as notificações da página
                    for (let i = 0; i < notificacoes.length; i++) {

                        // Se for a notificação que foi marcada como lida, altera o icon
                        // e notifica o controller do index para dominuir o numero de
                        // notificações no item do menu
                        if (notificacoes[i].id == notificationId && notificacoes[i].isUnread == true) {
                            notificacoes[i].isUnread = false;
                            notificacoes[i].iconNotification = okImage;
                            $rootScope.$broadcast('decrease-notification', 'true');
                        }
                    }

                } else {

                }

            });

        }


    }

});