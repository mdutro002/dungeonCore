const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router();
const User = require('../models/users.js')


sessions.get('/new'), (req, res) => {
  res.render('newSession.ejs', 
    {
      currentUser: req.session.currentUser
    }
  )
}

//login
sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err){
      console.log(err)
      res.send('ERROR 500 - alert techsupport, there\'s an internal error')
    } else if (!foundUser) {
      res.send('<a href="/">Sorry, no user found with that username</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send(
          '<a href="/">Sorry, login incorrect</a>'
        )
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  res.send('deleting session')
})

module.exports = sessions;