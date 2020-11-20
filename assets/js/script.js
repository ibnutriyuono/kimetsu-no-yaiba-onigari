const jumpscareRui = document.querySelectorAll(".rui-container");
const rui = document.querySelectorAll(".rui");
const scoreBoard = document.querySelector(".papan-skor");
const koplo = document.querySelector("#tarik-sist");
const highScoreButton = document.getElementById("highscore-button");
const highScores = document.querySelector(".scoreboard-local-storage");
const highscoresToggle = document.querySelector(".close-highscores");

let finish = true;
let score = 0;
let gameCount = 0;
let scoreboardArray = [];

highScoreButton.addEventListener("click", () => {
  highScores.classList.toggle("muncul");
  for (let i = 0; i < scoreboardArray.length; i++) {
    let elementP = document.createElement("p");
    let scoreVal = document.createTextNode(scoreboardArray[i].score);
    let gameCountVal = document.createTextNode(scoreboardArray[i].gameCount);
    elementP.appendChild(gameCountVal);
    elementP.appendChild(scoreVal);
    highScores.appendChild(elementP);
  }
});

highscoresToggle.addEventListener("click", () => {
  highScores.classList.toggle("muncul");
});

function randomTanah(jumpscareRui) {
  let spotKiri;
  const t = Math.floor(Math.random() * jumpscareRui.length);
  const indeksRandom = jumpscareRui[t];
  if (indeksRandom == spotKiri) {
    randomTanah(jumpscareRui);
  }
  spotKiri = indeksRandom;
  return indeksRandom;
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ruiPop() {
  const tRandom = randomTanah(jumpscareRui);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add("muncul");

  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!finish) {
      ruiPop();
    }
  }, wRandom);
}

function mulai() {
  finish = false;
  score = 0;
  koplo.play();
  alert(
    "Destroy all evil demons that appear from the blue smoke within 10 seconds"
  );
  scoreBoard.textContent = `Your score ${score}`;
  ruiPop();
  setTimeout(() => {
    gameCount++;
    finish = true;
    alert(`Your score ${score}`);
    tambahScore(gameCount, score);
  }, 10000);
}

function pukul() {
  score++;
  this.parentNode.classList.remove("muncul");
  scoreBoard.textContent = `Your score ${score}`;
}

rui.forEach((t) => {
  t.addEventListener("click", pukul);
});

function tambahScore(gameCount, score) {
  scoreboardArray.push({ gameCount, score });
}
