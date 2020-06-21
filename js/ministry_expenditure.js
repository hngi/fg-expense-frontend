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

const add_ministry_list = (json_data)=>{
  for (let item of json_data) {
    let amountInNaira = new Intl.NumberFormat("en-ng", {
        style: "currency",
        currency: "NGN",
      }).format(item.amount);
    ministry_list = document.createElement('tr');
    ministry_list.className = 'ministry_list';
    ministry_list.innerHTML = `<td class="ministry_name">${item.ministry}</td>
        <td>${item.minister}</td>
        <td><a class="ministry_twitter_handle_link">@${item.twitter}</a></td>
        <td class="ministry_list_amount">${amountInNaira}</td>`;
    $('.main_table').append(ministry_list);
  }
}
const add_keyNames = (json_data)=>{
  key_colors = ['*#1F2430*', '*#6765EC*', '*#42E8E0*', '*#2196C4*','*#005D3B*',
              '*#004583*','*#FF0000*','*#BC0A0A*','*#9EFF00*','*#423E85*'];
  for (let num=0; num<=9; num++) {
    str = key_colors[num].slice(1, -1);
    key_body = document.createElement('div');
    key_body.className = 'list_box';
    key_body.innerHTML = `<div style="background: ${str};"></div><p>${json_data[num].ministry}</p>`
    $('.list_plotted').append(key_body);
  }
}
const create_link_to_twitter = (username) =>{
  window.open(`https://twitter.com/${username}`,"_blank");
}
const toggle_filter =()=>{
  if($('.filter_option').css('height') == '40px'){
    $('.filter_option').css('height', '0px');
     $('.filter_option').css('width', '0px');
     $('.filter_option').css('border', 'none');
  }else{
    $('.filter_option').css('height', '40px');
    $('.filter_option').css('width', '230px');
    $('.filter_option').css('border', '1px solid #ddd');
  }
}
$(document).on("click", ".ministry_twitter_handle_link", function(){
  username = $(this).html();
  str = `${username}*`.slice(1,-1);
  create_link_to_twitter(str);
});
$(document).on("click", ".table_filter", toggle_filter);


//draw line chart
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
    },
    tooltips: {
      titleFontSize: 10,
      titleFontColor:'white',
      backgroundColor: '#00945E',
      bodySpacing: 30,
      caretPadding: 10
    }
  }
});
add_ministry_list(data);
add_keyNames(data);

function myFunction(value) {
  event.preventDefault()
  if(value == 'lowHigh') {
    chart.data.datasets[0].data.sort((a, b) => {return a - b})
    chart.update()
    return
 } else {
   chart.data.datasets[0].data.sort((a, b) => {return b - a})
    chart.update()
    return
 }
}