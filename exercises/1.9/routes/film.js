const express = require('express');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const {
    readOneFilm,
    readAllFilms,
    deleteOneFilm,
    creatOneFilm,
    updateFilm,
    updateFilm,
} = require('../models/films')

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
  
  const allFilmsPotentiallyOrdered = readAllFilms(req?.query?.order);

  return res.json(allFilmsPotentiallyOrdered);
  });

// find film with id
// eslint-disable-next-line no-unused-vars, consistent-return
router.get('/:id', (req, res, next) => {

  const filmId = parseInt(req.params.id, 10);
  

  res.json(readOneFilm(filmId));
});

// post un film
// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  

  if (!title || !duration || !budget || !link) return res.sendStatus(400);
  const newFilm = creatOneFilm(title,duration, budget, link);

  res.json(newFilm);
});

// Delete a film from the menu based on its id
// eslint-disable-next-line consistent-return
router.delete('/:id', (req, res) => {
 

  const foundIndex = ListFilm.findIndex((film) => film.id === req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);
  const itemRemoved = deleteOneFilm(foundIndex);
  res.json(itemRemoved);
});

// change a film data form its id
// eslint-disable-next-line consistent-return
router.patch('/:id', (req, res) => {


  const title = req?.body?.title?.length !== 0 ? req.body.duration : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);
  const updateFilm = updateFilm(title, duration, budget, link);
  res.json(updateFilm);
});
// exo put
// eslint-disable-next-line consistent-return
router.put('/:id', (req, res) => {
  
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);
  const newFilm = updateFilm();
  res.json(newFilm);
});
module.exports = router;
