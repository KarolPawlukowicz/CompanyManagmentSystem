const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRouter = require('./routes/users')
const customerRouter = require('./routes/customers')
const tvRouter = require('./routes/tvs')
const path = require('path');
const methodOverride = require('method-override')
const app = express() 

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// Connect to db
var connection = mongoose.connect(process.env.MONGO_URI +  process.env.MONGO_URI_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
 // const articles = await Article.find().sort({ createdAt: 'desc' })
 // res.render('articles/index', { articles: articles })
  res.send("siema")
})


// load routers
app.use('/users', userRouter)
app.use('/customers', customerRouter)
app.use('/tvs', tvRouter)


// Start the server
app.listen(PORT, function () {
    console.log('Server started on port ' + PORT);
});
