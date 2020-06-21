var view_choice = "day";
var sort_choice = "htl";
function show_filter() {
    document.getElementById(view_choice).style.backgroundColor = "#00945e";
    document.getElementById(view_choice).style.color = "white";
    document.getElementById(sort_choice).style.backgroundColor = "#00945e";
    document.getElementById(sort_choice).style.color = "white";
    document.getElementById("filter-screen").style.display = "block";
}

function filterSelectionView(view){
    view_choice = view;
    document.getElementById("day").removeAttribute("style");
    document.getElementById("month").removeAttribute("style");
    document.getElementById("year").removeAttribute("style");
    document.getElementById(view).style.backgroundColor = "#00945e";
    document.getElementById(view).style.color = "white";
}
function filterSelectionSort(sort){
    sort_choice = sort;
    document.getElementById("htl").removeAttribute("style");
    document.getElementById("lth").removeAttribute("style");
    document.getElementById(sort).style.backgroundColor = "#00945e";
    document.getElementById(sort).style.color = "white";
}
function apply(){
    document.getElementById("filter-screen").style.display = "none";
    console.log("View By: ",view_choice); 
    console.log("Sort By: ",sort_choice); 
}



/* 
    API Calls
*/

const tbody = document.querySelector('.expenditure-data');
const closeButton = document.querySelector('.section-wrapper .close-button');

const hidePopup = () => {
    document.querySelector('.section-wrapper').classList.remove('show')
}

const showPopup = expense => {
    document.getElementById('desc').textContent = expense.expenseDesc
    document.getElementById('date').textContent = formatDate(expense.paymentDate)
    document.getElementById('company').textContent = expense.companies? expense.companies.name.toUpperCase(): "N/A"
    document.getElementById('ceo').textContent = expense.companies? expense.companies.head : "N/A"
    document.getElementById('coy-handle').textContent = expense.companies? expense.companies.twitter_handle : "N/A"
    document.getElementById('ministry').textContent = expense.mdas? expense.mdas.name: "N/A" 
    document.getElementById('min-handle').textContent = expense.mdas? expense.mdas.twitter_handle: "N/A"
    document.getElementById('min-head').textContent = expense.mdas? expense.mdas.head: "N/A"
    document.getElementById('min-head-handle').textContent = expense.mdas? expense.mdas.head_handle: "N/A"
    document.querySelector('.section-wrapper').classList.add('show')
}

const insertCommas = amount =>{
    const parts = amount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

const formatDate = date => {
    const createDate = new Date(date)
    const parts = createDate.toString().split(" ").filter((item, i) => i > 0 && i < 4) 
    return `${parts[1]}th ${parts[0]}, ${parts[2]}`
}


const getAllExpenses = async () => {
    const response = await fetch('https://fgn-backend.herokuapp.com/expenses')
    const data = await response.json()
    const {expenses} = data.data
    let output = ""
    expenses.forEach(expense => {
                                 mdaName = expense.mdas? expense.mdas.name: "N/A" 
                                 companyName = expense.companies? expense.companies.name.toUpperCase(): "N/A"
                                 output += `<tr class="tablettr" style="cursor:pointer" data-id=${expense._id}>
                                                <td class="profileSummary" title="Click to see more details" >${expense.expenseDesc}</td>
                                                <td>${mdaName}</td>
                                                <td>${companyName}</td>
                                                <td><span>₦</span>${insertCommas(expense.expenseAmount)}</td>
                                                <td>${formatDate(expense.paymentDate)}</td>
                                            </tr>`
    })
    tbody.innerHTML = output;
    console.log(data.data.expenses)
   
}


tbody.addEventListener('click', async (e)=>{
    if(e.target.classList.contains('profileSummary')){
        const id = e.target.parentElement.dataset.id;
        const response = await fetch(`https://fgn-backend.herokuapp.com/expenses/${id}`)
        const data = await response.json()
        const {expense} = data.data
        showPopup(expense)
    }
})


closeButton.addEventListener('click', hidePopup);

window.addEventListener('load', getAllExpenses)
