let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameStarted = false

const startGame = document.querySelector(".start-game")
const cards = document.querySelectorAll(".memory-card")
const lifeParent = document.getElementsByClassName("hearts")

function flipWhenStart() {
    cards.forEach(card => card.classList.add("flip"))
    
    startGame.innerHTML = "<h4><strong>You have 10 seconds to memorize the cards.</strong></h4>"

    setTimeout(() => {
        startGame.innerHTML = "<h4><strong>Here you go!</strong></h4>"
        cards.forEach(card => card.classList.remove("flip"))
    }, 10000);
}


function flipCard() {
    if (lockBoard) return
    if(this === firstCard) return

    this.classList.add("flip")

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        // console.log(this)
        return
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
    // loseALife();
}

 function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard)
   
    resetBoard();
 }


 function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    
    alert("Lost a life!")

    resetBoard()

 }, 1500);
 }

 function resetBoard() {
    hasFlippedCard = false
    lockBoard = false
    firstCard = null
    secondCard = null
 }

//  function loseALife() {
//     if(lifeParent.hasChildNodes()) {
//         lifeParent.removeChild(lifeParent.children[0])
//     }
//  }

 (function shuffle() {
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random()*24);
        card.style.order = randomNumber;
    })
 })()

 function disableStart() {
    startGame.removeEventListener("click", disableStart)
 }


startGame.addEventListener("click", function() {
    startGame.innerHTML = "<h4><strong>Game started!</strong></h4>";
    gameStarted = true
    flipWhenStart();
if(gameStarted) {
    cards.forEach(card => card.addEventListener("click", flipCard))
    }
})
 
