//Get the chart canvas
const chartCanvas = document.getElementById('expenditure-chart');

//Feed in chart data set
let expenditureChart = new Chart(chartCanvas, {
    type: 'line',
    data: {
        datasets: [
            {fill: 'origin'},      // 0: fill to 'origin'
            {fill: '+2'},          // 1: fill to dataset 3
            {fill: 1},             // 2: fill to dataset 1
            {fill: false},         // 3: no fill
            {fill: '-2'}           // 4: fill to dataset 2
        ],
        labels: ['January', 
                 'February', 
                 'March', 
                 'April', 
                 'May', 
                 'June', 
                 'July', 
                 'August', 
                 'September', 
                 'October', 
                 'November', 
                 'December'
        ],
        datasets: [{
            label: 'Amount Spent (Billions)',
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
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
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }, 
        legend: {
            display: false,
        }
    }
});

/*
let type = 'line';//Chart type
let data = {};//Chart data
let options = {};//Chart display options

//Initialize the chart
let expenditureChart = new Chart(type, data, options);
*/