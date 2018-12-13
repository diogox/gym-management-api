import { getAllClients, getClient } from './pedidos.js'

// ########################### CALENDARIO ###########################

let infos = [];

/**
 * Função chamada para criar um novo grafico calendario  
 */
export function newCalendarChart($http) {
    infos = [];
    prepareDataToCalendar($http);
}

/**
 * Função que organiza os dados para desenhar um gráfico calendario com os
 * totais de entradas no ginasio  
 */
function prepareDataToCalendar($http) {

    // Obtem todos os clients
    getAllClients($http, (result) => {
        if (result) {

            // datas de entradas
            let datas = [];

            // Retirar todas as entradas existentes no ginásio
            for (let i = 0; i < result.data.length; i++) {
                for (let j = 0; j < result.data[i].checkInHistory.length; j++) {
                    datas.push(result.data[i].checkInHistory[j].at);
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

            /* formatedDatas = ["11-12-2018", "12-12-2018", "13-12-2018",
                 "11-10-2018", "12-10-2018",
                 "11-12-2019", "12-12-2019", "13-12-2018"];*/

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
                infos.push(info);

            }

            prepareCalendarChart();

        } else {

        }


    });

}

/**
 * Função que prepara o gráfico calendário
 */
function prepareCalendarChart() {

    google.charts.load("current", { packages: ["calendar"] });
    google.charts.setOnLoadCallback(drawCalendarChart);
}

/**
 * Função que desenha o gráfico calendario
 */
function drawCalendarChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows(infos);

    var chart = new google.visualization.Calendar(document.getElementById('calendario_entradas'));

    var options = {
        //title: "Quantidade de entradas",
        //height: 3000,
        noDataPattern: {
            backgroundColor: '#76a7fa',
            color: '#a0c3ff'
        },


    };

    chart.draw(dataTable, options);

}


// ########################### Histograma atividade ###########################

let infosHist = [];

/**
 * Função chamada para criar um novo grafico histograma  
 */
export function newHistogtramChart($http) {
    infosHist = [];
    prepareDataToHistogram($http);
}

/**
 * Função que organiza os dados para desenhar um gráfico histograma com os
 * totais de entradas no ginasio por cliente
 */
function prepareDataToHistogram($http) {

    infosHist.push(["Membros", "Total de check-in"]);

    // Obtem todos os clients
    getAllClients($http, (result) => {
        if (result) {

            for (let i = 0; i < result.data.length; i++) {
                let clientIdentification = result.data[i].id + " - " + result.data[i].firstName + " " + result.data[i].lastName;
                infosHist.push([clientIdentification, result.data[i].checkInHistory.length]);
            }

            prepareHistogramChart();

        } else {

        }
    });
}

/**
 * Função que prepara o gráfico histograma
 */
function prepareHistogramChart() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawHistogramChart);
}

/**
 * Função que desenha o gráfico histograma
 */
function drawHistogramChart() {
    var data = google.visualization.arrayToDataTable(infosHist);

    var options = {
        //title: 'Total de visitas ao gym',
        legend: { position: 'none' },
    };

    var chart = new google.visualization.Histogram(document.getElementById('histograma_entradas'));
    chart.draw(data, options);
}

// ########################### Line atividade ###########################

let infosLine = [];

/**
 * Função chamada para criar um novo grafico linear  
 */
export function newLineChart($http) {
    infosLine = [];
    prepareDataToLine($http);
}

/**
 * Função que organiza os dados para desenhar um gráfico linear com os
 * totais de entradas no ginasio por ano
 */
function prepareDataToLine($http) {

    infosLine.push(["Ano", "Entradas"]);

    // Obtem todos os clients
    getAllClients($http, (result) => {
        if (result) {

            let entradasAno = {};

            for (let i = 0; i < result.data.length; i++) {
                for (let j = 0; j < result.data[i].checkInHistory.length; j++) {
                    let data = result.data[i].checkInHistory[j].at;
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
                infosLine.push([key, value]);
            }

            prepareLineChart();

        } else {

        }
    });
}

/**
 * Função que prepara o gráfico linear
 */
function prepareLineChart() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawLineChart);
}

/**
 * Função que desenha o gráfico linear
 */
function drawLineChart() {
    var data = google.visualization.arrayToDataTable(infosLine);

    var options = {
        //title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_entradas'));
    chart.draw(data, options);
}


// ########################### Line client atividade ###########################

let infosClientLine = [];

/**
 * Função chamada para criar um novo grafico linear
 */
export function newLineClientChart($http, id) {
    infosClientLine = [];
    prepareDataToLineClient($http, id);
}

/**
 * Função que organiza os dados para desenhar um gráfico linear com os
 * totais de entradas no ginasio por ano de um user
 */
function prepareDataToLineClient($http, id) {

    infosClientLine.push(["Ano", "Entradas"]);

    // Obtem todos os clients
    getClient($http, id, (result) => {
        if (result) {

            let entradasAno = {};

            for (let i = 0; i < result.data.checkInHistory.length; i++) {
                let data = result.data.checkInHistory[i].at;
                data = data.split("-");

                let ano = data[0];

                if (ano in entradasAno) {
                    entradasAno[ano] = entradasAno[ano] + 1;
                } else {
                    entradasAno[ano] = 1;
                }

            }

            for (let [key, value] of Object.entries(entradasAno)) {
                infosClientLine.push([key, value]);
            }

            prepareLineChartClient();

        } else {

        }
    });
}

/**
 * Função que prepara o gráfico linear
 */
function prepareLineChartClient() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawLineChartClient);
}

function drawLineChartClient() {
    var data = google.visualization.arrayToDataTable(infosClientLine);

    var options = {
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_entradas_cliente'));
    chart.draw(data, options);
}