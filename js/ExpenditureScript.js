
let showPopup = function(){
    document.querySelector('.section-wrapper').classList.add('show')
}
let profileSummary = document.querySelectorAll(".profileSummary").forEach
(profileSummary => profileSummary.addEventListener('click' , showPopup));

let closeButton = document.querySelector('.section-wrapper .close-button');

let hidePopup = function(){
    document.querySelector('.section-wrapper').classList.remove('show')
}
closeButton.addEventListener('click', hidePopup);
