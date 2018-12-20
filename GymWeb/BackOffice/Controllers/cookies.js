//Determinar uma Cookie
export function setCookie(cookieName, cookieValue, cookieExpires) {
    let d = new Date(cookieExpires);
    let date = "expires=" + d;
    document.cookie = cookieName + "=" + cookieValue + ";" + date + ";path=/";
}

//Retornar uma Cookie
export function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Delete Cookie
export function deletCookie(cookieName) {
    document.cookie = cookieName + "=" + " " + ";" + "-1" + ";path=/";
}