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

//Format date to yyyy-mm-dd
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//CLIENTE
//Controller que recolhe a informação do Form Client e envia para a API
app.controller("adicionarCliente", function ($scope, $http) {
    $scope.submit = function () {
        //Formata a dob do user
        let date = new Date($scope.user.birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        let user = $scope.user;
        //Calcula a idade do user através da sua dob
        user.age = getAge(date);
        let data = JSON.stringify(user);
        //console.log(data);
        $http({
            method: "POST",
            data: data,
            url: "https://localhost:5001/api/clients/",
            headers: {
                'content-type': "application/json"
            }
        }).then(function mySuccess(response) {
            console.log("Cliente adicionado com sucesso!");
            let resposta = response.data;

            //Formata a birthdate do cliente para yyyy-mm-dd
            resposta.birthDate = formatDate(resposta.birthDate);
            
            //Atualiza a lista sem dar refresh na pagina
            let list = $scope.Clientes;
            list.push(resposta);
            $scope.Clientes = list

            //Dá reset e close no Modal from
            $('#addClient form :input').val("");
            $('#addClient').modal('toggle');
        }, function myError(response) {
            console.log("Erro ao adicionar Cliente!");

            //Dá reset e close no Modal from
            $('#addClient form :input').val("");
            $('#addClient').modal('toggle');

            //Gestão de Erros
            //Validações
        });

    };
});

//Controller que recolhe a informação do Form EdClient copia para um novo cliente e envia para a API para assim editar o Cliente
app.controller("editarCliente", function ($scope, $http) {
    $scope.edsubmit = function () {
        let oldClient = $scope.Clientes.find(x => x.id === $scope.idclienteedit);

        //console.log(oldClient);
        //Copia as informações todas do oldClient para um novo Cliente incluindo as informações inalteraveis (Pkanos de treino, etc)
        let newClient = oldClient;
            
        //Atribui as novas informções ao newClient
            newClient.id = $scope.idclienteedit;
            newClient.firstName = $scope.user.firstName;
            newClient.lastName = $scope.user.lastName;
            newClient.birthDate = $scope.user.birthDate;

            //Formata a dob do user
            let date = new Date(newClient.birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

            //Calcula a idade do user através da sua dob
            newClient.age = getAge(date); 
            
            newClient.nif = $scope.user.nif;
            newClient.heightInMeters = $scope.user.heightInMeters;
            newClient.weightInKg = $scope.user.weightInKg;
            newClient.imageUrl = $scope.user.imageUrl;
        //console.log(newClient);
        $http({
            method: "PUT",
            data: newClient,
            url: "https://localhost:5001/api/clients/" + $scope.idclienteedit,
            headers: {
                'content-type': "application/json"
            }
        }).then(function mySuccess(response) {
            console.log("Cliente editado com sucesso!");

            //Dá reset e close no Modal from
            $('#editarClient form :input').val("");
            $('#editarClient').modal('toggle');
        }, function myError(response) {
            console.log("Erro ao adicionar Cliente!");

            //Dá reset e close no Modal from
            $('#editarClient form :input').val("");
            $('#editarClient').modal('toggle');

            //Gestão de Erros
            //Validações
        });
    };
});







//FUNCIONÁRIOS
//Controller que recolhe a informação do Form Staff e envia para a API
app.controller("adicionarStaff", function ($scope, $http) {
    //Select para a escolha do Rank do funcionário
    $scope.franks = ["Manager","Receptionist","Trainer","CleaningPerson"];

    $scope.submit = function () {
        //Formata a dob do staff
        let date = new Date($scope.staff.birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        let staff = $scope.staff;
        //Calcula a idade do staff através da sua dob
        staff.age = getAge(date);

        //Set hasBeenPaidThisMonth para false pois quando o funcionário é adicionado não recebe
        staff.hasBeenPaidThisMonth = false;

        let data = JSON.stringify(staff);
        //console.log(data);
        $http({
            method: "POST",
            data: data,
            url: "https://localhost:5001/api/staff/",
            headers: {
                'content-type': "application/json"
            }
        }).then(function mySuccess(response) {
            console.log("Funcionário adicionado com sucesso!");
            let resposta = response.data;

            //Formata a birthdate do Funcionário para yyyy-mm-dd
            resposta.birthDate = formatDate(resposta.birthDate);
            
            //Atualiza a lista sem dar refresh na pagina
            let list = $scope.funcionarios;
            list.push(resposta);
            $scope.funcionarios = list

            //Dá reset e close no Modal from
            $('#addFunc form :input').val("");
            $('#addFunc').modal('toggle');

        }, function myError(response) {
            console.log("Erro ao adicionar Funcionário!");

            //Dá reset e close no Modal from
            $('#addFunc form :input').val("");
            $('#addFunc').modal('toggle');




            //Gestão de Erros
            //Validações
        });
    };
});

//Controller que recolhe a informação do Form EdFunc copia para um novo Func e envia para a API para assim editar o Func
app.controller("editarStaff", function ($scope, $http) {
    //Select para o Rank
    $scope.franks = ["Manager","Receptionist","Trainer","CleaningPerson"];

    //Select para HasBeenPaidThisMonth
    $scope.paid = [true,false];

    $scope.edsubmit = function () {
        let oldStaff = $scope.funcionarios.find(x => x.id === $scope.idstaffedit);

        //console.log(oldStaff);
        //Copia as informações todas do oldStaff para um novo Staff incluindo as informações inalteraveis
        let newStaff = oldStaff;

            //Atribui as novas informções ao newStaff
            newStaff.id = $scope.idstaffedit;
            newStaff.firstName = $scope.staff.firstName;
            newStaff.lastName = $scope.staff.lastName;
            newStaff.birthDate = $scope.staff.birthDate;

            //Formata a dob do user
            let date = new Date(newStaff.birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

            //Calcula a idade do user através da sua dob
            newStaff.age = getAge(date); 

            newStaff.nif = $scope.staff.nif;
            newStaff.email = $scope.staff.email;
            newStaff.rank = $scope.staff.rank;
            newStaff.hasBeenPaidThisMonth = $scope.staff.hasBeenPaidThisMonth;
            newStaff.salary = $scope.staff.salary;
            newStaff.imageUrl = $scope.staff.imageUrl;
        //console.log(newStaff);

        $http({
            method: "PUT",
            data: newStaff,
            url: "https://localhost:5001/api/staff/" + $scope.idstaffedit,
            headers: {
                'content-type': "application/json"
            }
        }).then(function mySuccess(response) {
            console.log("Funcionário editado com sucesso!");

            //Dá reset e close no Modal from
            $('#editarStaff form :input').val("");
            $('#editarStaff').modal('toggle');
        }, function myError(response) {
            console.log("Erro ao adicionar Funcionário!");

            //Dá reset e close no Modal from
            $('#editarStaff form :input').val("");
            $('#editarStaff').modal('toggle');

            //Gestão de Erros
            //Validações
        });
    };
});

















//Equipamentos


//Tickets