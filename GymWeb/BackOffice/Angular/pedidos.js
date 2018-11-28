//Clientes
//Get all Clients
export function getClients($http, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/clients/"
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Client by ID
export function getClientsByID($http,id, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/clients/"+id
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Cliente pelo ID
export function removeClient($http, id, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/clients/" + id
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Cliente
export function adicionarClient($http, data, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/clients/",
        headers: {
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
export function editarClient($http,data,id,callback){
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/clients/" + id,
        headers: {
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
export function getStaff($http, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/staff/"
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Staff by ID
export function getStaffByID($http,id, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/staff/"+id
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Staff pelo ID
export function removeStaff($http, id, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/staff/" + id
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Staff
export function adicionarStaff($http, data, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/staff/",
        headers: {
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
export function editarStaff($http,data,id,callback){
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/staff/" + id,
        headers: {
            'content-type': "application/json"
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
export function getEquipment($http, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/equipment/"
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Equipamento by ID
export function getEquipmentByID($http,id, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/equipment/"+id
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Equipamento pelo ID
export function removeEquipment($http, id, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/equipment/" + id
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Equipamento
export function adicionarEquipment($http, data, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/equipment/",
        headers: {
            'content-type': "application/json"
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar Equipamento
export function editarEquipment($http,data,id,callback){
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/equipment/" + id,
        headers: {
            'content-type': "application/json"
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
export function getTickets($http, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/"
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get Ticket by ID
export function getTicketByID($http,id, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/"+id
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Remover Ticket pelo ID
export function removeTicket($http, id, callback) {
    $http({
        method: "DELETE",
        url: "https://localhost:5001/api/tickets/" + id
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Adiciconar Ticket
export function adicionarTicket($http, data, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/tickets/",
        headers: {
            'content-type': "application/json"
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Editar Ticket
export function editarTicket($http,data,id,callback){
    $http({
        method: "PUT",
        data: data,
        url: "https://localhost:5001/api/tickets/" + id,
        headers: {
            'content-type': "application/json"
        }
    }).then(function mySuccess(response) {
        //console.log(response)
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get messages from Ticket
export function getMSGSTicket($http,id, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/"+id+"/messages"
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Get message from Ticket
export function getMSGTicket($http,id,messageid, callback) {
    $http({
        method: "GET",
        url: "https://localhost:5001/api/tickets/"+id+"/messages/"+messageid
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}

//Send message to Ticket
export function sendMSGTicket($http,data,id, callback) {
    $http({
        method: "POST",
        data: data,
        url: "https://localhost:5001/api/tickets/"+id+"/messages/",
        headers: {
            'content-type': "application/json"
        }
    }).then(function mySuccess(response) {
        //console.log(response);
        callback(response)

    }, function myError(response) {
        callback(false)
    });
}
















//Planos de Treino
//Exercicios

