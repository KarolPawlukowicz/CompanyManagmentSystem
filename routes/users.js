const express = require('express')
const Userdb = require('../models/user')
const router = express.Router()
const controller = require('../controller/user');


// GETs
router.get('/register', controller.registerRender);
router.get('/login', controller.loginRender);
router.get('/logout', controller.logout);

// POST
router.post('/', controller.register);
router.post('/login', controller.login);

module.exports = router