import { getStaff, removeStaff, adicionarStaff, editarStaff } from './pedidos.js'
import { setCookie, getCookie } from './cookies.js'

//Format date to yyyy-mm-dd
function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


//Age Function - Calcula a idade do user através da sua dob
function getAge(DOB) {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
}


//Lista de Staff
app.controller("staffCtrl", function ($scope, $http, $rootScope) {

    //Verifica se o admin está logged se não estiver redireciona para a página de Login (Comentário no "if statement" para testar na api sem auth)
    if (getCookie("admin") == "" || getCookie("usertype") != "Admin") {
        window.location.href = "#!login";
    }

    // Indicar ao controler da página principal que o menu lateral deve ser mostrado
    $rootScope.$broadcast('show-window', 'true');

    //Estilo do Alerta de Erro
    $scope.redAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "red"
    }

    //Estilo do Alerta de Sucesso
    $scope.greenAlert = {
        "width": "100%",
        "color": "white",
        "background-color": "green"
    }


    //Alertas
    $scope.alerts = [
        //Erro ao Adicionar um Funcionário Index:0
        { type: 'Error', msg: 'Erro ao Adicionar o Funcionário!', style: $scope.redAlert, show: false },
        //Sucesso ao Adicionar um Funcionário Index:1
        { type: 'Success', msg: 'Funcionário Adicionado com Sucesso!', style: $scope.greenAlert, show: false },
        //Sucesso ao Editar um Funcionário Index:2
        { type: 'Success', msg: 'Funcionário Editado com Sucesso!', style: $scope.greenAlert, show: false },
        //Erro ao Editar um Funcionário Index:3
        { type: 'Error', msg: 'Erro ao Editar o Funcionário!', style: $scope.redAlert, show: false },
        //Erro ao Carregar a Tabela de Funcionários Index:4
        { type: 'Error', msg: 'Erro ao Carregar a Tabela de Funcionários!', style: $scope.redAlert, show: false },
    ];

    //Fechar Alerta pelo ID
    $scope.closeAlert = function (index) {
        $scope.alerts[index].show = false;
    }

    //Listar todos os Funcionários
    //Executa a função para pedir os dados à API
    let token = getCookie('admin');
    getStaff($http,token,(response) => {
        if (response) {
            //console.log(response.data);

            //Formata a BirthDate dos Funcionários para yyyy-mm-dd
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].birthDate = formatDate(response.data[i].birthDate);
                //console.log(response.data[i].birthDate);
            }

            $scope.funcionarios = response.data;
        } else {
            $scope.alerts[4].show = true;
        }
    });


    //Select para a escolha do Rank do funcionário
    $scope.franks = ["Manager", "Receptionist", "Trainer", "CleaningPerson"];


    //Adicionar Funcionário
    $scope.submitADD = function () {
        //Formata a dob do staff
        let date = new Date($scope.staff.birthDate);
        let staff = $scope.staff;
        //Calcula a idade do staff através da sua dob
        staff.age = getAge(date);

        //Set hasBeenPaidThisMonth para false pois quando o funcionário é adicionado não recebe
        staff.hasBeenPaidThisMonth = false;

        staff.confirmPassword = null;
        let data = JSON.stringify(staff);
        //console.log("Funcionário"+data);

        let token = getCookie("admin");
        adicionarStaff($http, data, token, (response) => {
            if (response) {
                let resposta = response.data;

                //Formata a birthdate do Funcionário para yyyy-mm-dd
                resposta.birthDate = formatDate(resposta.birthDate);

                //Atualiza a lista sem dar refresh na pagina
                let list = $scope.funcionarios;
                list.push(resposta);
                $scope.funcionarios = list

                //Dá reset e close no Modal form
                $('#addFunc form :input').val("");
                $('#addFunc').modal('toggle');
                $scope.alerts[1].show = true;
            } else {
                //Dá reset e close no Modal form
                $('#addFunc form :input').val("");
                $('#addFunc').modal('toggle');
                $scope.alerts[0].show = true;
            }
        });
    };


    //Select para HasBeenPaidThisMonth
    $scope.paid = [true, false];

    //Antigo Staff
    let oldStaff
    //Editar Funcionário
    $scope.edsubmit = function () {


        //console.log(oldStaff);
        //Copia as informações todas do oldStaff para um novo Staff incluindo as informações inalteraveis
        let newStaff = oldStaff;

        //Atribui as novas informções ao newStaff
        newStaff.id = $scope.idstaffedit;
        newStaff.firstName = $scope.edstaff.firstName;
        newStaff.lastName = $scope.edstaff.lastName;
        newStaff.birthDate = formatDate($scope.edstaff.birthDate);

        //Formata a dob do user
        let date = new Date(newStaff.birthDate);

        //Calcula a idade do user através da sua dob
        newStaff.age = getAge(date);

        newStaff.nif = $scope.edstaff.nif;
        newStaff.email = $scope.edstaff.email;
        newStaff.hasBeenPaidThisMonth = $scope.edstaff.hasBeenPaidThisMonth;
        newStaff.salary = $scope.edstaff.salary;
        newStaff.imageUrl = $scope.edstaff.imageUrl;
        //console.log(newStaff);

        let token = getCookie("admin");
        editarStaff($http, newStaff, $scope.idstaffedit, token, (response) => {
            if (response) {
                $scope.edstaff = null;

                //Dá reset e close no Modal form
                $('#editarStaff form :input').val("");
                $('#editarStaff').modal('toggle');
                $scope.alerts[2].show = true;
            } else {

                //Dá reset e close no Modal form
                $('#editarStaff form :input').val("");
                $('#editarStaff').modal('toggle');
                $scope.alerts[3].show = true;
            }
        });
    };


    //Remove o Staff da Base de Dados
    $scope.rmStaff = function (id) {
        //console.log($scope.funcionarios);
        //console.log(id);

        let token = getCookie("admin");
        removeStaff($http, id, token, (response) => {
            if (response) {

                //console.log("Removido com Sucesso!");
                $scope.funcionarios = $.grep($scope.funcionarios, function (e) {
                    return e.id != id;
                });

                //Dá close no Modal from
                $('#removerfunc').modal('toggle');

            } else {

                //console.log("Erro ao remover Funcionário");

                //Dá close no Modal from
                $('#removerfunc').modal('toggle');

                //Gestão de Erros
                //Validações

            }
        });
    }
    //Abre um popup para colocar nova informação do Funcionário
    $scope.edStaff = function (id) {
        $scope.idstaffedit = id;
        oldStaff = $scope.funcionarios.find(x => x.id === $scope.idstaffedit);
        $scope.edstaff = oldStaff;
    }

    //Abre um popup para confirmar a remoção do Funcionário
    $scope.removeFunc = function (id) {
        $scope.idfuncremove = id;
    }


});