import { getClientNotifications, readNotification } from './pedidos.js'
import { checkLogin } from './myutil.js'

// Controller do notificacoes
app.controller('notificacoesCtrl', function ($scope, $http, $rootScope) {

    let login = checkLogin();
    let userType = login.userType;

    if (!login) {

        window.location.href = "index.html#!login";

    } else if (userType !== "Client") {

        window.location.href = "index.html#!403";

    } else {

        // Indicar ao controler da página principal que o menu lateral deve ser oculto
        $rootScope.$broadcast('show-window', 'true');

        // Obtem o id do utilizador que fez login
        let myId = login.userTypeId;

        // lista de notificações
        let notificacoes = [];

        // Lista de notificações divididas em chuncks
        let notificationChuncks = [];

        // Página atual da lista de notificações
        let currentPage = 0;

        // links com as imagens de notificações lidas ou nao lidas
        const okImage = "https://png.pngtree.com/svg/20170526/ok_icon_977110.png";
        const notOkImage = "https://cdn4.iconfinder.com/data/icons/basic-ui/512/ui-02-512.png";

        getClientNotifications($http, myId, (response) => {

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

            // Divide o array de notificações em chuncks para efeitos de paginação,
            // onde a variavel chunck define o numero de itens por pagina
            var i, j, temparray, chunk = 14;
            for (i = 0, j = notificacoes.length; i < j; i += chunk) {
                temparray = notificacoes.slice(i, i + chunk);
                notificationChuncks.push(temparray);
            }

            // Obtem a quantidade de página de acordo com o numero de chuncks
            let numberOfPages = [];
            for (let i = 0; i < notificationChuncks.length; i++) {
                numberOfPages.push({ index: i });
            }

            // Lista com tantos elementos quanto o numero de chuncks
            $scope.numberPages = numberOfPages;


            // Atualiza a vista
            $scope.notificacoes = notificationChuncks[0];

            // Quando a página estiver pronta, coloca a pagina 0 como selecionada
            // e coloca a pagina anterior como disabled
            $(document).ready(function () {
                document.getElementById("page0").classList.add("active");
                document.getElementById("pageback").classList.add("disabled");

                // Se só existir uma página, então o botão de próxima página também fica disabled
                if (notificationChuncks.length == 1) {
                    document.getElementById("pagenext").classList.add("disabled");
                }

            });

        });


        // Quando clica no numero de uma página
        $scope.setPage = function (page) {

            // currentPage recebe a página selecionada
            currentPage = page;

            // Atualiza a vista com as notificações dessa página
            $scope.notificacoes = notificationChuncks[page];

            // Remove o estivo de ativa da página anteriormente ativa
            document.getElementsByClassName("active")[0].classList.remove("active");

            // Essa página fica com estilo de ativa
            document.getElementById("page" + page).classList.add("active");

            // Se só existir uma página, então não é preciso alterar estilos
            if (notificationChuncks.length > 1) {
                // Conforme o numero da página, define os estilos dos botões de pagina anterior e próxima
                if (page == 0) {
                    document.getElementById("pageback").classList.add("disabled");
                    document.getElementById("pagenext").classList.remove("disabled");
                } else if (page == notificationChuncks.length - 1) {
                    document.getElementById("pageback").classList.remove("disabled");
                    document.getElementById("pagenext").classList.add("disabled");
                } else {
                    document.getElementById("pageback").classList.remove("disabled");
                    document.getElementById("pagenext").classList.remove("disabled");
                }
            }

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