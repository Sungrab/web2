const btn1 = document.querySelector('#myBtn');
let cpt = 0;
btn1.addEventListener('click', addOne);

function addOne () {
    cpt++
    if (cpt >=5|| cpt <=9){
        const mydiv = document.querySelector('#oneMore');
        mydiv.textContent = 'Bravo, bel échauffement !'
    }
    if (cpt > 9){
        const mydiv = document.querySelector('#oneMore');
        mydiv.textContent = "Vous êtes passé maître en l'art du clic !"
    }

}