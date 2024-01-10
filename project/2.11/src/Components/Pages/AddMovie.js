import 'bootstrap/dist/css/bootstrap.min.css';

import { clearPage } from '../../utils/render';
import Movies from '../../models/movies';

const AddMovie = () => {
  clearPage();
  form();
};
function form () {

  const main = document.querySelector('main');

  const filmElement = document.createElement('div');
  
  filmElement.innerHTML = `
    <div class="container mt-5">
    <form id="addMovieForm">
        <div class="form-group">
            <label for="nom">Nom :</label>
            <input type="text" class="form-control" id="nom" placeholder="Entrez votre nom">
        </div>
        <div class="form-group">
            <label for="duration">duration :</label>
            <input type="duration" class="form-control" id="duration" placeholder="Entrez la duree de film ">
        </div>
        <div class="form-group">
            <label for="budget">budget :</label>
            <textarea class="form-control" id="budget" rows="4" placeholder="Entrez le budget du film "></textarea>
        </div>
        <div class="form-group">
            <label for="link">link :</label>
            <textarea class="form-control" id="link" rows="4" placeholder="Entrez le lien du film "></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</div>
    `;

    const addMovieForm = filmElement.querySelector('#addMovieForm');
    addMovieForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nom = document.getElementById('nom').value;
      const duration = document.getElementById('duration').value;
      const budget = document.getElementById('budget').value;
      const link = document.getElementById('link').value;
      addMovie(nom,duration,budget,link);
    })
    main.appendChild(filmElement);
}
function addMovie(name,duration, budget,link){
    Movies.creatOneFilm(name,duration,budget,link);
}




export default AddMovie;