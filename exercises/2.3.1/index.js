const btn1 = document.querySelector('#myBtn');
const myForm = document.querySelector("#form");
const message = document.querySelector("#text");
const textSubmit = document.querySelector("#textSubmit")

btn1.addEventListener("click" , onSubmit);

function onSubmit (e) {
    e.preventDefault();
    myForm.style.display = "none";
    let text = message.value;
    textSubmit.innerText = text;
}