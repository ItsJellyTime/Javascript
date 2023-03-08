let score = 0; // Initialize score
let attempts = 0; // Initialize attempts

// Generate a random math question
function generateQuestion() {
  let num1 = Math.floor(Math.random() * 100) + 1;
  let num2 = Math.floor(Math.random() * 100) + 1;
  let operator = Math.floor(Math.random() * 3); // 0 for +, 1 for -, 2 for /

  if (operator === 0) {
    return num1 + " + " + num2;
  } else if (operator === 1) {
    return num1 + " - " + num2;
  } else {
    if (num1 > num2) {
      return num1 + " / " + num2;
    } else {
      return num2 + " / " + num1;
    }
  }
}

// Display the current score
function displayScore() {
  document.getElementById("score").innerHTML = "Score: " + score;
}

// Check if the user's answer is correct
function checkAnswer() {
  let answer = parseFloat(document.getElementById("answer").value);
  let result;
  
  if (question.includes("+")) {
    let parts = question.split("+");
    let num1 = parseInt(parts[0].trim());
    let num2 = parseInt(parts[1].trim());
    result = num1 + num2;
  } else if (question.includes("-")) {
    let parts = question.split("-");
    let num1 = parseInt(parts[0].trim());
    let num2 = parseInt(parts[1].trim());
    result = num1 - num2;
  } else {
    let parts = question.split("/");
    let num1 = parseInt(parts[0].trim());
    let num2 = parseInt(parts[1].trim());
    result = num1 / num2;
  }
  
  if (answer === result) {
    document.getElementById("checkmark").style.display = "inline-block";
    document.getElementById("checkmark").style.color = "green";
    document.getElementById("answer").value = "";
    document.getElementById("answer").style.border = "2px solid green";
    score++; // Increase score if answer is correct
    question = generateQuestion(); // Generate a new question if answer is correct
    document.getElementById("question").innerHTML = question; // Display new question
  } else {
    document.getElementById("checkmark").style.display = "none";
    document.getElementById("answer").style.border = "2px solid red";
  }
  
  attempts++; // Increase attempts regardless of answer
  displayScore(); // Update scoreboard
  
  if (score === 10) { // If 10 correct answers, display "New Game" button
    document.getElementById("new-game").style.display = "inline-block";
  }
}

// Start a new game by reloading the page
function newGame() {
  location.reload();
}

let question = generateQuestion();
document.getElementById("question").innerHTML = question;
displayScore(); // Display initial scoreboard

// Press enter to submit answer
document.getElementById("answer").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});
