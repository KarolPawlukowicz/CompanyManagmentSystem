const jwt = require("jsonwebtoken")
const jwtCode = 'kodSzyfrujacy123'

const authenticate = (req, res, next) => {
    try{ 
        console.log(req.headers)       
        const token = req.headers.Authorization
        console.log(token)
        const decode = jwt.verify(token, jwtCode)

        req.user = decode
        next()
    } catch (err){
        res.json({
            message: "brak dostepu"
        })
    }
}

module.exports = authenticate
