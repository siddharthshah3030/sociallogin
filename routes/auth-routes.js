const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  
  
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


// google login
        router.get('/google', passport.authenticate('google', {
            scope: ['profile']
        }));


router.get("/google/redirect",passport.authenticate("google"), (req, res) => {
    res.redirect('/profile');
});

//     if (err.name === 'TokenError') {
//         console.log("error ir " +err);
//      res.redirect('/auth/google'); // redirect them back to the login page
//     } else {
//      // Handle other errors here
//      console.log("errror has occured in else part " + err);
//     }
//   },
//   (req, res) => { // On success, redirect back to '/'
//     res.redirect('/profile');
//   }
    
    
// )




router.get('/twitter', passport.authenticate('twitter', {
                      scope: ['profile']
}));

router.get('/twitter/redirect',passport.authenticate('twitter'), (req, res) => {
    res.redirect('/profile');
});
//     if(err){ if (err.name === 'TokenError') {
//         console.log("error ir " +err);
//      res.redirect('/auth/twitter'); // redirect them back to the login page
//     } else {
//      // Handle other errors here
//      console.log("errror has occured in else part " + err);
//     }}
//   },(req, res) => { // On success, redirect back to '/'
//     res.redirect('/profile');
//   }
//     ));
    
    
    
    
    router.get('/github',passport.authenticate('github'));
 
router.get('/github/redirect',passport.authenticate('github'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});
//     if (err) { if (err.name === 'TokenError') {
//         console.log("error ir " +err);
//      res.redirect('/auth/github');
//     } else {
//      // Handle other errors here
//      console.log("errror has occured in else part " + err);
//     } }
//   },
//   (req, res) => { 
//     res.redirect('/profile');
//   }
//     ));
  
  
  
  
  
  
  router.get('/instagram',passport.authenticate('instagram'));

router.get('/instagram/redirect', passport.authenticate('instagram'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});
//     if (err) { if (err.name === 'TokenError') {
//         console.log("error ir " +err);
//      res.redirect('/instagram'); 
//      // Handle other errors here
//      console.log("errror has occured in else part " + err);
//     } }
//   },
//   (req, res) => {
//     res.redirect('/profile');
//   }
//     ));
  
  
  
  
  
  
  router.get('/linkedin',
  passport.authenticate('linkedin'));


router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

// router.get('/linkedin/redirect', 
//   passport.authenticate('linkedin',function(err, req, res, next){ 
//     if (err) { if (err.name === 'TokenError') {
//         console.log("error ir " +err);
//      res.redirect('/linkedin'); 
//     } else {
//      // Handle other errors here
//      console.log("errror has occured in else part " + err);
//     } }
//   },
//   (req, res) => { 
//     res.redirect('/profile');
//   }
//     ));
  
  
module.exports = router;
