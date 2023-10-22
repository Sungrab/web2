const btn1 = document.querySelector('#myBtn');
const onemore = document.querySelector('#oneMore');
const span = document.querySelector("#timer")
let cpt = 0;
btn1.addEventListener('click', addOne);

const clockHolder = document.querySelector("span");

btn1.addEventListener("mouseenter", () => {
    startTimer;
    if(startTimer.end){
        const mydiv = document.querySelector('#oneMore');
        mydiv.textContent = "Game over, you did not click 10 times within 5s !"
    }
})
let timeOut;
let end;
let now;


function addOne () {
    cpt++
    
    if (cpt == 10){
        const mydiv = document.querySelector('#oneMore');
        mydiv.textContent = "You win ! You clicked 10 times within X ms"
    }if (end = now){
       
    }

}
function startTimer ()  {
    now = new Date();
    const time = now.toLocaleTimeString();
    end = new Date(now.getTime()+5000);
    setTimeout(clearTimeout(), 5000);

}
