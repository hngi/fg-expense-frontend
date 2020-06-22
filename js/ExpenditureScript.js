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
let metadata = {};
let limit = 2;
let page = 1;
let gap = 5;
const tbody = document.querySelector('.expenditure-data');
const closeButton = document.querySelector('.section-wrapper .close-button');
const pagination = document.querySelector(".pagination");
const details = document.querySelector(".table-footer span")
const base_url = "https://fgn-backend.herokuapp.com";

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

const getAllExpenses = async (page=1, limit=3) => {
    console.log(page)
    const response = await fetch(`${base_url}/expenses?_page=${page}&_limit=${limit}`)
    const data = await response.json()
    const {expenses, totalPages, totalCount } = data.data
    for(key in data.data){
        if(key !== "expenses"){
            metadata[key] = data.data[key]
        }
    }

    let output = ""
    
				let pages = totalPages;
				let maxRight = page + Math.floor(gap / 2);
				let maxLeft = page - Math.floor(gap / 2);
                
                let isStart = page === 1 ? "disabled" : "";
				pagination.innerHTML =  `<a id="prev" class=${isStart} href="#">&laquo;</a>`;
		
				if(maxLeft <= 0) { 
                    maxLeft = 1; 
                    maxRight = totalPages < gap ? totalPages : gap;
                }
               
				if(maxRight > pages) {
                    maxRight = pages; 
                    maxLeft = (pages - (gap-1) > 0) ? pages - (gap-1) : 1;
                }
				
				for(i=maxLeft; i<=maxRight; i++){
					pagination.innerHTML += i === page ? `<a class="active" href="#">${i}</a>` : `<a href="#">${i}</a>`
				}

                let isEnd = page === pages ? "disabled" : "";
                pagination.innerHTML += `<a id="next" class=${isEnd} title="End of Page" href="#">&raquo;</a>`;
                const lastPage = (page*limit > totalCount) ? totalCount : page*limit;
				details.innerHTML = `${page*limit+1 - limit} - ${lastPage} of ${totalCount} results`

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
    
}

tbody.addEventListener('click', async (e)=>{
    if(e.target.classList.contains('profileSummary')){
        const id = e.target.parentElement.dataset.id;
        const response = await fetch(`${base_url}/expenses/${id}`)
        const data = await response.json()
        const {expense} = data.data
        showPopup(expense)
    }
})

pagination.addEventListener('click', e => {
    e.preventDefault();
    const { totalPages } = metadata
    if(e.target.id === 'next'){
        
            if(page < totalPages){
                page++;
                getAllExpenses(page, limit)
            }
    }

    else if(e.target.id === 'prev'){
       
            if(page > 1){
                page--;
                getAllExpenses(page, limit)
            }
    }else{
        const pages = document.querySelectorAll('.pagination a')
        page = +e.target.textContent;
        console.log('num', page)
        pages.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');
        getAllExpenses(page, limit);
    }
    
})

closeButton.addEventListener('click', hidePopup);


window.addEventListener('load', getAllExpenses(page, limit))


let showEdit = function(){
    document.querySelector('.section-edit-delete').classList.add('show')
}
let addEdit = document.querySelectorAll('.comment-option').forEach
(addEdit => addEdit.addEventListener('click', showEdit));



