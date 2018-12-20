import { getClients } from './pedidos.js'
import { getCookie } from './cookies.js'


//Calendario
let dataCalendario = [];

//Inicia a criação do Calendario
export function newCalendario($http, callback) {
    dataCalendario = [];
    if (getCalDATA($http) == false) {
        callback(false);
    } else {
        callback(true);
    }

}

//Organiza os dados que vão ser mostrados no Calendario
function getCalDATA($http) {
    let token = getCookie("admin");
    getClients($http, token, (response) => {
        if (response) {

            // datas de entradas
            let datas = [];

            // Retirar todas as entradas existentes no ginásio
            for (let i = 0; i < response.data.length; i++) {
                for (let j = 0; j < response.data[i].checkInHistory.length; j++) {
                    datas.push(response.data[i].checkInHistory[j].at);
                }
            }

            // datas formatadas
            let formatedDatas = [];

            // obtem as datas formatadas
            for (let i = 0; i < datas.length; i++) {
                let separated = datas[i].split("-");
                let ano = separated[0];
                let mes = separated[1];
                let dia = separated[2].split("T")[0];

                let data = dia + "-" + mes + "-" + ano;
                formatedDatas.push(data);
            }

            // Datas organizadas por ano, mes e dia
            let organizedDatas = {};

            // Obtem as datas organizadas por ano, mes e dia
            for (let i = 0; i < formatedDatas.length; i++) {

                let sep = formatedDatas[i].split("-");

                // Verifica se o ano está no dicionario de ano
                if (sep[2] in organizedDatas) {

                    // Verifica se o mes está no dicionario de mês
                    if (sep[1] in organizedDatas[sep[2]]) {

                        // Verifica se o dia está no dicionario de dia
                        if (sep[0] in organizedDatas[sep[2]][sep[1]]) {

                            organizedDatas[sep[2]][sep[1]][sep[0]] = organizedDatas[sep[2]][sep[1]][sep[0]] + 1;

                        } else {

                            organizedDatas[sep[2]][sep[1]][sep[0]] = 1;

                        }

                    } else {

                        organizedDatas[sep[2]][sep[1]] = { [sep[0]]: 1 };

                    }


                } else {
                    organizedDatas[sep[2]] = { [sep[1]]: { [sep[0]]: 1 } };
                }

            }

            // Array com as datas ja organizadas por data e numero de registos nessa data
            let countData = [];

            // Obtem entradas organizas por data e numero de entradas nessa data
            for (let [key, value] of Object.entries(organizedDatas)) {

                for (let [key2, value2] of Object.entries(value)) {

                    for (let [key3, value3] of Object.entries(value2)) {

                        let dateOrganized = key + "-" + key2 + "-" + key3 + "-" + value3;
                        countData.push(dateOrganized);

                    }

                }

            }

            // Cria um array com data e numero de entradas para fornecer ao gráfico
            for (let i = 0; i < countData.length; i++) {
                let div = countData[i].split("-");
                let data = new Date(div[0], div[1] - 1, div[2]);
                let info = [data, Number(div[3])];
                dataCalendario.push(info);

            }

            prepareCalendarChart();

        } else {
            return false;
        }


    });

}

//Prepara o Calendario
function prepareCalendarChart() {
    google.charts.load("current", { packages: ["calendar"] });
    google.charts.setOnLoadCallback(drawCalendarChart);
}

//Desenha o Calendario
function drawCalendarChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows(dataCalendario);

    var chart = new google.visualization.Calendar(document.getElementById('relatorio_entradas'));

    var options = {
        noDataPattern: {
            backgroundColor: '#76a7fa',
            color: '#a0c3ff'
        },
    };

    chart.draw(dataTable, options);

}



//Histograma
let dataHisto;

//Inicia a criação do Histograma
export function newHistogram($http, callback) {
    dataHisto = [];
    if (getHistoDATA($http) == false) {
        callback(false);
    } else {
        callback(true);
    }

}

//Organiza os dados que vão ser mostrados no Histograma
function getHistoDATA($http) {
    dataHisto.push(["Membros", "Número de Entradas"])
    let token = getCookie("admin");
    getClients($http, token, (response) => {
        if (response) {

            for (let i = 0; i < response.data.length; i++) {
                let clientIdentification = response.data[i].id + " - " + response.data[i].firstName + " " + response.data[i].lastName;
                dataHisto.push([clientIdentification, response.data[i].checkInHistory.length]);
            }

            prepareHistogramChart();
        } else {
            return false;
        }
    });
}

//Prepara o Histograma
function prepareHistogramChart() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawHistogramChart);
}

//Desenha o Histograma
function drawHistogramChart() {
    var data = google.visualization.arrayToDataTable(dataHisto);

    var options = {
        legend: { position: 'none' },
    };

    var chart = new google.visualization.Histogram(document.getElementById('histograma_entradas'));
    chart.draw(data, options);
}

















//Gráfico Linear
let dataLine = [];

//Inicia a criação do Gráfico Linear
export function newLineChart($http, callback) {
    dataLine = [];
    if (getLineDATA($http) == false) {
        callback(false);
    } else {
        callback(true);
    }

}


//Organiza os dados que vão ser mostrados no Histograma
function getLineDATA($http) {
    dataLine.push(['Ano', 'Entradas']);
    let token = getCookie("admin");

    getClients($http, token, (response) => {
        if (response) {

            let entradasAno = [];

            for (let i = 0; i < response.data.length; i++) {
                for (let j = 0; j < response.data[i].checkInHistory.length; j++) {
                    let data = response.data[i].checkInHistory[j].at;
                    data = data.split("-");

                    let ano = data[0];

                    if (ano in entradasAno) {
                        entradasAno[ano] = entradasAno[ano] + 1;
                    } else {
                        entradasAno[ano] = 1;
                    }

                }
            }

            for (let [key, value] of Object.entries(entradasAno)) {
                dataLine.push([key, value]);
            }

            prepareLinearChart();

        } else {
            return false;
        }
    });





}

//Prepara o Gráfico Linear
function prepareLinearChart() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawCurveTypes);
}


//Desenha o Gráfico Linear
function drawCurveTypes() {
    let data = google.visualization.arrayToDataTable(dataLine);

    let options = {
        curveType: 'function',
        legend: { position: 'bottom' }
    };


    let chart = new google.visualization.LineChart(document.getElementById('line_entradas'));
    chart.draw(data, options);
}