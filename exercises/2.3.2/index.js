const color = document.querySelectorAll(".color-div");


color.forEach((div) => {
    div.addEventListener('click', ()=> {
        div.style.backgroundColor = 'rgb(0, 0, 0)';
    });
    
});