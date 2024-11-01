const cards = [
    { question: "한국의 독립 선언일은?", answer: "1919년 3월 1일" },
    { question: "임시정부가 수립된 도시는?", answer: "상하이" },
    { question: "독립운동가 이승만의 직위는?", answer: "대한민국 초대 대통령" },
    { question: "대한민국의 첫 번째 헌법은?", answer: "1948년 헌법" },
    { question: "한국 광복군은 어떤 나라와 전투를 했나요?", answer: "일본" },
    { question: "3.1 운동의 주요 목적은?", answer: "대한민국의 독립" },
    { question: "한국의 독립을 위해 어떤 전쟁이 일어났나요?", answer: "한국 전쟁" },
    { question: "한민족의 자주독립을 주장한 사상가는?", answer: "안중근" }
];

let cardValues = [];
cards.forEach(({ question, answer }) => {
    cardValues.push({ text: question, type: "question" });
    cardValues.push({ text: answer, type: "answer" });
});

let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById("gameBoard");
    shuffle(cardValues);
    cardValues.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.type = item.type;
        card.dataset.value = item.text;

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.innerText = item.text;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("flipped")) return;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = false;
    
    // 첫 번째 카드가 질문이고 두 번째 카드가 답인 경우
    if (firstCard.dataset.type === "question" && secondCard.dataset.type === "answer") {
        const matchingCard = cards.find(card => 
            card.question === firstCard.dataset.value && 
            card.answer === secondCard.dataset.value
        );
        isMatch = !!matchingCard;
    }
    // 첫 번째 카드가 답이고 두 번째 카드가 질문인 경우
    else if (firstCard.dataset.type === "answer" && secondCard.dataset.type === "question") {
        const matchingCard = cards.find(card => 
            card.answer === firstCard.dataset.value && 
            card.question === secondCard.dataset.value
        );
        isMatch = !!matchingCard;
    }

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedPairs++;
    
    if (matchedPairs === cards.length) {
        setTimeout(() => {
            alert("모든 질문과 답을 맞췄습니다!");
        }, 500);
    }
    
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.addEventListener("DOMContentLoaded", createBoard);