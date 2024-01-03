const cards = document.querySelectorAll(".memory-card")
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add("flip")

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this;
    hasFlippedCard = false;

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
 }

 function unFlipCards() {
    setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
 }, 1500);
 }

cards.forEach(card => card.addEventListener("click", flipCard))