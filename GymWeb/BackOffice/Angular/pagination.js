//Divide a lista de elementos em vários chunks
export function paginationSplitInChunks(array, elementsPerChunck) {
    let arrayChuncks = [];

    // Divide o array total em chuncks para efeitos de paginação,
    // onde a variavel chunck define o numero de itens por pagina
    let i, j, temparray, chunk = elementsPerChunck;
    for (i = 0, j = array.length; i < j; i += chunk) {
        temparray = array.slice(i, i + chunk);
        arrayChuncks.push(temparray);
    }

    // Obtem a quantidade de página de acordo com o numero de chuncks
    let numberOfPages = [];
    for (let i = 0; i < arrayChuncks.length; i++) {
        numberOfPages.push({ index: i });
    }

    return { arrayChuncks, numberOfPages };
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
