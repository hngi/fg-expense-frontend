const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
const exit = document.getElementById('exit');

menu.addEventListener('click', function(e){
    nav.classList.toggle('hide-mobile');
    e.preventDefault()
})
exit.addEventListener('click', function(e){
    nav.classList.add('hide-mobile');
    e.preventDefault()
})
