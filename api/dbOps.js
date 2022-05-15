const db = require('../models');
const passport = require('../config/ppConfig.js');

const createBug = (err, username, location, act) => {
  db['bug'].findOrCreate({
    error: `${err}`,
    bugCategory: ['database', 'crud', 'create'],
    location: location,
    activity: act,
    user: username,
  });
};

const updateBug = (act, user, updates) => {
  let bugs;

  try {
    bugs = db['bug'].findAll({
      where: {
        user: user,
        activity: act,
      }
    });
  } catch (err) {
    console.log("An error occurred while trying to edit a bug(s): ", err)
  }

  for (const bug of bugs) {
    bug.update({
      ...updates
    })
  }
};

const createUser = ({ req, res }) => {
  db.user
     .findOrCreate({
          where: {
               username: req.body.username,
               password: req.body.password,
               email: req.body.email,
               firstName: req.body.firstName,
               lastName: req.body.lastName,
          },
     })
     .then(([user, created]) => {
          // If created, this means success, redirect to home.
          if (created) {
               passport.authenticate('local', {
                    successRedirect: '/',
                    successFlash: 'Account created and user logged in!',
               })(req, res);
          } else {
               req.flash('error', 'Email already exists!');
               res.redirect('/auth/signup');
          }

       return user;
     })
     .catch(err => {
          req.flash('error', err.message);
          res.redirect('/auth/signup');
     });

}

const updateUser = (user, updates) => {
  try {
    db['user'].update({
      username: user,
      ...updates
    });
  } catch (err) {
    console.log("Couldn't update user: ", err);
  }
}

const createQuestion = (username, summary, details) => { 
  db['question']
     .create({
          createdBy: username,
          summary: summary,
          details: details,
     })
     .catch(err => {
       createBug(err, username, 'create_inquisition_route', 'creating a question');
     });

};

module.exports = { createUser, createQuestion, createBug, updateBug, updateUser };
