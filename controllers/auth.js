const auth = require('../models/auth');
const passport = require('../utils/passport');
const User = require('../models/auth')

exports.loginPage = async (req, res) =>{
    res.render('login', {title: 'LOGIN', layout : 'login'});
};

exports.dashboardPage = async (req, res) =>{
    res.render('dashboard', {msg:firstName});
};

exports.logout = async (req, res, next) => {
    req.logout(function(error) {
        if (error) { return next(error); }
        res.redirect('/');
      });
}