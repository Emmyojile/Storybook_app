module.exports = {
    ensureAuth: (req,res,next) => {
        if(req.isAuthenticated()) {
            return next()
    }   else {
            res.redirect('/')
    }
},
    ensureGuest: (req, res, next) => {
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   else
//   res.redirect('/')
// }

// function ensureAuthenticatedGuest(req, res, next) {
//   if (req.isAuthenticated())
//     res.redirect('/dashboard')
//   else
//     return next();
// }

// module.exports = {ensureAuthenticated, ensureAuthenticatedGuest}