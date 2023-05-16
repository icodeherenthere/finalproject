const { model } = require("mongoose");

module.exports = function(app, passport, db, ObjectId) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('info').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            vehicles: result
          })
        })
    });

    // CALCULATOR PAGE =========================
    app.get('/calculator', function(req, res) {
      res.render('calculator.ejs');
    });

    

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================
// can i use object id here or would i need to specify what i am saving?
    app.post('/vehicles', (req, res) => {
      let url = `https://api.api-ninjas.com/v1/motorcycles?year=${req.body.year}&make=${req.body.motorcycleBrand}&model=${req.body.motorcycleModel}`
      let options = {
        method: 'GET',
        headers: { 'x-api-key': 'd3FBQsNaOed6pB4pZs62yw==NpduHXbVBG1LmGg1' }
      }
      fetch(url, options)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if (data.length === 0) {
          alert('Motorcycle not found');
          return;
        }
        
        let frontTire = data[0].front_tire
        let rearTire = data[0].rear_tire
        if (!frontTire || !rearTire) {
          alert('No tire sizes found for this motorcycle');
          return;
        }

        const updatedFrontSize = frontTire.replace(/(.+)-(\d+)/, '$1/R$2');
        const updatedRearSize = rearTire.replace(/(.+)-(\d+)/, '$1/R$2');
        console.log(updatedFrontSize, 'front')
        console.log(updatedRearSize, 'rear')
        db.collection('info').save({year: req.body.year, motorcycleBrand: req.body.motorcycleBrand, motorcycleModel: req.body.motorcycleModel,engineSize: req.body.engineSize, frontTire : updatedFrontSize, rearTire : updatedRearSize}, (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database')
          res.redirect('/profile')
        })
        
      })
    .catch(err => {
      console.log(`error ${err}`)
    });
      
    });

    app.post('/vehicles', (req, res) => {
      const trackNeedsId = req.body.trackNeedsId;
    console.log(trackNeedsId)
      db.collection('trackNeeds').updateOne(
        { _id: ObjectId(trackNeedsId) },
        (err, result) => {
          if (err) return console.log(err);
          console.log('RSVP saved to database');
          res.redirect('/profile');
        }
      );
    });

    app.post('/calculate', function(req, res) {
      db.collection('info').save({}, (err, result) => { 
        if (err) return console.log(err)
      // extract height and weight from form data
      let sex = req.body.male ? 'male' : (req.body.female ? 'female' : null);
      let height = req.body.height;
      let weight = req.body.weight;
      let age = req.body.age;
    
      // calculate calories needed
      let caloriesNeeded = calculateCalories(height, weight, sex, age);
    
      // render the template and pass in the calculated calories
      res.render('calories', { caloriesNeeded: caloriesNeeded });
      console.log('saved to database')
        res.redirect('/profile')
    })});

    app.put('/vehicles', (req, res) => {
      db.collection('info').findOneAndUpdate(
        { year: req.body.year, motorcycleBrand: req.body.motorcycleBrand, motorcycleModel: req.body.motorcycleModel, engineSize: req.body.engineSize },
        { $set: { year: req.body.year, 
          motorcycleBrand: req.body.motorcycleBrand, 
          motorcycleModel: req.body.motorcycleModel, 
          engineSize: req.body.engineSize } },
        { sort: { _id: -1 }, upsert: true },
        (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        }
      )
    })
  
    app.delete('/vehicles', (req, res) => {
      db.collection('info').findOneAndDelete({_id: ObjectId(req.body.id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.redirect('/profile')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash vehicles
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash vehicles
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
