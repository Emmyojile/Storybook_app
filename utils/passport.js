const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/auth");
const passport = require("passport");


module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({googleId: profile.id})

            if(user) {
                done(null, user)
            }   else {
                user = await User.create(newUser)
                done(null, user)
            }
        } catch (error) {
            console.log(error);   
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
      });

    // passport.deserializeUser((id, done) => {
    //     User.findById(id,(err, user) => done (err, user))
    //   });
      passport.deserializeUser(function(user,done) {
        process.nextTick(function(){
            return done(null, user);
        })
      })
      
}

//OR
// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//       cb(null, { id: user.id, username: user.username });
//     });
//   });

//   passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });



// STEVE'S CODEBASE
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback",
//     passReqToCallback : true
//   }, async (request, accessToken, refreshToken, profile, done) => {
//     try {
//         const newUser = {
//             googleId: profile.id,
//             displayName: profile.displayName,
//             firstName: profile.firstName,
//             lastName: profile.familyName,
//             image: profile.photos[0].value
//         }

//         let user = await User.findOne({googleId: profile.id})

//         if(user){
//             done(null, user)
//         } else {
//             user = await User.create(newUser)
//             done(null, user)
//         }

//         }
//          catch (error) {
//         console.log(error)
//     }
// }
// ));
