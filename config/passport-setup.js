const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./keys');
const User = require('../models/user-model');
const TwitterStrategy = require("passport-twitter").Strategy;


var GitHubStrategy = require('passport-github').Strategy;
var InstagramStrategy = require("passport-instagram");
var LinkedInStrategy = require("passport-linkedin");





passport.serializeUser((user, done) => {
   
   
             done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});







passport.use(new LinkedInStrategy({
    consumerKey: keys.linkedin.clientid,
    consumerSecret: keys.linkedin.clientsecret,
    callbackURL: "https://webdevbootcamp-siddharthshah.c9users.io/auth/linkedin/redirect"
  },
  function(token, tokenSecret, profile, done) {
 User.findOne({ linkedinId: profile.id }, function (err, currentUser) {
   if(currentUser){
                console.log('user is: ', currentUser);
                       done(null, currentUser);
            } else {
                       new User({
                    linkedinId: profile.id,
                    username: profile.displayName,
                
                    //thumbnail: profile._json.image.url
                    }).save().then((newUser) => {
                        console.log(profile)

                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
            return done(err, currentUser);
    });
  }
));









passport.use(new InstagramStrategy({
    clientID: keys.instagram.clientid,
    clientSecret: keys.instagram.clientsecret,
    callbackURL: "https://webdevbootcamp-siddharthshah.c9users.io/auth/instagram/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
 User.findOne({ instagramId: profile.id }, function (err, currentUser) {
   if(currentUser){
                console.log('user is: ', currentUser);
                   done(null, currentUser);
            } else {
                new User({
                        instagramId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.data.profile_picture
                }).save().then((newUser) => {
                                            console.log(profile)

                    console.log('created new user: ', newUser);
                        done(null, newUser);
                });
            }
            return done(err, currentUser);
    });
  }
));











 
passport.use(new GitHubStrategy({
    clientID: keys.github.clientid,
    clientSecret: keys.github.clientsecret,
    callbackURL: "https://webdevbootcamp-siddharthshah.c9users.io/auth/github/redirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ githubId: profile.id }, function (err, currentUser) {
   if(currentUser){
                console.log('user is: ', currentUser);
                      cb(null, currentUser);
            } else {
                new User({
                    githubId: profile.id,
                    username: profile.username,
                    //thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                                                            console.log(profile)

                    console.log('created new user: ', newUser);
                      cb(null, newUser);
                });
            }
            return cb(err, currentUser);
    });
  }
));














passport.use(new TwitterStrategy({
    consumerKey: keys.twitter.conskey,
    consumerSecret: keys.twitter.consecret,
    callbackURL: "https://webdevbootcamp-siddharthshah.c9users.io/auth/twitter/redirect"
  },
  function(token, tokenSecret, profile, cb) {
     User.findOne({ twitterId: profile.id}, function (err, currentUser){
   if(currentUser){
                console.log('user is: ', currentUser);
                cb(null, currentUser);
            } else {
                new User({
                    twitterId: profile.id,
                    username: profile.displayName,
                    data: profile,
                     thumbnail: profile._json.profile_image_url
                }).save().then((newUser) => {
                                        console.log(profile)
console.log('created new user: ', newUser);
                   return cb(null, newUser);
                });
            }
});
}));
// User.find({twitterId: profile.id}).then((currentUser) => {
//             if(currentUser){
//                 // already have this user
//                 console.log('user is: ', currentUser);
//                 cb(null, currentUser);
//             } else {
//                 // if not, create user in our db
//                 new User({
//                     twitterId: profile.id,
//                     username: profile.displayName,
//                     thumbnail: profile._json.image.url
//                 }).save().then((newUser) => {
//                     console.log('created new user: ', newUser);
//                     cb(null, newUser);
//                 });
//             }
//         });    
//   }
// ));













passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.find({googleId: profile.id}).exec().then((currentUser) => {
            if(currentUser){
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
