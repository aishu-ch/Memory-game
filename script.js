let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameStarted = false;

const startButton = document.querySelector(".button");
const gameStatus = document.querySelector(".start-game");
const cards = document.querySelectorAll(".card");
const lives = document.querySelector(".hearts");
let matchedCard = document.getElementsByClassName("match")


function flipWhenStart() {
  gameStarted = true;
  cards.forEach((card) => card.classList.add("flip"));

  setTimeOut("You have 15 seconds to memorize the cards", 0);

  setTimeOut("Here you go!", 5000);

  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flip"));
  }, 5000); //change to 15secs

  if (gameStarted) {
    cards.forEach((card) => card.addEventListener("click", flipCard));
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  this.classList.add("match");

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
    disableCards();
    return;
  }

  unFlipCards();
}

function disableCards() {
    
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
//   setTimeout(() => {
//     firstCard.style.visibility = "hidden"
//     secondCard.style.visibility = "hidden"
//   }, 1000);
    if (matchedCard.length == 20) {
        gameStatus.innerHTML = "<h4><strong>You win! Click Restart to play again.</strong></h4>"
    }

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    gameStatus.innerHTML = "<h4><strong>Lost a life!</strong></h4>";

    loseALife();

    if (lives.children.length === 0) {
      setTimeOut("You lose! Click Restart to play again.", 1500);
      cards.forEach((card) => card.removeEventListener("click", flipCard));
    } else {
      setTimeOut("Proceed...", 1500);
    }
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
  let child = document.querySelector(".life");
  let lostLife = lives.removeChild(child);
}

function setTimeOut(string, timeout) {
  setTimeout(() => {
    gameStatus.innerHTML = `<h4><strong>${string}</strong></h4>`;
  }, timeout);
}


startButton.addEventListener("click", flipWhenStart);
startButton.removeEventListener("click", startButton)
