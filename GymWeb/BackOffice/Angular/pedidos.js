//Login
export function login($http, data, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/auth/login",
        headers: {
            'Content-Type': "application/json"
        }
    }).then(function mySuccess(response) {
        callback(response)
    }, function myError(response) {
        callback(false)
    });
}

//Clientes
//Get all Clients
export function getClients($http, token, callback) {
    console.log(token);
    $http({
        method: "GET",
        url: "https://localhost:5001/api/clients/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}


//Get Client by ID
export function getClientsByID($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/clients/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Cliente pelo ID
export function removeClient($http, id, token, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/clients/" + id,
        headers: {
            'authorization': "bearer " + token,
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Cliente
export function adicionarClient($http, data, token, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/clients/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json"
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar Cliente
export function editarClient($http, data, id, token, callback) {
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/clients/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json"
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}
















//Funcionário
//Get all Staff
export function getStaff($http, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/staff/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Staff by ID
export function getStaffByID($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/staff/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Staff pelo ID
export function removeStaff($http, id, token, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/staff/" + id,
        headers: {
            'authorization': "bearer " + token,
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Staff
export function adicionarStaff($http, data, token, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/staff/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar Cliente
export function editarStaff($http, data, id, token, callback) {
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/staff/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}



















//Equipamentos
//Get all Equipamento
export function getEquipment($http, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/equipment/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Equipamento by ID
export function getEquipmentByID($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/equipment/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Equipamento pelo ID
export function removeEquipment($http, id, token, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/equipment/" + id,
        headers: {
            'authorization': "bearer " + token,
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Equipamento
export function adicionarEquipment($http, data, token, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/equipment/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar Equipamento
export function editarEquipment($http, data, id, token, callback) {
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/equipment/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}



















//Tickets
//Get all Tickets
export function getTickets($http, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Ticket by ID
export function getTicketByID($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Ticket pelo ID
export function removeTicket($http, id, token, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/tickets/" + id,
        headers: {
            'authorization': "bearer " + token,
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Ticket
export function adicionarTicket($http, data, token, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/tickets/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar Ticket
export function editarTicket($http, data, id, token, callback) {
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/tickets/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get messages from Ticket
export function getMSGSTicket($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/" + id + "/messages",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get message from Ticket by messageID
export function getMSGTicket($http, id, messageid, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/" + id + "/messages/" + messageid,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Send message to Ticket
export function sendMSGTicket($http, data, id, token, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/tickets/" + id + "/messages/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Open Ticket
export function openTicket($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/Tickets/" + id + "/open",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //Console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Close Ticket
export function closeTicket($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/Tickets/" + id + "/close",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //Console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Suspend Ticket
export function suspendTicket($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/Tickets/" + id + "/suspend",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //Console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}


























//Exercicios
//Get all exercises
export function getExercises($http, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/exercises/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Receber um Exercicio
export function getExerciseByID($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/exercises/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adicionar um Exercicio
export function addExercises($http, data, token, callback){
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/exercises/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover um Exercicio
export function removeExercise($http, id, token, callback){
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/exercises/" + id,
        headers: {
            'authorization': "bearer " + token,
        }
    }).then(function mySuccess(response){
       //console.log(response)
       callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar um Exercicio
export function editarExercise($http, data, id, token, callback) {
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/exercises/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}












//Planos de Treino
//Get all Planos de Treino
export function getPlanosTreino($http, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/plans",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adicionar um Plano de Treino
export function addPlanoTreino($http, data, token, callback){
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/plans/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover um Plano de Treino
export function removePlanoTreino($http, id, token, callback){
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/plans/" + id,
        headers: {
            'authorization': "bearer " + token,
        }
    }).then(function mySuccess(response){
       //console.log(response)
       callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar um Plano de Treino
export function editarPlanoTreino($http, data, id, token, callback) {
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/plans/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Plano de Treino by ID
export function getPlanoTreinoByID($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/plans/" + id,
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Todos os Exercicios do Plano de Treino by ID
export function getExercisesPlanoTreinoByID($http, id, token, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/plans/"+id+"/exercises/",
        headers: {
            'authorization': "bearer " + token,
            'content-type': "application/json",
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover um Exercicio do Plano de Treino by ID
export function removeExercisePlanoTreinoByID($http, id, idExercise, token, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/plans/"+id+"/exercises/"+idExercise,
        headers: {
            'authorization': "bearer " + token,
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}
