document.querySelector(".sort-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // execute first the function numberRaffle, after the function showResults
  numberRaffle().then(showResults);
});

// putting event in the reset button
document.getElementById("btn-reset").addEventListener("click", () => {
  document.getElementById("form-container").style.display = "block";
  document.getElementById("result").style.display = "none";
});

const quantityNumberInput = document.getElementById("number");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const repeatNumberInput = document.getElementById("toggle");

function numberRaffle() {
  return new Promise((resolve) => {
    // getting values
    const quantityNumberValue = Number.parseInt(quantityNumberInput.value);
    const fromValue = Number.parseInt(fromInput.value);
    const toValue = Number.parseInt(toInput.value);
    const repeatNumberValue = repeatNumberInput.checked;

    // creating numbers array
    const numbers = [];

    if (repeatNumberValue) {
      for (let i = 0; i < quantityNumberValue; i++) {
        // formula to generate numbers
        const number =
          Math.floor(Math.random() * (toValue - fromValue + 1)) + fromValue;
        // adding number in numbers array
        numbers.push(number);
      }
    } else {
      if (quantityNumberValue > toValue - fromValue + 1) {
        alert("A quantidade de números é maior que o intervalo disponível!");
        resolve([]);
        return;
      }

      while (numbers.length < quantityNumberValue) {
        const number =
          Math.floor(Math.random() * (toValue - fromValue + 1)) + fromValue;
        if (!numbers.includes(number)) {
          numbers.push(number);
        }
      }
    }
    resolve(numbers);
  });
}

function showResults(numbers) {
  const resultContainer = document.getElementById("result-numbers");
  // to clear the result in the square
  resultContainer.innerHTML = "";

  // creating a square to each number
  numbers.forEach((number) => {
    const square = document.createElement("div");
    square.className = "number-square";

    const rotatingSquare = document.createElement("div");
    rotatingSquare.className = "rotating-square";

    const numberElement = document.createElement("div");
    numberElement.className = "number";
    numberElement.textContent = number;

    square.appendChild(rotatingSquare);
    square.appendChild(numberElement);
    resultContainer.appendChild(square);

    setTimeout(() => {
      rotatingSquare.style.animation = "rotate 1s ease-in-out";

      setTimeout(() => {
        rotatingSquare.style.opacity = "0";
        numberElement.style.opacity = "1";
        numberElement.style.transform = "scale(1)";
      }, 500);
    });
  });
  document.getElementById("form-container").style.display = "none";
  document.getElementById("result").style.display = "block";
}
