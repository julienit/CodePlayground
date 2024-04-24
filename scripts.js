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
  