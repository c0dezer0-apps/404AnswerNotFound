const { User } = require('../models');
const express = require('express');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const flash = require('connect-flash');
const router = express.Router();

router.use(flash());

router.use(passport.initialize());
router.use(passport.session());

router.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

router.get('/', isLoggedIn, async (req, res) => {
  const locals = {
    title: req.user.dataValues.username,
    description: null,
    style: '/css/profile.css'
  };

  await User
    .findOne({
      where: {
        id: req.user.dataValues.id,
      },
    })
    .then(user => {
      (locals.description = req.user.dataValues.bio),
        res.render('./profile', { meta: locals, data: user });
    });
});

router.get('/profile/:user', async (req, res) => {
  const locals = {
    title: req.params.user,
    description: null,
  };
  await User
    .findOne({
      where: {
        username: req.params.user,
      },
    })
    .then(user => {
      locals.description = user.dataValues.bio;
      res.render('profile', { meta: locals, data: user });
    });
});

module.exports = router;
