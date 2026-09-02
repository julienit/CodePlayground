const keyboardButtons =
    document.querySelectorAll(".keyboard button");
const wordList = [
    {
        word: "HTML",
        hint: "The language used to structure a webpage"
    },
    {
        word: "CSS",
        hint: "The language used to style a webpage"
    },
    {
        word: "PYTHON",
        hint: "A popular programming language"
    },
    {
        word: "JAVASCRIPT",
        hint: "A programming language used to make webpages interactive"
    },
    {
        word: "CODING",
        hint: "Writing instructions for a computer"
    },
    {
        word: "FUNCTION",
        hint: "A reusable block of code"
    }
];

let selectedWord;
let correctLetters = [];
let wrongLetters = [];
let guessesLeft = 6;


// Start Game
function startGame() {

    const randomWord =
        wordList[Math.floor(Math.random() * wordList.length)];

    selectedWord = randomWord.word.toUpperCase();

    correctLetters = [];
    wrongLetters = [];
    guessesLeft = 6;

    keyboardButtons.forEach(button => {
        button.disabled = false;
    });

    updateGame();
}


// Update Game
function updateGame() {

    const wordContainer = document.querySelector(".word");

    wordContainer.innerHTML = "";

    for (let letter of selectedWord) {

        const letterSpan = document.createElement("span");

        if (correctLetters.includes(letter)) {
            letterSpan.textContent = letter;
        }

        wordContainer.appendChild(letterSpan);
    }

    const currentWord = wordList.find(
        item => item.word === selectedWord
    );

    document.querySelector(".hint span").textContent =
        currentWord.hint;

    document.querySelector(".guesses-left span").textContent =
        guessesLeft;

    document.querySelector(".wrong-letter span").textContent =
        wrongLetters.length > 0
            ? wrongLetters.join(", ")
            : "None";

    updateHangman();
}


// Check Win
function checkWin() {

    const wordGuessed = selectedWord
        .split("")
        .every(letter =>
            correctLetters.includes(letter)
        );

    if (wordGuessed) {

        setTimeout(() => {
            alert("🎉 You cracked the code!");
            startGame();
        }, 100);
    }
}


// Check Loss
function checkLoss() {

    if (guessesLeft <= 0) {

        setTimeout(() => {
            alert(`Game Over! The word was ${selectedWord}.`);
            startGame();
        }, 100);
    }
}


// Guess Letter
function guessLetter(letter, button) {

    letter = letter.toUpperCase();

    if (
        correctLetters.includes(letter) ||
        wrongLetters.includes(letter)
    ) {
        return;
    }

    button.disabled = true;

    if (selectedWord.includes(letter)) {

        correctLetters.push(letter);

    } else {

        wrongLetters.push(letter);
        guessesLeft--;

    }

    updateGame();

    checkWin();
    checkLoss();
}

keyboardButtons.forEach(button => {

    button.addEventListener("click", () => {

        guessLetter(
            button.textContent,
            button
        );

    });

});


// Play Again
document
    .querySelector(".play-again")
    .addEventListener("click", () => {

        startGame();

    });


// Hangman Drawing
function updateHangman() {

    const bodyParts = [
        document.querySelector(".head"),
        document.querySelector(".body"),
        document.querySelector(".left-arm"),
        document.querySelector(".right-arm"),
        document.querySelector(".left-leg"),
        document.querySelector(".right-leg")
    ];

    const mistakes = 6 - guessesLeft;

    bodyParts.forEach((part, index) => {

        if (index < mistakes) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }

    });
}


// Start the Game
startGame();
