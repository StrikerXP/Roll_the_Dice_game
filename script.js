'use strict';

// Element selection
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById(`current--0`);
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let totalScores, currentScore, activePlayer, isPlaying;

// Game initial conditions
const initGame = function() {
  diceElement.classList.add('hidden');
  totalScores = [0, 0];
  isPlaying = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  document.querySelector('.btn--roll').classList.remove('hidden');
  document.querySelector('.btn--hold').classList.remove('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  currentScore = 0;
  activePlayer = 0;
};

initGame();

const switchActivePlayer = function() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Animation of dice
async function timer(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleAlgorithm() {
  let array = [1, 2, 3, 4, 5, 6];
  let m = 6, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

async function changeDiceImage() {
  const numbers = shuffleAlgorithm();
  let i = 0;
  for (let number of numbers) {
    diceElement.src = `img/dice${number}.png`;
    let time = [280, 230, 200, 180, 160, 140];
    if (i < 5) {
      await timer(time[i]);
      i++;
    }
  }
  return numbers[5];  // resolve to the last number
}

// Buttons event listeners
btnRoll.addEventListener('click', async () => {
  if (isPlaying) {
    diceElement.classList.remove('hidden');
    let number = await changeDiceImage();
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function() {
  // Add curr score to total score
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];
    // If total score >= 50 then Win else Switch players
    if (totalScores[activePlayer] >= 50) {
      isPlaying = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.querySelector('.btn--roll').classList.add('hidden');
      document.querySelector('.btn--hold').classList.add('hidden');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);