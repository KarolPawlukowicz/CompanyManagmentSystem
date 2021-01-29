const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/add-user', (req, res) => {
    res.render('users/add_user', { user: new User() })
})

router.get('/', async (req, res) => {
    const users = await User.find()
    res.render('users/index', { users: users })
})


router.post('/', async (req, res, next) => {
    req.user = new User()
    next()
}, saveUserAndRedirect(''))

function saveUserAndRedirect(path) {
    return async (req, res) => {
      let user = req.client
      user.name = req.body.name
      user.email = req.body.email
      user.gender = req.body.gender
      user.status = req.body.status
      try {
        user = await user.save()
        console.log('udalo sie ');
        res.redirect(`/`)
      } catch (e) {
        console.log('nie udalo sie ' + e);
       // res.render(`users/${path}`, { user: user })
        const users = await User.find()
        res.render('users/index', { users: users })
      }
    }
  }

 module.exports = router