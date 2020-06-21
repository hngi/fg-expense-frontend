let ministerChevDown = document.querySelector("#minister-chev-down");
let ministerChevUp = document.querySelector("#minister-chev-up");
let ministryChevDown = document.querySelector("#ministry-chev-down");
let ministryChevUp = document.querySelector("#ministry-chev-up");
let ministerTab = document.querySelector("#minister-tab");
let ministryTab = document.querySelector("#ministry-tab");
let ministryToggle = document.querySelector("#ministry-toggle");
let ministerToggle = document.querySelector("#minister-toggle");


function showMinister() {
  ministerToggle.classList.toggle("hovered");
  ministerTab.classList.toggle("visible");
  ministerChevDown.classList.toggle("invisible");
  ministerChevUp.classList.toggle("visible");
}

function showMinistry() {
  ministryToggle.classList.toggle("hovered");
  ministryTab.classList.toggle("visible");
  ministryChevDown.classList.toggle("invisible");
  ministryChevUp.classList.toggle("visible");
}