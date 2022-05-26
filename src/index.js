const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const gameID = '7fH0aRqLSnGBHUySbZgR';
const requestURL = `${baseURL}${gameID}/scores/`;

const user = document.querySelector('[data-user]');
const score = document.querySelector('[data-score]');
const form = document.querySelector('[data-form]');
const inputs = document.querySelectorAll('input');
const confirmation = document.querySelector('[data-confirmation]');
const scoresList = document.querySelector('#leaderboard ul');

const createScore = async () => {
  await fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify({
      user: user.value,
      score: score.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      confirmation.innerText = json.result;
      confirmation.classList.add('active');
    });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (user.value && score.value) {
    createScore();
    user.value = '';
    score.value = '';
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    confirmation.innerText = '';
    confirmation.classList.remove('active');
  });
});

const getScoresList = async () => {
  await fetch(requestURL)
    .then((response) => response.json())
    .then((json) => {
      scoresList.innerHTML = `${json.result.sort((a, b) => b.score - a.score).map((score, index) => `<li class="score"><span>${index + 1}.</span>${score.user}: ${score.score}</li>`).join('')}`;
    });
};

getScoresList();

const refreshBtn = document.querySelector('#refresh-btn');
refreshBtn.addEventListener('click', () => {
  getScoresList();
});