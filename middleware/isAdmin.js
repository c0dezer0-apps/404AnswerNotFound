module.exports = (req, res, next) => {
  if (!req.user.admin) {
    req.flash('error', 'You must be an admin to access this area.');
    res.redirect('/');
  }
  else {
    next();
  }
}
