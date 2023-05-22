// const next = document.getElementById("nextAfterSelect").addEventListener('change', handleSelect)
// const nextStep = document.getElementById("nextAfterSubmit").addEventListener('click', handleSelect)
// const stepOne = document.getElementsByClassName('stepOne')
// const stepTwo = document.getElementsByClassName('stepTwo')
// const stepThree = document.getElementsByClassName('stepThree')

// // this code should work

// function handleSelect(e) {
//   const nextIndex = e.target.selectedIndex - 1
//   console.log("events", events[eventIndex])
//     // mistake here was using events[eventIndex], we should be using events[i]. without [i]
//     // it doesn't hide all of the events, only the selected one
//     if (stepOne.classList.contains("hidden") !== true) {
//       // if we return here then the loop ends immediately, and we don't need a return because classList.add 
//       // just does what it needs to do, it doesn't return anything
//       stepOne.classList.add("hidden")
//     }else 
  
//   stepOne.classList.remove("hidden")
//   stepTwo.classList.remove("hidden")
//   stepThree.classList.remove("hidden")
// }
const next = document.getElementById("nextAfterSelect").addEventListener('change', handleSelect);
const nextStep = document.getElementById("nextAfterSubmit").addEventListener('click', handleSelect);
const stepOne = document.getElementsByClassName('stepOne')[0];
const stepTwo = document.getElementsByClassName('stepTwo')[0];
const stepThree = document.getElementsByClassName('stepThree')[0];

function handleSelect(e) {
  const nextIndex = e.target.selectedIndex - 1;
  console.log("events", events[nextIndex]);

  if (stepOne.classList.contains("hidden")) {
    stepOne.classList.remove("hidden");
  }
  
  stepTwo.classList.remove("hidden");
  stepTwo.classList.remove("hidden");
  stepThree.classList.remove("hidden");
}

const dropdown = document.getElementById("dropdown");
  const formContainer = document.getElementById("formContainer");

  dropdown.addEventListener("change", handleDropdownChange);

  function handleDropdownChange() {
    const selectedValue = dropdown.value;

    // Clear the form container
    formContainer.innerHTML = "";

    // Create and append the selected form based on the value
    if (selectedValue === "form1") {
      const form1 = document.createElement("form");
      // Add form fields, labels, and other elements as needed
      formContainer.appendChild(form1);
    } else if (selectedValue === "form2") {
      const form2 = document.createElement("form");
      // Add form fields, labels, and other elements as needed
      formContainer.appendChild(form2);
    } else if (selectedValue === "form3") {
      const form3 = document.createElement("form");
      // Add form fields, labels, and other elements as needed
      formContainer.appendChild(form3);
    }
  }