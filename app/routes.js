const { model } = require("mongoose");
const { tiresToUse } = require("../public/constants");

module.exports = function(app, passport, db, ObjectId) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
      db.collection('personalBest').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('index.ejs', {personalBest: result});
      })
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('info').find().toArray((err, result) => {
          if (err) return console.log(err)
        db.collection('trackNeeds').findOne((err, trackNeeds) => {
          console.log(trackNeeds, 'here')
          res.render('profile.ejs', {
            user : req.user,
            vehicles: result,
            trackNeeds: trackNeeds
          })
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
          console.log('Motorcycle not found');
          return;
        }
        
        let frontTire = data[0].front_tire
        let rearTire = data[0].rear_tire
        if (!frontTire || !rearTire) {
          console.log('No tire sizes found for this motorcycle');
          return;
        }

        const updatedFrontSize = frontTire.replace(/-.+R/,'/R').trim();
        const updatedRearSize = rearTire.replace(/-.+R/,'/R').trim();
        
        const matchedTires = matchTires(updatedFrontSize, updatedRearSize)
        // console.log('*********', convertToTubeless(frontTire, rearTire))
        // //working on conversion chart
        // function convertToTubeless(front, rear) {
        //   const conversionChart = {
        //     "3.00-17": "110/70-R17",
        //     "3.50-18": "120/70-R18",
        //     "4.10-19": "110/80-R19",
        //     "2.75-17": "100/80-R17",
        //     "4.60-17": "130/70-R17",
        //     "3.25-19": "100/90-R19",
        //     "3.50-16": "110/70-R16",
        //     "2.50-18": "90/90-R18",
        //     "3.75-21": "90/90-R21",
        //     "2.75-14": "80/80-R14",
        //     "5.00-17": "150/70-R17",
        //     "4.60-16": "130/80-R16",
        //     "2.75-21": "90/80-R21",
        //     "3.25-17": "100/70-R17",
        //     "3.50-15": "100/80-R15",
        //     "4.10-18": "120/80-R18",
        //     "2.75-16": "80/80-R16",
        //     "3.00-18": "100/80-R18",
        //     "4.50-17": "130/80-R17",
        //     "3.50-10": "90/90-R10",
        //     "2.75-18": "90/80-R18",
        //     "4.60-18": "120/80-R18",
        //     "3.00-16": "100/80-R16",
        //     "3.25-16": "90/80-R16",
        //     "2.75-19": "100/90-R19",
        //     "4.25-17": "120/70-R17",
        //     "3.50-12": "110/70-R12",
        //     "2.75-15": "80/80-R15",
        //     "3.75-18": "110/90-R18",
        //     "4.60-19": "120/90-R19",
        //     "2.50-16": "80/80-R16",
        //     "3.50-14": "100/80-R14",
        //     "4.10-17": "110/80-R17",
        //     "2.75-23": "110/80-R23",
        //     "3.00-14": "90/80-R14",
        //     "4.60-21": "120/90-R21",
        //     "3.25-15": "90/80-R15",
        //     "4.50-16": "130/80-R16",
        //     "3.50-8": "100/80-R8",
        //     "2.75-20": "100/80-R20",
        //     "4.10-16": "110/80-R16"
        //   };
          
        //   let convertedFront = '';
        //   let convertedRear = '';

        //   if(conversionChart.hasOwnProperty(front) || conversionChart.hasOwnProperty(rear)){
        //     convertedFront = conversionChart[front]
        //     convertedRear = conversionChart[rear]
        //   }else{
        //     console.log(`Doesn't exhist`)
        //   }
        //   // function isTubelessTireSize(size) {
        //   //   // Implement your own logic to check if the size matches the structure of a tubeless tire
        //   //   // Return true if it matches, otherwise return false
        //   //   // Example: check for a pattern like "number/number-number"
        //   //   const pattern = /^\d+\/\d+-\d+$/;
        //   //   return pattern.test(size);
        //   // }
          
        //   // if (!isTubelessTireSize(tireSize)) {
        //   //   // Extract the tubed tire size from the API response
        //   //   const tubedSize = tireSize.replace(/\btubed\b/gi, "").trim();
            
        //   //   // Check if the tubed size exists in the conversion chart
        //   //   if (tubedSize in conversionChart) {
        //   //     const convertedSize = conversionChart[tubedSize];
        //   //     return `${convertedSize} (Tubeless)`;
        //   //   }
        //   // }
          
        //   // Return the tire size as is if no conversion is needed
        //   return convertedFront;
        // }
        
        // // Convert the tire size based on the API response
        // const convertedTireSize = convertToTubeless(apiResponse);
        // console.log(convertedTireSize); // Output: "110/70-17 (Tubeless)"
        
        db.collection('info').save({year: req.body.year, motorcycleBrand: req.body.motorcycleBrand, motorcycleModel: req.body.motorcycleModel, engineSize: req.body.engineSize, frontTire: updatedFrontSize, rearTire: updatedRearSize, matchedTires: matchedTires}, (err, result) => {
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
    
      db.collection('trackNeeds').updateOne(
        { _id: ObjectId(trackNeedsId) },
        (err, result) => {
          if (err) return console.log(err);
          console.log('saved to database');
          res.redirect('/profile');
        }
      );
    });

    app.post('/personalBest', (req, res) => {
      const personalBest = req.body.personalBest
      const name = req.body.name;
      const vehicleUsed = req.body.vehicleUsed;
      const track = req.body.track;
      const bestLapTime = req.body.bestLapTime;
    console.log(name, vehicleUsed, track, bestLapTime)
      db.collection('personalBest').insertOne(
        { name: req.body.name, vehicleUsed: req.body.vehicleUsed, track: req.body.track, bestLapTime: req.body.bestLapTime},
        (err, result) => {
          if (err) return console.log(err);
          console.log('PB saved to database');
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

function matchTires(updatedFrontSize, updatedRearSize) {
  const tireBrands = Object.keys(tiresToUse);
  let isFrontMatch = false;
  let isRearMatch = false;
  // grabs all the info from the names
  let frontResults = [];
  let rearResults = [];
  let rearResultsOneUp = [];
  // let results = [`Both front and back tires match for brand ${tireBrands[i]}`, `Front tire matches, but rear tire size is one size bigger for brand ${tireBrands[i]}`, `Front tire matches, but rear tire size is one size smaller for brand ${tireBrands[i]}`]
  for (let i = 0; i < tireBrands.length; i++) {
    let brandInfo = tiresToUse[tireBrands[i]];
    let frontTire = brandInfo.frontTire
    let rearTire = brandInfo.rearTire
    // Front tire
    // checks if the front tire is there
    // make a conditonal that matches the info from the array and the updatedfrontsize
    for (let j = 0; j < frontTire.length; j++) {
      
      if (updatedFrontSize === frontTire[j]) {
        isFrontMatch = true;
        frontResults.push(`${tireBrands[i]}: ${updatedFrontSize}`)

      }

    }
    // Rear tire
    // Only if there is a front tire, find the match for updatedRearSize and one size bigger (or one size smaller if it is at the end of the array)
    for (let k = 0; k < rearTire.length; k++) {
      if (updatedRearSize === rearTire[k]) {
        isRearMatch = true;
        rearResults.push(`${tireBrands[i]}: ${updatedRearSize}`)
          if(k + 1 < rearTire.length){
            rearResultsOneUp.push(`${tireBrands[i]}: ${rearTire[k + 1]}`)
          }
      }
    }
  }
  if(isFrontMatch && isRearMatch){
    return {
      matchedFrontTires: frontResults,
      matchedRearTires: rearResults,
      rearResultsOneUp: rearResultsOneUp
    }
  }else{
    return {
      matchedFrontTires: [],
      matchedRearTires: [],
      rearResultsOneUp: []
    }
  }
}
