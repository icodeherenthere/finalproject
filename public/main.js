var add = document.getElementsByClassName("add");
var trash = document.getElementsByClassName("fa-trash");
var calculate = document.getElementById('calculate')

// function to calculate calories needed based on height and weight
function calculateCalories(height, weight, sex, age) {
  if (sex === 'male') {
    let caloriesNeededM = 9.99 * (weight * 0.45359237) + 6.25 * (height * 2.54) - (4.92 * age + 5);
    return caloriesNeededM;
  } else if (sex === 'female') {
    let caloriesNeededF = 9.99 * (weight * 0.45359237) + 6.25 * (height * 2.54) - (4.92 * age - 161);
    return caloriesNeededF;
  }
}

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

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messages/thumbDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbDown':thumbDown,
//         'thumbUp':thumbUp
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const year = this.parentNode.parentNode.childNodes[1].innerText
        const motorcycleBrand = this.parentNode.parentNode.childNodes[3].innerText
        const motorcycleModel = this.parentNode.parentNode.childNodes[5].innerText
        const engineSize = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('/vehicles', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'year': year,
            'motorcycleBrand': motorcycleBrand,
            'motorcycleModel': motorcycleModel,
            'engineSize':engineSize
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
