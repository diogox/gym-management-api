function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

function checkCookie(cname) {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:","");
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/**
 * Verifica se o utilizador já efetuou login
 */
export function checkLogin() {
    let userType = getCookie("userType");
    let token = getCookie("token");
    let userTypeId = getCookie("userTypeId");

    if(!userType || !token || !userTypeId) {

        deleteCookie("userType");
        deleteCookie("token");
        deleteCookie("userTypeId");

        /*bootbox.alert({
            message: "Você precisa de efetuar login!",
            backdrop: true
        });*/

        return false;

    }else{

        return {userType, token, userTypeId};

    }
}

/**
 * Apaga as cookies assiciadas a um login
 */
function deleteLogin() {
    deleteCookie("userType");
    deleteCookie("token");
    deleteCookie("userTypeId");
}

/**
 * Cria as cookies associadas a um login
 * @param {*} userType tipo de utilizador
 * @param {*} token token de acesso à API
 * @param {*} userTypeId id do utilizador
 * @param {*} expiration data de expiração das cookies
 */
export function newLogin(userType, token, userTypeId, expiration) {

    setCookie("userType", userType, expiration);
    setCookie("token", token, expiration);
    setCookie("userTypeId", userTypeId, expiration);

}

/**
 * Faz logout do utilizador
 */
export function logout() {
    deleteLogin();
}