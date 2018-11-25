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

export function getExercices($http, callback){

    $http({

        method : "GET",
        url : "https://localhost:5001/api/exercises/"

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
        data: ticket,
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