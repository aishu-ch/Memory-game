let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameStarted = false;

const gameStatus = document.querySelector(".start-game");
const cards = document.querySelectorAll(".card");
// console.log(cards)
const lives = document.querySelector(".hearts");
// console.log(lives.childNodes)

function flipWhenStart() {
  //working
  cards.forEach((card) => card.classList.add("flip"));

  gameStatus.innerHTML =
    "<h4><strong>You have 15 seconds to memorize the cards.</strong></h4>";

  setTimeout(() => {
    gameStatus.innerHTML = "<h4><strong>Here you go!</strong></h4>";
    cards.forEach((card) => card.classList.remove("flip"));
  }, 1000); //change to 15secs
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    // console.log(this)
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

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    gameStatus.innerHTML = "<h4><strong>Lost a life!</strong></h4>";

    if (lives.hasChildNodes) {
      loseALife();
    } else {
      gameStatus.innerHTML = "<h4><strong>You Lose!</strong></h4>";
    }

    setTimeout(() => {
      gameStatus.innerHTML = "<h4><strong>Proceed...</strong></h4>";
    }, 1500);

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
    let randomNumber = Math.floor(Math.random() * 24);
    card.style.order = randomNumber;
  });
})();

function loseALife() {
  let child = document.querySelector(".life");
  // console.log(child)
  let lostLife = lives.removeChild(child);
  // console.log(lostLife)
}

gameStatus.addEventListener("click", function () {
  gameStarted = true;
  flipWhenStart();
  if (gameStarted) {
    cards.forEach((card) => card.addEventListener("click", flipCard));
  }
});
