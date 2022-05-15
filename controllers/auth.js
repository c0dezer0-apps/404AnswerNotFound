const express = require('express');
const authenticate = require('../api/authentication');
const { createUser } = require('../api/dbOps');
const router = express.Router();

router.get('/signup', (req, res) => {
     const locals = {
          title: 'Register For An Account',
          description: null,
          style: '/css/signup.css',
     };
     res.render('auth/signup', { meta: locals });
});

router.post('/signup', (req, res) => {
     createUser({ req: req, res: res });
});

router.get('/login', (req, res) => {
     const locals = {
          title: 'Login',
          description: null,
          style: '/css/login.css',
     };
     res.render('auth/login', { meta: locals });
});

router.post('/login', authenticate());

router.get('/logout', (req, res) => {
     req.logout();
     req.flash('success', 'You have logged out');
     res.redirect('/');
});

module.exports = router;
