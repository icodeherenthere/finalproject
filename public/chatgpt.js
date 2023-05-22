const mongoose = require('mongoose');

const tireSchema = new mongoose.Schema({
  brand: String,
  model: String,
  frontTire: String,
  rearTire: String,
  price: {
    type: Number,
    min: 145.04,
    max: 391.05
  }
});

const Tire = mongoose.model('Tire', tireSchema);


const tiresToUse = {
  'Bridgestone Battlax Racing R11': {
    frontTire: '120/70/R17',
    rearTire: '190/55/R17',
    price: 245.99
  },
  // additional tire models can be added here
};

// Loop through the tiresToUse object and create new documents for each tire
for (const [brandModel, tireData] of Object.entries(tiresToUse)) {
  const [brand, model] = brandModel.split(' ');
  const { frontTire, rearTire, price } = tireData;

  const newTire = new Tire({
    brand,
    model,
    frontTire,
    rearTire,
    price
  });

  newTire.save()
    .then(() => console.log(`Saved ${brand} ${model} tire to database`))
    .catch(err => console.error(`Error saving tire to database: ${err}`));
}

// Retrieve the Bridgestone Battlax Racing R11 tire from the database
Tire.findOne({ brand: 'Bridgestone', model: 'Battlax Racing R11' })
  .then(tire => console.log(`Front tire size: ${tire.frontTire}, rear tire size: ${tire.rearTire}, price: ${tire.price}`))
  .catch(err => console.error(`Error retrieving tire from database: ${err}`));

  document.getElementById('selectVehicle').addEventListener('change', function(){
    // when they select vehicle we will get the front and rear tire sizes from info collection then use those to to look up tire brands that match the sizes from constant.js 
    function searchFrontTire(array) {
      for (let key in array) {
        if (array[key]['frontTire'] === '120/70/R17') {
          return key;
        }
      }
      return 'Not found';
    }
    function searchRearTire(array) {
        for (let key in array) {
          if (array[key]['rearTire'] === '120/70/R17') {
            return key;
          }
        }
        return 'Not found';
      }
    
  })

  //  else if (updatedRearSize === rearTire[k + 1]) {       
  //       isRearMatch = true;
  //       results[1];
  //     } else if (k === rearTire.length - 1 && updatedRearSize === rearTire[k]) {
  //       isRearMatch = true;
  //       results[2];
  //     }

  // <div class="list-group vehicles" id="selectVehicle">
  //         <% for(var i=0; i<vehicles.length; i++) {%>
  //           <div class="list-group-item d-flex justify-content-between align-items-center">
  //             <input type="radio" name="selectedVehicle" value="<%= vehicles[i]._id %>">
  //             <label for="selectedVehicle">   
  //               <%= vehicles[i].year %> 
  //               <%= vehicles[i].motorcycleBrand %> 
  //               <%= vehicles[i].motorcycleModel %> 
  //               <%= vehicles[i].engineSize %>
  //             </label>
  //             <span>
  //               <button class="deleteVehicles" data-id="<%= vehicles[i]._id %>">
  //                 <i class="fa fa-trash" aria-hidden="true"></i>
  //               </button>
  //             </span>
  //           </div>
  //         <% } %>
  //       </div>