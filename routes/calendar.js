const express = require('express');
const router = express.Router();
const Calendar = require('../models/calendar');

//   router.get('/', async (req, res, next) => {
//     if (!req.session.currentUser) {
//         req.session.flash = {
//           type: 'info',
//           intro: 'Error!',
//           message: 'You are not logged in',
//         };
//         res.redirect(303, '/');
//         return;
//       }
    
//       let userId = req.session.currentUser.id;
//     const calendarDates = await Calendar.getCommentDatesByUserId(userId);
//     res.render('calendar/index',{ title: 'Calendar', calendarDates: calendarDates });
//   });

router.get('/', async (req, res, next) => {
    if (!req.session.currentUser) {
      req.session.flash = {
        type: 'info',
        intro: 'Error!',
        message: 'You are not logged in',
      };
      res.redirect(303, '/');
      return;
    }
  
    let userId = req?.session.currentUser?.id;
    const calendarDates = await Calendar.getCommentDatesByUserId(userId);
    console.log('calendarDates: ', calendarDates);
    res.render('calendar/index', { title: 'Calendar', calendarDates: calendarDates });
  });
  
  

  module.exports = router;
