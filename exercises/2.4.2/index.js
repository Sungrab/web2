const color = document.querySelectorAll(".color");
const red = document.querySelector("#colorRed");
const orange = document.querySelector("#colorOrange");
const green = document.querySelector("#colorGreen");
const body = document.querySelector("body");



let interval=0;

body.addEventListener("mouseenter",changeColor);

function colorRed(){
    red.style.backgroundColor = 'red';
    orange.style.backgroundColor = 'white';
    green.style.backgroundColor = 'white';
}
function colorOrange(){
    red.style.backgroundColor = 'white';
    orange.style.backgroundColor = 'orange';;
    green.style.backgroundColor = 'white';;
}
function colorGreen(){
    red.style.backgroundColor = 'white';
    orange.style.backgroundColor = 'white';;
    green.style.backgroundColor = 'green';;
}
function changeColor() {
    interval = setInterval(() => {
        colorRed();
        setTimeout(colorOrange(),2000);
        setTimeout(colorGreen(),4000);
        setTimeout(colorOrange(),6000);
        setTimeout(colorRed(),8000);
    },10000);

}