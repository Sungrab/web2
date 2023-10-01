var express = require('express');
var router = express.Router();

const ListFilm = [
  {
    id: 1,
    title: 'avatar',
    duration: 150,
    budget: 500000,
    link: "https://www.imdb.com/title/tt0499549/?ref_=nv_sr_srsg_3_tt_8_nm_0_q_avatar",
  },
  {
    id: 2,
    title: 'Percy Jackson and the Olympians',
    duration: 130,
    budget: 200000,
    link: "https://www.imdb.com/title/tt12324366/?ref_=hm_hp_cap_pri_hero-video-3_3",
  
  },
  {
    id: 3,
    title: 'Ant-man',
    duration:140,
    budget: 400000,
    link: "https://www.imdb.com/title/tt0478970/?ref_=fn_al_tt_1",
  },
];

// Read all the film from the menu/duration
router.get('/', (req, res, next) => {
  console.log('GET /film');
  const contientDuration = req?.query?.["minimum-duration"]
    ?parseInt(req.query["minimum-duration"])
    :undefined;
  if (contientDuration !== undefined){
    const filteredFilms = ListFilm.filter((film) => film.duration >= minimumDuration);
    res.json(filteredFilms)
  };

  //fild with caractere
  const caractere = req?.query?.['caractere'] 
    ?req.query.caractere
    :undefined;
    console.log(caractere);
  if (caractere !== undefined || caractere.length > 0){
    const caractereFilm = ListFilm.filter((film) => film.title.charAt(0).toLowerCase() === caractere.toLowerCase());
    console.log(caractereFilm);
    res.json(caractereFilm)
  };
  
  //sort by title
  const order = req?.query?.order 
    ?req.query.order
    :undefined
    console.log(order);
  if (order ==='title'||order==='-title'){
    let orderFilm = ListFilm.sort((a, b) => a.title.localeCompare(b.title));
    if (order === '-title') orderFilm = orderFilm.reverse;
    console.log(orderFilm);
   res.json(orderFilm) 
  }


  res.json(ListFilm);
});

//find film with id
router.get('/:id', (req, res, next) => {

  const filmId = parseInt(req.params.id);
  console.log("film id", filmId);
  let film = ListFilm.find((film) => film.id === filmId);
  console.log('film:', film);
  if (!film) {
    return res.status(404).json({ message: 'Film not found' });
  }
  
  res.json(film);
})

//post un film
router.post('/', (res,req)=>{
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
 
  console.log('Post /film');

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const lastItemIndex = ListFilm?.length !== 0 ? ListFilm.length -1 : undefined;
  const lastId = lastItemIndex !== undefined ? ListFilm[lastItemIndex]?.id : 0;
  const nextId = lastId +1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link
  };
  ListFilm.push(newFilm);

  res.json(newFilm)

})

module.exports = router;
