const numberDisplay = document.getElementById("number-display");
const squares = document.querySelectorAll(".square");
const checkBtn = document.getElementById("check-btn");
const message = document.getElementById("message");

let targetNumber;
let squareNumbers = [];

// Generate random numbers for squares
for (let i = 0; i < squares.length; i++) {
  let num = Math.floor(Math.random() * 10);
  squares[i].textContent = num;
  squareNumbers.push(num);
}

// Generate a random target number
targetNumber = Math.floor(Math.random() * 100);

// Update the target number display
numberDisplay.textContent = targetNumber;

// Check if the player can make the target number with the squares
checkBtn.addEventListener("click", function() {
  let sum = 0;
  for (let i = 0; i < squares.length; i++) {
    sum += parseInt(squares[i].textContent);
    if (sum === targetNumber) {
      message.textContent = "You win!";
      return;
    }
  }
  message.textContent = "Sorry, try again.";
});

// Reset the game
function resetGame() {
  squareNumbers = [];
  for (let i = 0; i < squares.length; i++) {
    let num = Math.floor(Math.random() * 10);
    squares[i].textContent = num;
    squareNumbers.push(num);
  }
  targetNumber = Math.floor(Math.random() * 100);
  numberDisplay.textContent = targetNumber;
  message.textContent = "";
}

// Reset the game when the reset button is clicked
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetGame);
