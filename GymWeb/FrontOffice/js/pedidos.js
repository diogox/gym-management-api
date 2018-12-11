import { checkLogin } from './myutil.js'

const domain = "https://gym-lds.herokuapp.com/";  // -> Para usar a API na nuvem
//const domain = "https://localhost:5001/";       // -> Para usar a API local

// GET REQUESTS

/**
 * Função que obtem um cliente pelo seu id  
 * @param {*} id id do cliente a obter
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getClient($http, id, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method : "GET",
        url : domain + "api/clients/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {
        
        callback(response)

    }, function myError(response) {

        callback(false)

    });
}

/**
 * Função que obtem uma lista completa de todos os clientes existentes
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getAllClients($http, callback) {

    let loginData = checkLogin();
    let token = loginData.token;
    
    $http({

        method : "GET",
        url : domain + "api/clients/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {
        
        callback(response)

    }, function myError(response) {

        callback(false)

    });
}

/**
 * Função que efetua o check-in de um cliente especifico
 * @param {*} id id do cliente a efetuar check-in
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function checkin($http, id, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method : "GET",
        url : domain + "api/clients/" + id + "/check-in",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response)

    }, function myError(response) {

        callback(false)

    });
}

/**
 * Função que obtem uma lista completa de exercicos existentes
 * @param {*} callback resposta a enviar após receber o pedido
 */

export function getexercises($http, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method : "GET",
        url : domain + "api/exercises/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que obtem um exercicio especifico pelo seu id
 * @param {*} id id do exercicio a obter
 * @param {*} callback resposta a enviar após receber o pedido
 */

export function getexerciseById($http, id, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method : "GET",
        url : domain + "api/exercises/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que obtem uma lista de equipamentos existentes
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getEquipments($http, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method : "GET",
        url : domain + "api/equipment/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que obtem um equipamento especifico pelo seu id
 * @param {*} id id do equipamento a pesquisar
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getEquipmentById($http, id, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method : "GET",
        url : domain + "api/equipment/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que obtem uma lista dos tickets existentes
 * @param {*} id id do cliente para obter os tickets
 * @param {*} callback resposta a enviar após receber o pedido
 */

export function getTickets($http, id, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method : "GET",
        url : domain + "api/clients/" + id + "/tickets",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que obtem um ticket especifico pelo seu id
 * @param {*} id id do ticket a pesquisar
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getTicketById($http, id, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/tickets/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 *  Função que obtem os exercicios de um plano especifico pelo seu id
 * @param {*} id id do plano a obter os exercicios
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getPlanExercisesById($http, id, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/plans/" + id + "/exercises/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que obtem todos os planos existentes
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getPlanosTreino($http, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/plans/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que obtem um plano especifico pelo seu id
 * @param {*} id id do plano a obter
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function getPlanosTreinoById($http, id, callback) {
    
    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/plans/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que abre um ticket especifico pelo seu id
 * @param {*} id id do ticket a abrir
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function openTicket($http, id, callback) {
    
    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/tickets/" + id + "/open",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que fecha um ticket especifico pelo seu id
 * @param {*} id id do ticket a fechar
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function closeTicket($http, id, callback) {
    
    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/tickets/" + id + "/close",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que retorna todas as notificações de um cliente
 * @param {*} id id do cliente
 * @param {*} callback função que executa após a resposta
 */
export function getClientNotifications($http, id, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/clients/" + id + "/notifications",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

export function readNotification($http, clientId, notificationId, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "GET",
        url: domain + "api/clients/" + clientId + "/notifications/" + notificationId + "/read",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });

}

/**
 * Função que efetua o login do cliente
 * @param {*} dataSend dados a enviar no pedido para poder efetuar o login
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function loginUser($http, dataSend, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "POST",
        data: dataSend,
        url: domain + "api/auth/login",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

// POST REQUESTS

/**
 * Função que adiciona uma resposta a um ticket especifico pelo seu id
 * @param {*} id id do ticket a adicioanar uma resposta
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function addAnswerToTicket($http, id, dataSend, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({
        method: "POST",
        data: dataSend,
        url: domain + "api/tickets/" + id + "/messages",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que cria um ticket
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function createTicket($http, dataSend, callback) {
    
    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "POST",
        data: dataSend,
        url: domain + "api/tickets",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que cria um plano
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function createPlan($http, dataSend, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "POST",
        data: dataSend,
        url: domain + "api/plans",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que cria um exercicio
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function createExercise($http, dataSend, callback){
    
    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "POST",
        data: dataSend,
        url: domain + "api/exercises/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que cria um equipamento
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function createEquipment($http, dataSend, callback){
    
    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "POST",
        data: dataSend,
        url: domain + "api/equipment/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que regista um cliente
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function registerClient($http, dataSend, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "POST",
        data: dataSend,
        url: domain + "api/clients",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

// PUT REQUESTS

/**
 * Função que altera um cliente
 * @param {*} clientId id do cliente a alterar
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function changeClientPlan($http, clientId, dataSend, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "POST",
        data: dataSend,
        url: domain + "api/clients/" + clientId + "/plan/",
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que altera as informações de um exercicio
 * @param {*} id id do exercicio a alterar
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function changeExercise($http, id, dataSend, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "PUT",
        data: dataSend,
        url: domain + "api/exercises/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que altera um equipamento
 * @param {*} id id do equipamento a alterar
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function changeEquipment($http, id, dataSend, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "PUT",
        data: dataSend,
        url: domain + "api/equipment/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que altera um plano
 * @param {*} planId id do plano a alterar
 * @param {*} dataSend dados a enviar no pedido
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function changePlan($http, planId, dataSend, callback) {

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "PUT",
        data: dataSend,
        url: domain + "api/plans/" + planId,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

// DELETE REQUESTS

/**
 * Função que elimina um exercicio
 * @param {*} id id do exercicio a eliminar
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function deleteExercise($http, id, callback){
    
    let loginData = checkLogin();
    let token = loginData.token;
    
    $http({

        method: "DELETE",
        url: domain + "api/exercises/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que elimina um equipamento
 * @param {*} id id do equipamento a eliminar
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function deleteEquipment($http, id, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "DELETE",
        url: domain + "api/equipment/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}

/**
 * Função que elimina um plano
 * @param {*} id id do plano a eliminar
 * @param {*} callback resposta a enviar após receber o pedido
 */
export function deletePlan($http, id, callback){

    let loginData = checkLogin();
    let token = loginData.token;

    $http({

        method: "DELETE",
        url: domain + "api/plans/" + id,
        headers: {
            'authorization': "bearer "+ token,
            'content-type': "application/json",
        }

    }).then(function mySuccess(response) {

        callback(response);

    }, function myError(response) {

        callback(false);

    });
}
