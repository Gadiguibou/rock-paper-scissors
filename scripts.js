const playBtn = document.querySelector(".play-button");
const rockBtn = document.querySelector(".rock-button");
const paperBtn = document.querySelector(".paper-button");
const scissorsBtn = document.querySelector(".scissors-button");

const currentRoundNode = document.querySelector(".current-round");
const totalRoundsNode = document.querySelector(".total-rounds");
const playerScoreNode = document.querySelector(".player-score");
const computerScoreNode = document.querySelector(".computer-score");

let currentRound = 0;
let totalRounds = 0;
let playerScore = 0;
let computerScore = 0;

const roundResultPara = document.querySelector(".round-result");

const computerPlay = function () {
  // Choose a random integer between 0 inclusively and 3 exclusively and store it in a variable named randomInt.
  let randomInt = Math.floor(Math.random() * 3);
  // Log value of randomInt to the console.
  // console.log(`randomInt === ${randomInt}`);
  // Create a variable named result to store the computer's choice.
  let result;
  // Assign a value to result based on randomInt's value.
  switch (randomInt) {
    case 0:
      // If randomInt = 0, assign the value of "Rock" to result.
      result = "Rock";
      break;
    case 1:
      // If randomInt = 1, assign the value of "Paper" to result.
      result = "Paper";
      break;
    case 2:
      //If randomInt = 2, assign the value of 'Scissors' to result.
      result = "Scissors";
      break;
  }
  // Log what the computer picked.
  console.log(`Computer picked ${result}.`);
  // Return result.
  return result;
};

const checkGameEnd = function () {
  if (currentRound >= totalRounds) {
    declareWinner();
    stopGame();
  }
};

const declareWinner = function () {
  if (playerScore === computerScore) {
    roundResultPara.textContent = `Draw! The game ends with ${playerScore}s everywhere.`;
  } else if (playerScore > computerScore) {
    roundResultPara.textContent = `Victory! You won the game ${playerScore} to ${computerScore}.`;
  } else {
    roundResultPara.textContent = `Defeat! You lost the game ${computerScore} to ${playerScore}.`;
  }
};

const stopGame = function () {
  rockBtn.setAttribute("disabled", "disabled");
  paperBtn.setAttribute("disabled", "disabled");
  scissorsBtn.setAttribute("disabled", "disabled");

  playBtn.removeAttribute("disabled");
};

const playRound = function (playerSelection, computerSelection) {
  // If both arguments are the same return "It's a draw! You both chose " + the value of the arguments
  if (playerSelection === computerSelection) {
    roundResultPara.textContent = `It's a draw. You both chose ${playerSelection}`;
    return "Draw";
  }
  // If the playerSelection beats the computerSelection return "You Win! ${playerSelection} beats ${computerSelection}"
  else if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Scissors" && computerSelection === "Paper")
  ) {
    currentRound++;
    currentRoundNode.textContent = currentRound;
    playerScore++;
    playerScoreNode.textContent = playerScore;
    roundResultPara.textContent = `You win this round! ${playerSelection} beats ${computerSelection}.`;
    return "playerWin";
  }
  // Else, the computerSelection beats the playerSelection. Return "You Lose! ${computerSelection} beats ${playerSelection}"
  else {
    currentRound++;
    currentRoundNode.textContent = currentRound;
    computerScore++;
    computerScoreNode.textContent = computerScore;
    roundResultPara.textContent = `You lost this round! ${computerSelection} beats ${playerSelection}.`;
    return "playerLose";
  }
};

const startGame = function () {
  playBtn.setAttribute("disabled", "disabled");
  while (true) {
    let roundPrompt = prompt("How many rounds do you want to play?");
    if (roundPrompt === null) {
      playBtn.removeAttribute("disabled");
      return;
    } else {
      roundPrompt = Number(roundPrompt);
    }
    if (roundPrompt >= 1) {
      roundResultPara.textContent =
        "Show off your skills in this game for masterminds.";
      currentRound = 0;
      currentRoundNode.textContent = currentRound;

      totalRounds = roundPrompt;
      totalRoundsNode.textContent = totalRounds;

      playerScore = 0;
      computerScore = 0;
      playerScoreNode.textContent = playerScore;
      computerScoreNode.textContent = computerScore;

      alert(`You are playing a best of ${roundPrompt}.`);

      rockBtn.removeAttribute("disabled");
      paperBtn.removeAttribute("disabled");
      scissorsBtn.removeAttribute("disabled");
      return;
    } else {
      alert("Please enter a valid number.");
    }
  }
};

playBtn.addEventListener("click", startGame);

rockBtn.addEventListener("click", () => {
  playRound("Rock", computerPlay());
  checkGameEnd();
});
paperBtn.addEventListener("click", () => {
  playRound("Paper", computerPlay());
  checkGameEnd();
});
scissorsBtn.addEventListener("click", () => {
  playRound("Scissors", computerPlay());
  checkGameEnd();
});

