const jumpscareRui = document.querySelectorAll(".rui-container");
const rui = document.querySelectorAll(".rui");
const scoreBoard = document.querySelector(".papan-skor");
const koplo = document.querySelector("#tarik-sist");

let selesai = true;
let skor = 0;

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

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ruiPop() {
  const tRandom = randomTanah(jumpscareRui);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add("muncul");

  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!selesai) {
      ruiPop();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  koplo.play();
  alert("Bunuh semua Oni yang muncul dari asap biru");
  scoreBoard.textContent = `Skor anda ${skor}`;
  ruiPop();
  setTimeout(() => {
    selesai = true;
    alert(`Skor anda ${skor}`);
  }, 10000);
}

function pukul() {
  skor++;
  this.parentNode.classList.remove("muncul");
  // scoreBoard.textContent = skor;
  scoreBoard.textContent = `Skor anda ${skor}`;
}

rui.forEach((t) => {
  t.addEventListener("click", pukul);
});
