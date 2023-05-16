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

