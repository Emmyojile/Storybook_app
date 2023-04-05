require('dotenv').config();

//EXPRESS
const express = require('express');
const app = express();
const path = require('path');

//OTHER PACKAGES
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const session = require('express-session');


// SETTING HANDLEBARS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

//STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

//PASSPORT CONFIG
const passport = require('passport');
require('./utils/passport')(passport)

//SESSIONS
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));

//PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

//DATABASE CONNECTION
const connectDB = require('./db/connect');

//LOGGING
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//ROUTES
// const router = require('./routes/auth');
app.use('/', require('./routes/auth'));
app.use('/auth', require('./routes/googleAuth'));

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}


start()
