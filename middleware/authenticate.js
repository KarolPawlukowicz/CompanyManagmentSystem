const jwt = require("jsonwebtoken")

require("node-localstorage")


if(typeof localStorage === "undefined" || localStorage === null){
    var LocalStorage = require("node-localstorage").LocalStorage
    localStorage = new LocalStorage('./scratch')
}


const authenticate = (req, res, next) => {
    try{ 
       // console.log(localStorage.getItem('Authorization'))   
        const token = localStorage.getItem('Authorization')
        const decode = jwt.verify(token, process.env.JWT_CODE)
       // console.log(decode)

        req.user = decode
        next()
    } catch (err){
       /* res.json({
            message: "brak dostepu"
        })*/
        res.render('', { })
    }
}


module.exports = authenticate
