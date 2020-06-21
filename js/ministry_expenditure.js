const data = [
  {
    ministry: "Water Resources",
    minister: "Muhammad",
    twitter: "mo",
    amount: 50000000,
  },
  {
    ministry: "Agriculture",
    minister: "Muhammad",
    twitter: "mo",
    amount: 75000000,
  },
  {
    ministry: "Water Resources",
    minister: "Muhammad",
    twitter: "mo",
    amount: 35000000,
  },
  {
    ministry: "Agriculture",
    minister: "Muhammad",
    twitter: "mo",
    amount: 47000000,
  },
  {
    ministry: "Water Resources",
    minister: "Muhammad",
    twitter: "mo",
    amount: 65000000,
  },
  {
    ministry: "Agriculture",
    minister: "Muhammad",
    twitter: "mo",
    amount: 20000000,
  },
  {
    ministry: "Water Resources",
    minister: "Muhammad",
    twitter: "mo",
    amount: 90000000,
  },
  {
    ministry: "Agriculture",
    minister: "Muhammad",
    twitter: "mo",
    amount: 25000000,
  },
  {
    ministry: "Water Resources",
    minister: "Muhammad",
    twitter: "mo",
    amount: 50000000,
  },
  {
    ministry: "Agriculture",
    minister: "Muhammad",
    twitter: "mo",
    amount: 25000000,
  },
];
const createCol = (content, classes) => {
  let contentCol = document.createElement("td");
  contentCol.append(content);
  for (let aClass of classes) {
    contentCol.classList.add(aClass);
  }
  return contentCol;
};

let table = document.querySelector("#myTable");
for (let item of data) {
  let row = document.createElement("tr");
  row.appendChild(createCol(item.ministry, ["ministry"]));
  row.appendChild(createCol(item.minister, ["minister"]));
  let link = document.createElement("a");
  link.setAttribute("href", `https://twitter.com/${item.twitter}`);
  link.innerText = `@${item.twitter}`;
  row.appendChild(createCol(link, []));
  let amountInNaira = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  }).format(item.amount);
  row.appendChild(createCol(amountInNaira, []));
  table.appendChild(row);
}

const ctx = document.getElementById('graph_canvas').getContext('2d');
//the new object helps plot a line chart from chart.js  
let chart = new Chart(ctx, { 
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['', '', '', '', '', '', '','','','',''],
        datasets: [{
            fill: 'origin',
            backgroundColor: [
                'rgba(0,128,0,0.2)'
            ],
            pointBackgroundColor: "#00945E",
            pointBorderColor: "#00945E",
            pointHoverBackgroundColor: "#00945E",
            pointHoverBorderColor: "#00945E",
            lineTension:0,
            data: [30, 10, 5, 2, 20, 30, 47,23,9,10],
            borderColor: '#00945E',
            borderWidth: 1,
            label: ''
        }]
    },

    // Configuration options go here
    options: {
      scales: {
        xAxes: [{
            gridLines: {
                color: "#ddd",
                display:false
            },
            ticks: {
                fontSize: 15,
                fontColor: "black",
                maxTicksLimit: 30
            },
        }],
        yAxes: [{
            gridLines: {
              color: "#ddd"
            },
            ticks: {
                fontSize: 11,
                fontColor: "black",
                beginAtZero: false,     
            }
        }]
    },
    title: {
      display: false
    },
      legend: {
        display:false
      }
  }
});

data
  .sort((m1, m2) => m1.amount - m2.amount)
  .slice(0, 10)
  .forEach((topMinistry, index) => {
    document.querySelector(`#rank${index + 1}`).innerHTML =
      topMinistry.ministry;
});