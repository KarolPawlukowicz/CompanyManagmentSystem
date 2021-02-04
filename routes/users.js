const express = require('express')
const Userdb = require('../models/user')
const router = express.Router()
//const auth = require("../middleware/auth");
const controller = require('../controller/user');


// GETs
router.get('/new', controller.registerRender);
router.get('/login', controller.loginRender);

// POST
router.post('/', controller.create);
router.post('/login', controller.login);


/*router.post("/register", (req, res) => {

  bcrypt.hash(req.body.password, 10, function(err, passwordHash){
    if(err){
      res.json({
        error: "blad funkcji hashujacej"
      })
    }
  });

  // new user
  const user = new Userdb({
    email : req.body.email,    
    password : passwordHash,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    role : req.body.role
})

  user
    .save()
    .then(data => {
      res.redirect('/customers');
    })
    .catch(err =>{
      res.status(500).send({
          message : err.message || "Some error occurred while creating a create operation"
        });
    });

});*/

 module.exports = router