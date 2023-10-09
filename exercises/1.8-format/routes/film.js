const express = require('express');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');


const router = express.Router();

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

// Read all the film
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  
  const films = parse(jsonDbPath, ListFilm);

  // duration exo
  const contientDuration = req?.query?.['minimum-duration']
    ? parseInt(req.query['minimum-duration'], 10)
    : undefined;

  if (contientDuration !== undefined) {
   
    // eslint-disable-next-line no-undef
    const filteredFilms = [...films].filter((film) => film.duration >= minimumDuration);
    if (filteredFilms.length === 0) {
      return res.status(404).json({ message: 'Film not found' });
    }
    return res.json(filteredFilms);
  }

  // fild with caractere
  const caractere = req?.query?.caractere ? req.query.caractere : undefined;
  

  if (caractere !== undefined && caractere.length > 0) {
    const caractereFilm = [...films].filter(
      (film) => film.title[0].toLowerCase() === caractere.toLowerCase(),
    );
    
    if (caractereFilm.length === 0) {
      return res.status(404).json({ message: 'Film not found' });
    }
    return res.json(caractereFilm);
  }

  // sort by title
  const order = req?.query?.order ? req.query.order : undefined;
  
  if (order === 'title' || (order === '-title' && order !== undefined)) {
    let orderFilm = [...films].sort((a, b) => a.title.localeCompare(b.title));
    if (order === '-title') orderFilm = orderFilm.reverse;
   
    return res.json(orderFilm);
  }
  return res.json(films);
});

// find film with id
// eslint-disable-next-line no-unused-vars, consistent-return
router.get('/:id', (req, res, next) => {
  const films = parse(jsonDbPath, ListFilm);

  const filmId = parseInt(req.params.id, 10);
  
  if (!Number.isInteger(filmId)) {
    return res.sendStatus(400).json({ message: 'waiting for an int' });
  }
  // eslint-disable-next-line no-shadow
  const film = films.find((film) => film.id === filmId);
  
  if (!film) {
    return res.status(404).json({ message: 'Film not found' });
  }

  res.json(film);
});

// post un film
// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  

  if (!title || !duration || !budget || !link) return res.sendStatus(400);
  const films = parse(jsonDbPath, ListFilm);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };
  films.push(newFilm);
  serialize(jsonDbPath, films);
  res.json(newFilm);
});

// Delete a film from the menu based on its id
// eslint-disable-next-line consistent-return
router.delete('/:id', (req, res) => {
 
  const films = parse(jsonDbPath, ListFilm);

  const foundIndex = ListFilm.findIndex((film) => film.id === req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, films);
  res.json(itemRemoved);
});

// change a film data form its id
// eslint-disable-next-line consistent-return
router.patch('/:id', (req, res) => {

  const films = parse(jsonDbPath, ListFilm);
  const filmId = parseInt(req.params.id, 10);
  if (filmId < 0 || filmId >= films.length)
    return res.sendStatus(400).json({ message: 'pas de film avec cette index' });

  const title = req?.body?.title?.length !== 0 ? req.body.duration : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const foundIndex = films.findIndex((film) => film.id === req.params.id);

  const updateFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updateFilm;
  serialize(jsonDbPath, films);
  res.json(updateFilm);
});
// exo put
// eslint-disable-next-line consistent-return
router.put('/:id', (req, res) => {
  const films = parse(jsonDbPath, ListFilm);
  const filmId = parseInt(req.params.id, 10);
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const lastItemIndex = ListFilm?.length !== 0 ? ListFilm.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? ListFilm[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  if (filmId < 0) return res.sendStatus(400).json({ message: 'id ne peut pas etre en negatif' });
  if (filmId >= films.length) {
    const newFilm = {
      id: nextId,
      title,
      duration,
      budget,
      link,
    };
    films.push(newFilm);
    serialize(jsonDbPath, films);
    res.json(newFilm);
  } else {
    const foundIndex = films.findIndex((film) => film.id === req.params.id);
    const updateFilm = { ...films[foundIndex], ...req.body };
    films[foundIndex] = updateFilm;
    serialize(jsonDbPath, films);
    res.json(updateFilm);
  }
});
module.exports = router;
