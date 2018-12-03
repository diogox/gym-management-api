export function getClient($http, id, callback) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/clients/" + id

    }).then(function mySuccess(response) {
        
        callback(response)

    }, function myError(response) {

        callback(false)

    });

}

export function getAllClients($http, callback) {
    
    $http({

        method : "GET",
        url : "https://localhost:5001/api/clients/"

    }).then(function mySuccess(response) {
        
        callback(response)

    }, function myError(response) {

        callback(false)

    });

}

export function checkin($http, id, callback) {

    // Efetua pedido para realizar check-in do cliente
    $http({

        method : "GET",
        url : "https://localhost:5001/api/clients/" + id + "/check-in"

    }).then(function mySuccess(response) {

        callback(response)

    }, function myError(response) {

        callback(false)

    });

}

export function getexercises($http, callback){

    $http({

        method : "GET",
        url : "https://localhost:5001/api/exercises/"

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function getexerciseById($http, id, callback){

    $http({

        method : "GET",
        url : "https://localhost:5001/api/exercises/" + id

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function getEquipments($http, callback) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/equipment/"

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function getEquipmentById($http, id, callback) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/equipment/" + id

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function getTickets($http, callback) {

    $http({

        method : "GET",
        url : "https://localhost:5001/api/tickets"

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function getTicketById($http, id, callback){

    $http({

        method: "GET",
        url: "https://localhost:5001/api/tickets/" + id

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });


}

export function addAnswerToTicket($http, id, dataSend, callback){

    $http({
        method: "POST",
        data: dataSend,
        url: "https://localhost:5001/api/tickets/" + id + "/messages",
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function createTicket($http, dataSend, callback) {
    
    // Envia ticket para a API
    $http({

        method: "POST",
        data: dataSend,
        url: "https://localhost:5001/api/tickets",
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

export function getPlanExercisesById($http, id, callback){
    // Pede os exercicios de um plano de treino à API
    $http({

        method: "GET",
        url: "https://localhost:5001/api/plans/1/exercises/",
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

export function getPlanosTreino($http, callback) {
    // Pede os exercicios de um plano de treino à API
    $http({

        method: "GET",
        url: "https://localhost:5001/api/plans/",

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

export function getPlanosTreinoById($http, id, callback) {
    // Pede os exercicios de um plano de treino à API
    $http({

        method: "GET",
        url: "https://localhost:5001/api/plans/" + id,

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

export function createPlan($http, dataSend, callback) {

    // Cria novo plano
    $http({

        method: "POST",
        data: dataSend,
        url: "https://localhost:5001/api/plans",
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function changeClientPlan($http, clientId, dataSend, callback) {

    $http({

        method: "PUT",
        data: dataSend,
        url: "https://localhost:5001/api/clients/" + clientId,
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function openTicket($http, id, callback) {
    
    $http({

        method: "GET",
        url: "https://localhost:5001/api/tickets/" + id + "/open",

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function closeTicket($http, id, callback) {
    
    $http({

        method: "GET",
        url: "https://localhost:5001/api/tickets/" + id + "/close",

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function changeExercise($http, id, dataSend, callback) {

    $http({

        method: "PUT",
        data: dataSend,
        url: "https://localhost:5001/api/exercises/" + id,
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function createExercise($http, dataSend, callback){
    
    $http({

        method: "POST",
        data: dataSend,
        url: "https://localhost:5001/api/exercises/",
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function deleteExercise($http, id, callback){
    $http({

        method: "DELETE",
        url: "https://localhost:5001/api/exercises/" + id,
        headers: {
            'content-type': "application/json"
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}