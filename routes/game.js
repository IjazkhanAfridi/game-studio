const express = require('express');
const router = express.Router();
const Game = require('../models/game')
const Calendar = require('../models/calendar');
const Studio = require('../models/studio');

router.get('/', async (req, res, next) => {
  const games = await Game.all();
  res.render('games/index', { title: 'Game Library || Games', games: games });
});

router.get('/form', async (req, res, next) => {
  res.render('games/form', { title: 'Game Library || Games' });
});

// router.get('/edit', async (req, res, next) => {
//   let gameId = req.query.id;
//   let game = await Game.get(gameId);
//   let comments = await Game.getComments(gameId);
//   res.render('games/form', { title: 'Game Library || Games', game: game, comments: comments });
// });

router.post('/comment', async (req, res, next) => {
  let gameId = req.body.id;
  let userId = req.user.id; // Assuming user is authenticated
  let commentText = req.body.comment;
  await Game.addComment(gameId, userId, commentText);
  res.redirect(303, `/games/edit?id=${gameId}`);
});

router.get('/edit', async (req, res, next) => {
  let gameId = req.query.id;
  let game = await Game.get(gameId);
      // if (!req.session.currentUser) {
      //   req.session.flash = {
      //     type: 'info',
      //     intro: 'Error!',
      //     message: 'You are not logged in',
      //   };
      //   res.redirect(303, '/');
      //   return;
      // }
    
      // let userId = req.session.currentUser.id;
  // let comments = await Game.getCommentsWithTimestamps(gameId);
  let commentText = req.body.comment;
 const comments = await Game.addComment(gameId, commentText);
  res.render('games/form', { title: 'Game Library || Games', game: game, comments: comments });
});


// router.post('/comment', async (req, res, next) => {
//     let gameId = req.body.id;
//     let userId = req.user.id;
//     let commentText = req.body.comment;
//     await Game.addComment(gameId, userId, commentText);
//     await Calendar.addCommentDate(userId, new Date());
//     res.redirect(303, `/games/edit?id=${gameId}`);
//   });

// router.post('/upsert', async (req, res, next) => {
//     console.log('body: ' + JSON.stringify(req.body));
//     await Game.addGame(req.body);
//     let createdOrupdated = req.body.id ? 'updated' : 'created';
//     req.session.flash = {
//       type: 'info',
//       intro: 'Success!',
//       message: `The game has been ${createdOrupdated}!`,
//     };
//     res.redirect(303, '/games');
//   });

router.post('/upsert', async (req, res, next) => {
  const consol = req.body
  console.log('consol: ', consol);
  await Game.addGame(req.body);
  const comment = req.body.comment;
const gameId = req.body.id
      let userId = req?.session?.currentUser ? req?.session?.currentUser.id:null;
// const userId = req.user.id
  await Game.addComment(gameId,userId, comment);
  if (req.body.id && req.body.studio) {
      await Studio.linkGame(req.body.id, req.body.studio);
  }    
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: `The game has been ${createdOrupdated}!`,
  };    
  res.redirect(303, '/games');
});  

  

module.exports = router;