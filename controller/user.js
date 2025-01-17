var Userdb = require('../models/user');

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("node-localstorage")

if(typeof localStorage === "undefined" || localStorage === null){
    var LocalStorage = require("node-localstorage").LocalStorage
    localStorage = new LocalStorage('./scratch')
}

// RENDER
// render new customer page
exports.registerRender = (req,res)=>{
    res.render('users/new', { user: new Userdb() })
}

exports.loginRender = (req,res)=>{
    res.render('users/login', { })
}


// login 
exports.login = async (req,res)=>{
    var email = req.body.email
    var password = req.body.password

    user = await Userdb.findOne({email})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.json({
                            error: err
                        })
                    }
                    if(result){
                        let token = jwt.sign( {email : user.email}, process.env.JWT_CODE, { expiresIn : '1h' } )
                        localStorage.setItem('Authorization' , token)
                       // console.log(localStorage.getItem('Authorization'))
                        res.render('index', {  })
                    } else{
                        res.render('index', {  })
                    }
                })
            } else{
                res.json({
                    message: "no user"
                })
            }
        })
}



// create and save new user
exports.register = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    passwordHash = bcrypt.hashSync(req.body.password, 10)
    console.log(passwordHash)
    
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
};


exports.logout = (req,res)=>{
    localStorage.setItem('Authorization' , 'siema')
    res.render('index', {  })
}

