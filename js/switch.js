// switch toggle
const switchToggle = document.querySelector('.switch-toggle');
switchToggle.addEventListener("click",()=>{
    document.querySelector('.switch-mode').classList.toggle('open');
})
// hide themes on scroll
window.addEventListener("scroll",() => {
    if(document.querySelector('.switch-mode').classList.contains('open')){
        document.querySelector('.switch-mode').classList.remove('open');
    }
})
// themes colors
const alternateStyles = document.querySelectorAll('.alternate-style');
function setActiveStyle(color){
    alternateStyles.forEach((style)=>{
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute('disabled','true');
        }
    })
}
// dark light mode
const dayNightMode = document.querySelector('.day-night');

dayNightMode.addEventListener("click",()=>{
    dayNightMode.querySelector('i').classList.toggle('fa-sun');
    dayNightMode.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
})

window.addEventListener("load",()=>{
    if(document.body.classList.contains('dark')){
        dayNightMode.querySelector('i').classList.add('fa-sun');
    }else{
        dayNightMode.querySelector('i').classList.add('fa-moon');
    }
})