let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const startButton = document.querySelector(".button");
const gameStatus = document.querySelector(".start-game");
const cards = document.querySelectorAll(".card");
const lives = document.querySelector(".hearts");
const matchedCard = document.getElementsByClassName("match");
const reStartGame = document.getElementById("restart-game");

const audio = {
  bgMusic: new Audio("audio/bgMusic.mp3"),
  flipCards: new Audio("audio/flipCard.mp3"),
  noMatch: new Audio("audio/noMatch.mp3"),
  match: new Audio("audio/match.mp3"),
  playerWin: new Audio("audio/playerWin.mp3"),
  gameOver: new Audio("audio/gameover.mp3"),
};

function flipWhenStart() {
  audio.bgMusic.play();

  cards.forEach((card) => card.classList.add("flip"));

  setTimeOut("You have 10 seconds to memorize the cards", 0);
  setTimeOut("Here you go!", 10000);

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("flip");
      card.addEventListener("click", flipCard)
    });
  }, 10000);

}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip", "match");
  audio.flipCards.play();

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
    audio.match.play();
    setTimeout(() => {
      disableCards();
    }, 500);

    return;
  }

  unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.style.visibility = "hidden";
  secondCard.style.visibility = "hidden";

  if (matchedCard.length == 20) {
    audio.bgMusic.pause();
    audio.playerWin.play();
    gameStatus.innerHTML =
      "<h4><strong>You win! Click Restart to play again.</strong></h4>";
    restartGame();
  }

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  audio.noMatch.play();
  audio.noMatch.volume = 0.5;
  
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
    audio.bgMusic.pause();
    audio.gameOver.play();
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
