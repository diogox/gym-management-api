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
export function newLogin(userType, token, userTypeId, expiration, callback) {

    setCookie("userType", userType, expiration);
    setCookie("token", token, expiration);
    setCookie("userTypeId", userTypeId, expiration);

    callback();

}

/**
 * Faz logout do utilizador
 */
export function logout() {
    deleteLogin();
}

export function paginationSplitInChuncks(array, elementsPerChunck) {

    let arrayChuncks = [];

    // Divide o array total em chuncks para efeitos de paginação,
    // onde a variavel chunck define o numero de itens por pagina
    var i, j, temparray, chunk = elementsPerChunck;
    for (i = 0, j = array.length; i < j; i += chunk) {
        temparray = array.slice(i, i + chunk);
        arrayChuncks.push(temparray);
    }

    // Obtem a quantidade de página de acordo com o numero de chuncks
    let numberOfPages = [];
    for (let i = 0; i < arrayChuncks.length; i++) {
        numberOfPages.push({ index: i });
    }

    return {arrayChuncks, numberOfPages};

}

export function paginationOnDocumentReady(arrayChuncks) {

    // se nao tiver elementos, a lista de paginas desaparece
    if (arrayChuncks.length == 0) {
        document.getElementById("paginationHide").style.display = "none";
    } else {

        document.getElementById("page0").classList.add("active");
        document.getElementById("pageback").classList.add("disabled");

        // Se só existir uma página, então o botão de próxima página também fica disabled
        if (arrayChuncks.length == 1) {
            document.getElementById("pagenext").classList.add("disabled");
        }

    }
}

export function paginationSetPage(arrayChuncks, page) {

    // Remove o estivo de ativa da página anteriormente ativa
    document.getElementsByClassName("active")[0].classList.remove("active");

    // Essa página fica com estilo de ativa
    document.getElementById("page" + page).classList.add("active");

    // Se só existir uma página, então não é preciso alterar estilos
    if (arrayChuncks.length > 1) {
        // Conforme o numero da página, define os estilos dos botões de pagina anterior e próxima
        if (page == 0) {
            document.getElementById("pageback").classList.add("disabled");
            document.getElementById("pagenext").classList.remove("disabled");
        } else if (page == arrayChuncks.length - 1) {
            document.getElementById("pageback").classList.remove("disabled");
            document.getElementById("pagenext").classList.add("disabled");
        } else {
            document.getElementById("pageback").classList.remove("disabled");
            document.getElementById("pagenext").classList.remove("disabled");
        }
    }
}