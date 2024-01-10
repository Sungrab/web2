
const movies = [
    {
      id: 1,
      title: 'avatar',
      duration: 150,
      budget: 500000,
      link: 'https://www.imdb.com/title/tt0499549/?ref_=nv_sr_srsg_3_tt_8_nm_0_q_avatar',
    },
    {
      id: 2,
      title: 'Percy Jackson and the Olympians',
      duration: 130,
      budget: 200000,
      link: 'https://www.imdb.com/title/tt12324366/?ref_=hm_hp_cap_pri_hero-video-3_3',
    },
    {
      id: 3,
      title: 'Ant-man',
      duration: 140,
      budget: 400000,
      link: 'https://www.imdb.com/title/tt0478970/?ref_=fn_al_tt_1',
    },
  ];

function readAllFilms(){
    
    const films = movies;
    
    return films;
}
function creatOneFilm (title, duration, budget, link){
    const films = movies;
    const newFilm = {
        id: getNextId,
        title,
        duration,
        budget,
        link,
      };
    films.push(newFilm);
    return newFilm;
}
function getNextId () {
    const films = movies;

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}
module.exports = {
    creatOneFilm,
    readAllFilms,
}