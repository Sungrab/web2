
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';


import avatar from './img/avatar.jpg'
import percy from './img/percy.jpg'
import ant from './img/ant.jpg'

const ListFilm = [
    {
      id: 1,
      title: 'avatar',
      duration: 150,
      budget: 500000,
      link: 'https://www.imdb.com/title/tt0499549/?ref_=nv_sr_srsg_3_tt_8_nm_0_q_avatar',
      photo: avatar,
      information: 'ceci est cache'
    },
    {
      id: 2,
      title: 'Percy Jackson and the Olympians',
      duration: 130,
      budget: 200000,
      link: 'https://www.imdb.com/title/tt12324366/?ref_=hm_hp_cap_pri_hero-video-3_3',
      photo: percy,
      information: 'ceci est cache'
    
    },
    {
      id: 3,
      title: 'Ant-man',
      duration: 140,
      budget: 400000,
      link: 'https://www.imdb.com/title/tt0478970/?ref_=fn_al_tt_1',
     photo:ant,
     information: 'ceci est cache'
    },
  ];

  renderfilms(ListFilm);

  function renderfilms(films) {
    const filmContainer = document.getElementById('filmContainer');
  
    films.forEach((film) => {
      const filmElement = createFilmElement(film);
      filmContainer.appendChild(filmElement);
    });
    
  }

  let aboutButtonState = false;
  function createFilmElement(film) {
    const filmElement = document.createElement('div');
    filmElement.id = `film_${film.id}`;
    filmElement.innerHTML = `
      <div class="card m-3 w-50  bg-info mt-2 p-2 h-50 ">
      <img src="${film.photo}" class="card-img-top rounded" alt="${film.title}" style="max-width: 100%; h-50" id="image">
      <button class="btn btn-primary" id='mybtn'>ABOUT</button>      
        <div class="card-body">
          <h5 class="card-title">${film.title}</h5>
          <p class="card-text">Duration: ${film.duration} minutes</p>
          <p class="card-text">Budget: $${film.budget}</p>
          <a href="${film.link}" class="btn btn-primary" target="_blank">Learn More</a>
          
        </div>
      </div>
    `;
  
  const aboutButton = filmElement.querySelector('#mybtn');
  aboutButton.addEventListener('click', () => {
    // Appeler la fonction changePagebouton avec l'ID du film correspondant
    if (aboutButtonState === false){
      aboutButtonState = true;
    }else{
      aboutButtonState = false;
    }
    changePagebouton(film.id);
    
  });
    return filmElement;
  }

  
  function changePagebouton(filmid) {
    const selectedFilm = ListFilm.find(film => film.id === filmid);
    const filmElement = document.getElementById(`film_${filmid}`);
    const aboutButton = filmElement.querySelector('#mybtn');
  
    if (filmElement && aboutButton) {
      
  
      if (aboutButtonState) {
        // Si le bouton est "on"
        aboutButton.innerText = 'Movie';
        
        // Mettez à jour le contenu pour la page "ABOUT"
        const cardBody = filmElement.querySelector('.card-body');
        if (cardBody && selectedFilm) {
          cardBody.innerHTML = `
            <h5 class="card-title">${selectedFilm.title}</h5>
            <p class="card-text">${selectedFilm.information}</p>
            <a href="${selectedFilm.link}" class="btn btn-primary" target="_blank">Learn More</a>
          `;
        }
      } else {     
        aboutButton.innerText = 'ABOUT';
        
        const cardBody = filmElement.querySelector('.card-body');
        if (cardBody && selectedFilm) {
          cardBody.innerHTML = `
            <h5 class="card-title">${selectedFilm.title}</h5>
            <p class="card-text">Duration: ${selectedFilm.duration} minutes</p>
            <p class="card-text">Budget: $${selectedFilm.budget}</p>
            <a href="${selectedFilm.link}" class="btn btn-primary" target="_blank">Learn More</a>
          `;
        }
      }
    }
  }
  