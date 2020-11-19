const jumpscareRui = document.querySelectorAll(".rui-container");
const rui = document.querySelectorAll(".rui");
const scoreBoard = document.querySelector(".papan-skor");
const koplo = document.querySelector("#tarik-sist");

let finish = true;
let score = 0;
let gameCount = 0;
let scoreboardArray = [];

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
    finish = true;
    gameCount++;
    scoreboardArray.push({ gameCount, score });
    alert(`Your score ${score}`);
    console.log(scoreboardArray);
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
