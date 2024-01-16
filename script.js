let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameStarted = false;

const startButton = document.querySelector(".button")
const gameStatus = document.querySelector(".start-game");
const cards = document.querySelectorAll(".card");
const lives = document.querySelector(".hearts");


function flipWhenStart() {
  gameStarted = true
  cards.forEach((card) => card.classList.add("flip"));

  gameStatus.innerHTML =
    "<h4><strong>You have 15 seconds to memorize the cards.</strong></h4>";

  setTimeout(() => {
    gameStatus.innerHTML = "<h4><strong>Here you go!</strong></h4>";
    cards.forEach((card) => card.classList.remove("flip"));
  }, 1000); //change to 15secs

  if (gameStarted) {
    cards.forEach((card) => card.addEventListener("click", flipCard));
  };
  
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

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

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    gameStatus.innerHTML = "<h4><strong>Lost a life!</strong></h4>";

    loseALife(); 
    
    if(lives.hasChildNodes){
    setTimeout(() => {
      gameStatus.innerHTML = "<h4><strong>Proceed...</strong></h4>";
    }, 1500);} else {
        gameStatus.innerHTML = "<h4><strong>You lose</strong></h4>"
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


function disableStart() {
    startButton.removeEventListener("click", startButton)
 }


function loseALife() {
  let child = document.querySelector(".life");
  let lostLife = lives.removeChild(child);
}

startButton.addEventListener("click", flipWhenStart);
disableStart()
  
  
