const { tiresToUse } = require('./constants.js')
exports.tireRec = function (updatedFrontSize, updatedRearSize) {
  // all tire brand names
  const tireBrands = Object.keys(tiresToUse);

  // grabs all the info from the names
  for (let i = 0; i < tireBrands.length; i++) {
    let brandInfo = tiresToUse[tireBrands[i]];
    let isFrontMatch = false;
    let isRearMatch = false;

    // Front tire
    // checks if the front tire is there
    // make a conditonal that matches the info from the array and the updatedfrontsize
    for (let j = 0; j < brandInfo.length; j++) {
      if (updatedFrontSize === frontTire[j]) {
        console.log(front, 'here');
        isFrontMatch = true;

        // Rear tire
        // Only if there is a front tire, find the match for updatedRearSize and one size bigger (or one size smaller if it is at the end of the array)
        for (let k = 0; k < brandInfo.length; k++) {
          if (updatedRearSize === rearTire[k]) {
            return `Both front and back tires match for brand ${tireBrands[i]}`;
            isRearMatch = true;
          } else if (updatedRearSize === rearTire[k + 1]) {       
            isRearMatch = true;
            return `Front tire matches, but rear tire size is one size bigger for brand ${tireBrands[i]}`;
          } else if (k === brandInfo.length - 1 && updatedRearSize === rearTire[k]) {
            isRearMatch = true;
            return `Front tire matches, but rear tire size is one size smaller for brand ${tireBrands[i]}`
          }
        }
      }
    }
  }
}
