let ministerData = { page: 1 };
let ministryData = { page: 1 };
let limit = 2;
// ministerData["page"] = 1;
// ministryData["page"] = 1;
let gap = 5;
const accordion = document.querySelector("#accordion");
const ministers = document.querySelector('#ministers');
const ministries = document.querySelector('#ministries');
const minstersStatistics = document.querySelector('#page-details-ministers')
const ministersPagination = document.querySelector("#pagination-ministers")
const minstriesStatistics = document.querySelector('#page-details-ministries')
const ministriesPagination = document.querySelector("#pagination-ministries")
console.log(minstriesStatistics, ministriesPagination)
const base_url = "https://fgn-backend.herokuapp.com";
// const base_url = "http://localhost:4000";

//Create Pagination
const runPagination = (page, element, elemDetails, pages, totalCount) => {

    let maxRight = page + Math.floor(gap / 2);
    let maxLeft = page - Math.floor(gap / 2);

    let isStart = page === 1 ? "page-link disabled" : "page-link";
    element.innerHTML = ` <li class="page-item">
                                <a id="prev" aria-label="Previous" class=${isStart} href="#">
                                    &laquo;
                                </a>
                             </li>`;

    if (maxLeft <= 0) {
        maxLeft = 1;
        maxRight = pages < gap ? pages : gap;
    }

    if (maxRight > pages) {
        maxRight = pages;
        maxLeft = (pages - (gap - 1) > 0) ? pages - (gap - 1) : 1;
    }

    for (i = maxLeft; i <= maxRight; i++) {
        console.log(i, page)
        element.innerHTML += i === page ? `<li class="page-item num"><a class="page-link active" href="#">${i}</a></li>` : `<li class="page-item num"><a class="page-link" href="#">${i}</a></li>`
    }

    let isEnd = page === pages ? "page-link disabled" : "page-link";
    element.innerHTML += `<li class="page-item">
                                <a id="next" class=${isEnd} aria-label="Next" title="End of Page" href="#">
                                    &raquo
                                </a>
                            </li>`;
    const lastPage = (page * limit > totalCount) ? totalCount : page * limit;
    elemDetails.innerHTML = `${page * limit + 1 - limit} - ${lastPage} of ${totalCount} results`
}


//Populate Ministers' Table
const getAllMinisters = async (page = 1, limit = 2) => {

    const response = await fetch(`${base_url}/mda/heads?_page=${page}&_limit=${limit}`)
    const data = await response.json()
    const { MdaHandle, totalPages, totalCount } = data.data
    for (key in data.data) {
        ministerData[key] = data.data[key]
    }

    let output = "";
    runPagination(page, ministersPagination, minstersStatistics, totalPages, totalCount)

    MdaHandle.forEach(ministry => {
        output += `<tr>
                                                <td>${ministry.name}</td>
                                                <td>${ministry.head}</td>
                                                <td>${ministry.head_handle}</td>
                                            </tr>`
    })
    ministers.innerHTML = output;

}


//Populate Ministeries' Table
const getAllMinistries = async (page = 1, limit = 2) => {

    const response = await fetch(`${base_url}/mdas?_page=${page}&_limit=${limit}`)
    const data = await response.json()
    const { allMDAs, totalPages, totalCount } = data.data
    for (key in data.data) {
        ministryData[key] = data.data[key]
    }

    let output = "";
    runPagination(page, ministriesPagination, minstriesStatistics, totalPages, totalCount)

    allMDAs.forEach(ministry => {
        output += `<tr>
                                                <td>${ministry.short_name}</td>
                                                <td>${ministry.twitter_handle}</td>
                                            </tr>`
    })
    ministries.innerHTML = output;

}



//Pagination Event Handlers
const handleClick = (e, fxn, data) => {
    if (e.target.id === 'next') {

        if (data.page < data.totalPages) {
            data.page++;
            fxn(data.page, limit)
        }
    }

    else if (e.target.id === 'prev') {

        if (data.page > 1) {
            data.page--;
            fxn(data.page, limit)
        }
    } else if (e.target.closest('.page-item.num')) {
        const pages = document.querySelectorAll('#pagination-ministers a')
        data.page = +e.target.textContent;
        console.log('num', data.page)
        pages.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');
        fxn(data.page, limit)
    }

}

accordion.addEventListener('click', e => {

    e.preventDefault()
    if (e.target.closest('#pagination-ministries')) {
        handleClick(e, getAllMinistries, ministryData)
    } else if (e.target.closest('#pagination-ministers')) {
        handleClick(e, getAllMinisters, ministerData)
    }

})


window.addEventListener('load', function () {
    getAllMinisters(ministerData.page, limit)
    getAllMinistries(ministryData.page, limit)
})