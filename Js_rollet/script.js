const images = document.getElementsByClassName('images')[0]
const btn = document.getElementsByClassName('stop')[0]
let stopIndex = 0;
//배열에 이런식으로 넣을 수 있음
const reels = [
  document.querySelector("#slot1 .images"),
  document.querySelector("#slot2 .images"),
  document.querySelector("#slot3 .images"),
  document.querySelector("#slot4 .images"),
  document.querySelector("#slot5 .images"),
  
];


let pos = 0;
let speed = 1;
let running = true;
let rafId;
let coin = 0;
//변수에 따로 안넣고 바로 이벤트 추가 가능
document.getElementById('play').addEventListener('click', () => {
    stopIndex = 0;
    reels.forEach((reel) => {
        reel.style.animationPlayState = "running"
    })
})

document.getElementById("stop").addEventListener("click", () => {
  if (stopIndex >= 5) return;

  // 현재 순서 슬롯 멈춤
  reels[stopIndex].style.animationPlayState = "paused";

  stopIndex++;

  // 3개 다 멈추면 결과 확인
  if (stopIndex === 5) {
    checkResult();
  }
});
const imgHeight = 100;
const total = 5;
const resetPoint = imgHeight * total;

function step() {
    pos += speed;
    if(pos >= resetPoint) pos = 0;
    images.style.transform = `translateY(${-pos}px)`;
    rafId = requestAnimationFrame(step)
}


step()