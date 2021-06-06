var api = ""; // get your own api (https://www.alphavantage.co/support/#api-key)
var dps = [];
var company = null;
var symbol = "IBM";
var chart = null;
var columns = ["Date", "Open", "High", "Low", "Close", "Adjusted Close", "Volume"];
var data1 = []
var time = []
var price = []



var sub = document.getElementById("submit").addEventListener('click', () => {
    console.log(document.getElementById("Symbol").value.toUpperCase());
    symbol = document.getElementById("Symbol").value.toUpperCase()
    console.log("HIERRRR");
    chartIt2();

    async function chartIt2() {
        document.getElementById("myChart").remove();
        document.getElementById("myChartdiv").innerHTML = '<canvas id="myChart" width="400" height="400"></canvas>';

        await getData()
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time_string,
                datasets: [{
                    label: 'price of ' +symbol,
                    data: price ,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });

    }

    console.log('HIer vor fetch');
    async function getData() {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${api}`

        fetch(url)
            .then((response) => {


                return response.json();

            }).then(resp => {
                var date = resp["Time Series (Daily)"]
                let a = 20;
                let b = 7;
                for (var d in date) {
                    let r = d.split("-");
                    let value = date[d]
                    dps.unshift({ x: new Date(parseInt(r[0]), parseInt(r[1]) - 1, parseInt(r[2])), y: parseFloat(value["4. close"]) });




                }


                for (let i = 0; i < dps.length; i++) {
                    time[i] = dps[i].x
                    price[i] = dps[i].y
                    time_string[i] = time[i].toString()

                }
                for (let j = 0; j < time_string.length; j++) {
                    time_string[j] = time_string[j].substring(0, 15)
                }


            })
    }

})








let time_string = []


chartIt();
async function chartIt() {
    await getData();
    document.getElementById("myChart").remove();
    document.getElementById("myChartdiv").innerHTML = '<canvas id="myChart" width="400" height="400"></canvas>';

    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time_string,
            datasets: [{
                label: 'price',
                data: price,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function (value, index, values) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });

}

console.log('HIer vor fetch');
async function getData() {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${api}`

    fetch(url)
        .then((response) => {


            return response.json();

        }).then(resp => {
            var date = resp["Time Series (Daily)"]
            let a = 20;
            let b = 7;
            for (var d in date) {
                let r = d.split("-");
                let value = date[d]
                dps.unshift({ x: new Date(parseInt(r[0]), parseInt(r[1]) - 1, parseInt(r[2])), y: parseFloat(value["4. close"]) });






            }


            for (let i = 0; i < dps.length; i++) {
                time[i] = dps[i].x
                price[i] = dps[i].y
                time_string[i] = time[i].toString()

            }
            for (let j = 0; j < time_string.length; j++) {
                time_string[j] = time_string[j].substring(0, 15)
            }

        })
}






