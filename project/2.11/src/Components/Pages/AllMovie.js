import 'bootstrap/dist/css/bootstrap.min.css';

import Movies from '../../models/movies';
import { clearPage } from '../../utils/render';

const List = Movies.readAllFilms();
const AllMovie = () => {
  
  clearPage();
  listMovies(List);
};

function listMovies(films){
  const main = document.querySelector('main');

  films.forEach((film) => {
    const filmElement = createFilmElement(film);
    main.appendChild(filmElement);
  });
}
function createFilmElement(film){
  const filmElement = document.createElement('div');
  filmElement.id = `film_${film.id}`;
    filmElement.innerHTML = `
      <div class="card m-3 w-50  bg-info mt-2 p-2 h-50 ">      
        <div class="card-body">
          <h5 class="card-title">${film.title}</h5>
          <p class="card-text">Duration: ${film.duration} minutes</p>
          <p class="card-text">Budget: $${film.budget}</p>
          <a href="${film.link}" class="btn btn-primary" target="_blank">Learn More</a>   
        </div>
      </div>
    `;
    return filmElement;
}



export default AllMovie;