/* START OLD CODE
// Declare a global function that takes a number of rounds as a parameter (must be an integer)
// and plays those rounds while keeping track of the score.
function game(numberOfRounds = 5) {
  // Create two variables named playerScore and computerScore to hold integers and set them to 0.
  let playerScore = 0;
  let computerScore = 0;

  const scoreToWin = Math.floor(numberOfRounds / 2) + 1;

  const gameDiv = document.querySelector(".game-div");
  // Remove all nodes in gameDiv
  while (gameDiv.firstChild) {
    gameDiv.removeChild(gameDiv.firstChild);
  }

  const choiceMessage = document.createElement("p");
  choiceMessage.textContent = "Pick your choice.";
  gameDiv.append(choiceMessage);

  const rockButton = document.createElement("button");
  rockButton.textContent = "Rock";
  gameDiv.append(rockButton);

  const paperButton = document.createElement("button");
  paperButton.textContent = "Paper";
  gameDiv.append(paperButton);

  const scissorsButton = document.createElement("button");
  scissorsButton.textContent = "Scissors";
  gameDiv.append(scissorsButton);

  // Declare a function that takes 2 parameters: playerSelection and computerSelection, and returns the winner of the round.
  function playRound(playerSelection, computerSelection) {
    // If both arguments are the same return "It's a draw! You both chose " + the value of the arguments
    if (playerSelection === computerSelection) {
      return "Draw";
    }
    // If the playerSelection beats the computerSelection return "You Win! ${playerSelection} beats ${computerSelection}"
    else if (
      (playerSelection === "Rock" && computerSelection === "Scissors") ||
      (playerSelection === "Paper" && computerSelection === "Rock") ||
      (playerSelection === "Scissors" && computerSelection === "Paper")
    ) {
      return "playerWin";
    }
    // Else, the computerSelection beats the playerSelection. Return "You Lose! ${computerSelection} beats ${playerSelection}"
    else {
      return "playerLose";
    }
  }

  // Declare a function named computerPlay that chooses something to play at random.
  function computerPlay() {
    // Choose a random integer between 0 inclusively and 3 exclusively and store it in a variable named randomInt.
    let randomInt = Math.floor(Math.random() * 3);
    // Log value of randomInt to the console.
    // console.log(`randomInt === ${randomInt}`);
    // Create a variable named result to store the computer's choice.
    let result;
    // Assign a value to result based on randomInt's value.
    switch (randomInt) {
      case 0:
        // If randomInt = 0, assign the value of "Rock" to result.
        result = "Rock";
        break;
      case 1:
        // If randomInt = 1, assign the value of "Paper" to result.
        result = "Paper";
        break;
      case 2:
        //If randomInt = 2, assign the value of 'Scissors' to result.
        result = "Scissors";
        break;
    }
    // Log what the computer picked.
    console.log(`Computer picked ${result}.`);
    // Return result.
    return result;
  }

  function updateScores(roundResult) {
    if (roundResult === "playerWin") {
      playerScore++;
    } else if (roundResult === "playerLose") {
      computerScore++;
    }
  }

  function checkVictory(currentPlayerScore, currentComputerScore) {
    if (currentPlayerScore >= scoreToWin) {
      const victoryPara = document.createElement("p");
      victoryPara.textContent = `Victory! You won the game with a score of ${playerScore} to ${computerScore}.`;
      gameDiv.append(victoryPara);
      return "gameWin";
    } else if (currentComputerScore >= scoreToWin) {
      const defeatPara = document.createElement("p");
      defeatPara.textContent = `Defeat! The computer won the game with a score of ${computerScore} to ${playerScore}.`;
      return "gameLose";
    } else {
      return;
    }
  }

  rockButton.addEventListener("click", () => {
    const roundMessage = document.createElement("p");
    roundResult = playRound("Rock", computerPlay());
    roundMessage.textContent = roundResult;
    gameDiv.append(roundMessage);
    updateScores(roundResult);
    checkVictory(playerScore, computerScore);
  });
  paperButton.addEventListener("click", () => {
    const roundMessage = document.createElement("p");
    roundResult = playRound("Paper", computerPlay());
    roundMessage.textContent = roundResult;
    gameDiv.append(roundMessage);
    updateScores(roundResult);
    checkVictory(playerScore, computerScore);
  });
  scissorsButton.addEventListener("click", () => {
    const roundMessage = document.createElement("p");
    roundResult = playRound("Scissors", computerPlay());
    roundMessage.textContent = roundResult;
    gameDiv.append(roundMessage);
    updateScores(roundResult);
    checkVictory(playerScore, computerScore);
  });
}
// Create a constant named playButton to store the button element of class .playButton on the page.
const playButton = document.querySelector(".playButton");
// When the playButton is clicked, play a game.
playButton.onclick = function playGame() {
  // Ask how many rounds the user wants to play and store it in a variable named roundPrompt.
  let roundPrompt = Number(prompt("How many rounds do you want to play?"));
  // If roundPrompt is greater than 1 (implies that it is a number):
  if (roundPrompt >= 1) {
    // Log how many rounds will be played to the console.
    alert(`You are playing a best of ${roundPrompt}.`);
    // Play a game with roundPrompt rounds.
    game(roundPrompt);
  }
  // Else:
  else {
    // Alert "Please enter a valid number."
    alert("Please enter a valid number.");
  }
};
END OLD CODE */
