const express = require('express');
const router = express.Router();
const {loginPage, dashboardPage, google, googleCallback, logout} = require('../controllers/auth')
const passport = require('passport');
// const {ensureAuthenticated, ensureAuthenticatedGuest} = require('../middleware/auth')
const {ensureAuth, ensureGuest} = require('../middleware/auth')




//LOGIN AND LANDINGPAGE ROUTE
// router.route('/').get(ensureAuthenticatedGuest, loginPage);
router.route('/').get(loginPage);


//DASHBOARD ROUTE
// router.route('/dashboard').get(ensureAuthenticated, dashboardPage);
// router.route('/dashboard').get(dashboardPage);


//LOGOUT ROUTE
router.route('/logout').get(logout);

//GOOGLE AUTHENTICATION ROUTE
// router.route('/google').get(google)
// router.route('/googleCallback').get(googleCallback)

router.get('/dashboard', (req,res) => {
    console.log(req.user);
    res.render('dashboard')
})

module.exports = router