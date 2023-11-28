/* eslint-disable no-unused-vars */
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
      photo: avatar
    },
    {
      id: 2,
      title: 'Percy Jackson and the Olympians',
      duration: 130,
      budget: 200000,
      link: 'https://www.imdb.com/title/tt12324366/?ref_=hm_hp_cap_pri_hero-video-3_3',
      photo: percy
    
    },
    {
      id: 3,
      title: 'Ant-man',
      duration: 140,
      budget: 400000,
      link: 'https://www.imdb.com/title/tt0478970/?ref_=fn_al_tt_1',
     photo:ant
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
  
  function createFilmElement(film) {
    const filmElement = document.createElement('div');
    filmElement.innerHTML = `
      <div class="card m-3 w-50  bg-info mt-2 p-2 h-50 ">
      <img src="${film.photo}" class="card-img-top rounded" alt="${film.title}" style="max-width: 100%; h-50" id="image">
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