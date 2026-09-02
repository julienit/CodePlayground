  let flippedCards = [];
  let moves = 0;
  let timerInterval;
  let seconds = 0;
  const timerDisplay = document.getElementById('timer');
  const scoreDisplay = document.getElementById('score');
  const startGameButton = document.getElementById('start-game');
  const incorrectsound = document.getElementById('incorrectsound');
  const matchSound = document.getElementById('matchSound');


  document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('flip');
      flippedCards.push(card);
      moves++;
      
      if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        
        if (!isMatch) {
          setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            incorrectsound.play();
          }, 1000);
        } else {
            matchSound.play();
          }
        flippedCards = [];
      }
      
      updateScore();
    });
  });

  (function shuffle() {
    document.querySelectorAll('.memory-card').forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  function updateScore() {
    scoreDisplay.textContent = `Moves: ${moves}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      timerDisplay.textContent = `Time: ${seconds}s`;
    }, 1000);
  }

  startGameButton.addEventListener('click', () => {
    moves = 0;
    updateScore();
    startTimer();
  });

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


// Select a random word
function startGame() {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    selectedWord = randomWord.word.toUpperCase();

    correctLetters = [];
    wrongLetters = [];
    guessesLeft = 6;

    updateGame();
}


// Display the word
function updateGame() {

    const wordContainer = document.querySelector(".word");

    wordContainer.innerHTML = "";

    for (let letter of selectedWord) {

        const letterSpan = document.createElement("span");

        if (correctLetters.includes(letter)) {
            letterSpan.textContent = letter;
        } else {
            letterSpan.textContent = "";
        }

        wordContainer.appendChild(letterSpan);
    }


    // Update hint
    document.querySelector(".hint span").textContent =
        wordList.find(item => item.word === selectedWord).hint;


    // Update guesses
    document.querySelector(".guesses-left span").textContent =
        guessesLeft;


    // Update wrong letters
    document.querySelector(".wrong-letter span").textContent =
        wrongLetters.length > 0
            ? wrongLetters.join(", ")
            : "None";


    updateHangman();
}


// Check whether the player won
function checkWin() {

    const wordGuessed = selectedWord
        .split("")
        .every(letter => correctLetters.includes(letter));

    if (wordGuessed) {

        setTimeout(() => {
            alert("🎉 You cracked the code!");

            startGame();
        }, 100);

        return true;
    }

    return false;
}


// Check whether the player lost
function checkLoss() {

    if (guessesLeft <= 0) {

        setTimeout(() => {

            alert(`Game Over! The word was ${selectedWord}.`);

            startGame();

        }, 100);

        return true;
    }

    return false;
}


// Handle a letter guess
function guessLetter(letter, button) {

    letter = letter.toUpperCase();

    // Don't allow a letter to be clicked twice
    if (
        correctLetters.includes(letter) ||
        wrongLetters.includes(letter)
    ) {
        return;
    }


    if (selectedWord.includes(letter)) {

        correctLetters.push(letter);

        button.disabled = true;

    } else {

        wrongLetters.push(letter);

        guessesLeft--;

        button.disabled = true;
    }


    updateGame();

    checkWin();
    checkLoss();
}


// Create keyboard functionality
const keyboardButtons =
    document.querySelectorAll(".keyboard button");

keyboardButtons.forEach(button => {

    button.addEventListener("click", () => {

        guessLetter(button.textContent, button);

    });

});


// Play Again button
document
    .querySelector(".play-again")
    .addEventListener("click", () => {

        keyboardButtons.forEach(button => {
            button.disabled = false;
        });

        startGame();

    });


// Update the Hangman drawing
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


// Start the game
startGame();

// Start the game
startGame();
