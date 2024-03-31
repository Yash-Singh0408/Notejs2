require ('dotenv').config();

const exp = require('constants');
const express = require ('express');
const expressLayouts = require ('express-ejs-layouts');
const methodOverride = require ('method-override')
const connectDB = require ('./server/config/database')  //Db Connect file importing
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');


//Create express app
const app = express();
const PORT = 8000 || process.env.PORT;

// Connect DB
connectDB();

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * 24, // 1 day (adjust as needed)
    //     secure: false, // Set to true if using HTTPS
    //     httpOnly: true,
    //     sameSite: 'strict'
    // }
}))

app.use(passport.initialize());
app.use(passport.session());

//Middle ware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

    //Static Files (also a middleware)
    app.use(express.static('public'))

//Template Engine
app.use (expressLayouts);
app.set ('layout','./layouts/main');
app.set ('view engine','ejs');

//route
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

        //Handel 404
        app.get('*',(req,res)=>{
            // res.status(404).send('404 Page Not Found.')
            res.status(404).render('404')
        })

//listining to port
app.listen(PORT,()=>{
    console.log(`App listening On ${PORT}`)
});