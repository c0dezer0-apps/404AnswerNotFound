const passport = require('../config/ppConfig');

const authenticate = () => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username or password',
    successFlash: 'You have logged in!',
  });
};

module.exports = { authenticate }
