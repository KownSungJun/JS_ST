
let currentRsp = "paper";
let rspInterval = null;
let isSpinning = true;
let coin = 10;
// images.rock.src = "https://cdn-icons-png.flaticon.com/128/12355/12355903.png";
// images.scissors.src = "https://cdn-icons-png.flaticon.com/128/9534/9534501.png";
// images.paper.src = "https://cdn-icons-png.flaticon.com/128/3562/3562093.png";
// 중앙 이미지 그리기
function drawCenterImage(imgKey) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = images[imgKey];
    ctx.drawImage(img, centerX - 50, centerY - 50, 100, 100);
}
// 무한 루프 이미지 변경
function spinImages() {
    const keys = ["rock", "scissors", "paper"];

    currentIndex = (currentIndex + 1) % keys.length;

    drawCenterImage(keys[currentIndex]);

    if (isSpinning) {
        animationFrame = requestAnimationFrame(spinImages);
    }
}
// 코인 넣기 → 이미지 무한 변경 시작
document.getElementById("insert-coin").addEventListener("click", () => {
    if (isSpinning) return;
    coin-=1;
    document.getElementById('coin').innerHTML = coin
    isSpinning = true;
    spinImages();
});

//총 12칸
const coin_numbers = [
    4,1,2,7,4,2,20,1,2,4,7,2
]

//센터 좌표
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = 200;
// const colors = ["#177c41", "#d6c4bfff"]
// c.fillRect(100,100,100,100)
// console.log(canvas)
// centerImage.onload = () => {
//     draw();
// }

// function draw() {
//     ctx.clearRect(0,0,canvas.width, canvas.height);
    
//     drawRoulette();
//     drawCenterImage();

// }

// ----------------------------------------------
// 룰렛 그리기 함수
// ----------------------------------------------
function drawRoulette() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < coin_numbers.length; i++) {
    const angle = (Math.PI * 2 / coin_numbers.length) * i; // 각 칸의 각도

    // 칸 위치 계산
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    // 현재 빛나는 칸이면 색상 강조
    ctx.fillStyle = i === currentLightIndex ? "yellow" : "white";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // 칸 번호
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(i + 1, x - 5, y + 5);
  }

  // 중앙 이미지 그리기
  const img = images[currentRsp];
  ctx.drawImage(img, cx - 40, cy - 40, 80, 80);
}
// ----------------------------------------------
// 룰렛 계속 회전 애니메이션
// ----------------------------------------------
let currentLightIndex = 0;
setInterval(() => {
  currentLightIndex = (currentLightIndex + 1) % coin_numbers.length;
  drawRoulette();
}, 100);
// ----------------------------------------------
// 코인 넣기 → 중앙 이미지 무한 변경
// ----------------------------------------------
document.getElementById("insert-coin").addEventListener("click", () => {
  if (rspInterval) clearInterval(rspInterval);

  const keys = ["rock", "paper", "scissors"];

  rspInterval = setInterval(() => {
    currentRsp = keys[Math.floor(Math.random() * keys.length)];
    drawRoulette();
  }, 150);
});

// ----------------------------------------------
// 가위바위보 버튼 클릭 시 결과 판단
// ----------------------------------------------
function judge(player, ai) {
  if (player === ai) return "비겼습니다!";
  if (
    (player === "rock" && ai === "scissors") ||
    (player === "paper" && ai === "rock") ||
    (player === "scissors" && ai === "paper")
  ) {
    return "승리!";
  }
  return "패배!";
}
function stopAndCheck(playerChoice) {
  if (rspInterval) clearInterval(rspInterval);

  const result = judge(playerChoice, currentRsp);
  // alert(`플레이어: ${playerChoice}\n컴퓨터: ${currentRsp}\n결과: ${result}`);
  if(result === "비겼습니다!") {
    document.getElementById('draw').style.backgroundColor = "#2ecc71";
  } else if(result === "승리!") {
    document.getElementById('win').style.backgroundColor = "#ccc92eff";
  } else {
    document.getElementById('lose').style.backgroundColor = "#cc2e2eff";
  }
}

document.getElementById("btn-rock").onclick = () => stopAndCheck("rock");
document.getElementById("btn-paper").onclick = () => stopAndCheck("paper");
document.getElementById("btn-scissors").onclick = () => stopAndCheck("scissors");


