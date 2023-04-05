const express = require('express')
const router = express.Router()
const passport = require('passport')

//AUTHENTICATION WITH GOOGLE
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

//GOOGLE AUTH CALLBACK
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    (req,res) => {
        return res.render('dashboard')
    }
)


// router.get('/dashboard', (req,res) => {
//     req.logout()
//     res.redirect('/')
// })

// router.get('/logout', function(req, res, next){
//     req.logout(function(error) {
//       if (err) { return next(error); }
//       res.redirect('/');
//     });
//   });

module.exports = router