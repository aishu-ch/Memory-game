const cards = document.querySelectorAll(".memory-card")
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return
    if(this === firstCard) return

    this.classList.add("flip")

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
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
    
    resetBoard()

 }, 1500);
 }

 function resetBoard() {
    hasFlippedCard = false
    lockBoard = false
    firstCard = null
    secondCard = null
 }

 (function shuffle() {
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random()*24);
        card.style.order = randomNumber;
    })
 })()

 

cards.forEach(card => card.addEventListener("click", flipCard))