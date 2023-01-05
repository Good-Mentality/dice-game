'use strict';

let turn = 0;
let unrealizedScore = 0;
let finalScore = [0, 0];
let winner = 0;

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const finalScore1 = document.querySelector('#score--0');
const finalScore2 = document.querySelector('#score--1');

diceImg.classList.add('hidden');
finalScore1.textContent = 0;
finalScore2.textContent = 0;

const switchTurn = function () {
  unrealizedScore = 0;
  document.querySelector('#current--' + turn).textContent = 0;
  document.querySelector('.player--' + turn).classList.remove('player--active');
  turn = turn === 0 ? 1 : 0;
  document.querySelector('.player--' + turn).classList.add('player--active');
};

const roll = function () {
  if (winner === 0) {
    const random = Math.trunc(Math.random() * 6) + 1;
    if (diceImg.classList.contains('hidden'))
      diceImg.classList.remove('hidden');
    diceImg.src = `dice-${random}.png`;
    if (random === 1) {
      switchTurn();
    } else {
      unrealizedScore += random;
      document.querySelector('#current--' + turn).textContent = unrealizedScore;
    }
  }
};

const hold = function () {
  if (winner === 0) {
    finalScore[turn] += unrealizedScore;

    document.querySelector('#score--' + turn).textContent = finalScore[turn];
    if (finalScore[turn] >= 100) {
      winner = turn + 1;
      document
        .querySelector('.player--' + turn)
        .classList.remove('player--active');
      document
        .querySelector('.player--' + turn)
        .classList.add('player--winner');
      diceImg.classList.add('hidden');
    } else {
      switchTurn();
    }
  }
};

const newGame = function () {
  finalScore = [0, 0];
  unrealizedScore = 0;
  document.querySelector('#current--' + turn).textContent = 0;
  finalScore1.textContent = 0;
  finalScore2.textContent = 0;
  if (!diceImg.classList.contains('hidden')) {
    diceImg.classList.add('hidden');
  }
  if (winner === 1) {
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--' + turn).classList.add('player--active');
    winner = 0;
  } else if (winner === 2) {
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    winner = 0;
    turn = 0;
  } else {
    if ((turn = 1)) {
      document.querySelector('.player--1').classList.remove('player--active');
      document.querySelector('.player--0').classList.add('player--active');
      turn = 0;
    }
  }
};

rollBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newBtn.addEventListener('click', newGame);
