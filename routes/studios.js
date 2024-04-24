const express = require('express');
const router = express.Router();
const Studio = require('../models/studio')

router.get('/', async (req, res, next) => {
    const studios = await Studio.all();
    res.render('studios/index', { title: 'Studio Library || Studios', studios: studios });
  });
  
  router.get('/form', async (req, res, next) => {
    res.render('studios/form', { title: 'Studio Library || Studios' });
  });

  router.get('/edit', async (req, res, next) => {
    let studioId = req.query.id;
    let studio = await Studio.get(studioId);
    let games = await Studio.getGames(studioId);
    res.render('studios/form', { title: 'Studio Library || Studios', studio: studio, games: games });
});
  
  router.post('/upsert', async (req, res, next) => {
    await Studio.addStudio(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: `The studio has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/studios');
  });
  
  
module.exports = router;