let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameStarted = false;

const startButton = document.querySelector(".button");
const gameStatus = document.querySelector(".start-game");
const cards = document.querySelectorAll(".card");
const lives = document.querySelector(".hearts");
const matchedCard = document.getElementsByClassName("match");
const reStartGame = document.getElementById("restart-game");
// let mySound = new Audio("audio\underwater-ambience-6201.mp3")
// mySound.play()

function flipWhenStart() {
  gameStarted = true;

  cards.forEach((card) => card.classList.add("flip"));

  setTimeOut("You have 15 seconds to memorize the cards", 0);
  setTimeOut("Here you go!", 5000);

  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flip"));
  }, 10000); 

  if (gameStarted) {
    cards.forEach((card) => card.addEventListener("click", flipCard));
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip", "match");
  this.style.visibility = "visible"

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    
    setTimeout(() => {
        disableCards()
    }, 500);
    
    return;
  }

  unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

    
      firstCard.style.visibility = "hidden"
      secondCard.style.visibility = "hidden"
    

  if (matchedCard.length == 20) {
    gameStatus.innerHTML = "<h4><strong>You win! Click Restart to play again.</strong></h4>";
    restartGame();
  }

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    
    loseALife();

    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach((card) => {
    let randomNumber = Math.floor(Math.random() * 20);
    card.style.order = randomNumber;
  });
})();

function loseALife() {
  gameStatus.innerHTML = "<h4><strong>Lost a life!</strong></h4>";
  let child = document.querySelector(".life");
  lives.removeChild(child);
  if (lives.children.length === 0) {
    setTimeOut("You lose! Click Restart to play again.", 1000);
    restartGame();
    cards.forEach((card) => card.removeEventListener("click", flipCard));
  } else {
    setTimeOut("Proceed...", 1000);
  }
}

function setTimeOut(string, timeout) {
  setTimeout(() => {
    gameStatus.innerHTML = `<h4><strong>${string}</strong></h4>`;
  }, timeout);
}

function restartGame() {
  const restart = document.createElement("button");
  restart.innerHTML = "<strong>Restart</strong>";
  restart.setAttribute("class", "btn btn-warning start button");
  restart.setAttribute("onClick", "window.location.reload()");
  reStartGame.appendChild(restart);
}

startButton.addEventListener("click", flipWhenStart);
startButton.removeEventListener("click", startButton);
