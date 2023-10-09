const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const ListFilm = [
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

function readAllFilms(parametre){
    const param = parametre?.includes('title') ? parametre : undefined;
    const films = parse(jsonDbPath, ListFilm);
    if (param){
        const caractereFilm = [...films].filter(
            (film) => film.title[0].toLowerCase() === param.toLowerCase(),
          );
         return caractereFilm; 
    }
    return films;
}
function readOneFilm (id){
    const numbre = parse(id, 10);
    const films = parse(jsonDbPath, ListFilm);
    const lePizzaIndex = films.findIndex((film) => film.id === numbre);
    if(lePizzaIndex < 0) return undefined;
    return films[lePizzaIndex];
}
function creatOneFilm (title, duration, budget, link){
    const films = parse(jsonDbPath, ListFilm);
    const newFilm = {
        id: getNextId,
        title,
        duration,
        budget,
        link,
      };
    films.push(newFilm);
    serialize(jsonDbPath, parse);
    return newFilm;
}
function getNextId () {
    const films = parse(jsonDbPath, ListFilm);

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

function deleteOneFilm (id) {
    const numbre = parseInt(id, 10);
    const films = parse(jsonDbPath, ListFilm);
    const lePizzaIndex = films.findIndex((film) => film.id === numbre);
    if (lePizzaIndex < 0 ) return undefined;
    const itemsRemovedFromMenu = films.splice(lePizzaIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];
  return itemRemoved;

}
function updateFilm (id, context){
    const numbre = parseInt(id, 10);
    const films = parse(jsonDbPath, ListFilm);
    const lePizzaIndex = films.findIndex((film) => film.id === numbre);

    if (lePizzaIndex < 0 ) return undefined;

    // eslint-disable-next-line no-shadow
    const updateFilm = { ...films[lePizzaIndex], ...context };
    films[lePizzaIndex] = updateFilm;
    serialize(jsonDbPath, films);
    return updateFilm;

}
module.exports = {
    readOneFilm,
    readAllFilms,
    deleteOneFilm,
    creatOneFilm,
    updateFilm,
}