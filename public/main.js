var add = document.getElementsByClassName("add");
var calculate = document.getElementsByClassName('calculate');
var gone = document.getElementsByClassName('deleteVehicles');

// function to calculate calories needed based on height and weight
function calculateCalories(height, weight, sex, age, timeMultiplier) {
  let x = 400 * timeMultiplier
  if (sex === 'male') {
    let caloriesNeededM = 9.99 * (weight * 0.45359237) + 6.25 * (height * 2.54) - (4.92 * age + 5);
    return caloriesNeededM;
  } else if (sex === 'female') {
    let caloriesNeededF = 9.99 * (weight * 0.45359237) + 6.25 * (height * 2.54) - (4.92 * age - 161);
    return caloriesNeededF;
  }
  console.log(height)
  console.log(weight)
  console.log(age)
  console.log(timeMultiplier)
  console.log(sex)
}

Array.from(calculate).forEach(function(element){
  element.addEventListener('click', function(e){
    let calculatation = calculateCalories(
      document.getElementById('height'),
      document.getElementById('weight'),
      document.getElementById('sex'),
      document.getElementById('age'),
      parseFloat(document.getElementById('activity'))
    )
    document.getElementById('calCount').textContent = 'Calories Needed ' + calculatation
})});

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
