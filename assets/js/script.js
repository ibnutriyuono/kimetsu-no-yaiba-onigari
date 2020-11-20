const jumpscareRui = document.querySelectorAll(".rui-container");
const rui = document.querySelectorAll(".rui");
const scoreBoard = document.querySelector(".papan-skor");
const koplo = document.querySelector("#tarik-sist");
const highScoreButton = document.getElementById("highscore-button");
const highScores = document.querySelector(".scoreboard-local-storage");
const highscoresToggle = document.querySelector(".close-highscores");

let finish = true;
let score = 0;
let scoreboardArray = [];
let gameCount = 0;

let scoresFromLocal = localStorage.getItem("highestscore");
let gameCountFromLocal = localStorage.getItem("gameCount");
if (!gameCountFromLocal) {
  localStorage.setItem("gameCount", 0);
} else {
  gameCount = gameCountFromLocal;
}
highScoreButton.addEventListener("click", () => {
  highScores.classList.toggle("muncul");
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
  // koplo.play();
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
  scoreboardArray.sort((a, b) => {
    return b.score - a.score;
  });
  console.log(scoreboardArray[0]);
  localStorage.setItem("highestscore", scoreboardArray[0].score);
  localStorage.setItem("gameCount", scoreboardArray[0].gameCount);
}

let elementP = document.createElement("p");
let gameCountVal = document.createTextNode(`Round : ${gameCountFromLocal}`);
let scoreVal = document.createTextNode(` Score : ${scoresFromLocal}`);
elementP.appendChild(gameCountVal);
elementP.appendChild(scoreVal);
highScores.appendChild(elementP);
