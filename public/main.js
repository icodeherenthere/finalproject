var calculate = document.getElementsByClassName('calculate');
var height = document.querySelector('#height');
var age = document.querySelector('#age');
var weight = document.querySelector('#weight');
var sex = document.querySelector('#sex');
var add = document.getElementsByClassName("add");
var gone = document.getElementsByClassName('deleteVehicles');
var water = document.getElementsByClassName('ounces liters');

// function to calculate calories needed based on height, weight, sex, age, and timeMultiplier
function calculateCalories() {
  var timeMultiplier = parseFloat(document.getElementById('activity').value);
  console.log(timeMultiplier, 'here')
  let x = timeMultiplier * 400;
  console.log(x , 'here')
  if (sex.value === 'male') {
    let caloriesNeededM = (9.99 * (weight.value * 0.45359237) + 6.25 * (height.value * 2.54) - (4.92 * age.value + 5)) * timeMultiplier;
    return Math.ceil(caloriesNeededM);
  } else if (sex.value === 'female') {
    let caloriesNeededF = (9.99 * (weight.value * 0.45359237) + 6.25 * (height.value * 2.54) - (4.92 * age.value - 161)) * timeMultiplier;
    return Math.ceil(caloriesNeededF);
  }
}

Array.from(calculate).forEach(function(element){
  element.addEventListener('click', function(e){
    let calculation = calculateCalories();
    let waterIntake = (weight / 2);
    document.getElementById('calCount').textContent = 'Calories Needed  '+ calculation + ' or ' + ' ' + Math.ceil(calculation * .3) + ' per session';
    document.getElementById('ounces').textContent = `Water(in ounces) ${waterIntake}`;
    document.getElementById('liters').value = waterIntake * 0.02957;
  });
});

// 8 ounces
// 1 oz = 0.02957 l




Array.from(add).forEach(function(element) {
      element.addEventListener('click', function(){
        const year = this.parentNode.parentNode.childNodes[1].innerText
        const motorcycleBrand = this.parentNode.parentNode.childNodes[3].innerText
        const motorcycleModel = this.parentNode.parentNode.childNodes[5].innerText
        const engineSize = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('/vehicles', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'year': year,
            'motorcycleBrand': motorcycleBrand,
            'motorcycleModel': motorcycleModel,
            'engineSize':engineSize
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

function deleteVehicles(id){
  fetch('/vehicles', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': id
    })
  }).then(function (response) {
    window.location.reload()

  })
};

Array.from(gone).forEach(function(element){
  element.addEventListener('click', function(e){
  deleteVehicles(this.getAttribute('data-id'))
})});
