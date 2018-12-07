//Determinar uma Cookie
export function setCookie(admin, token, expires) {
    document.cookie = admin + "=" + token + ";" + expires + ";path=/";
}

//Retornar uma Cookie
export function getCookie(admin) {
    var name = admin + "=";
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
export function deletCookie(admin) {
    document.cookie = admin + "=" +" "+";"+"-1"+ ";path=/";
}