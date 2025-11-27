let currentRsp = "paper";
let rspInterval = null;
let gameReady = false;
let coin = 10;
const rspImages = {
  scissors: "https://cdn-icons-png.flaticon.com/128/13480/13480938.png",
  rock: "https://cdn-icons-png.flaticon.com/128/3562/3562093.png",
  paper: "https://cdn-icons-png.flaticon.com/128/12355/12355903.png",
};
// ------- RSP 결과 처리 -------
const buttons = {
  scissors: document.querySelector("#btn-scissors"),
  rock: document.querySelector("#btn-rock"),
  paper: document.querySelector("#btn-paper"),
};

// 코인 넣기 → 이미지 무한 변경 시작
document.getElementById("insert-coin").addEventListener("click", () => {
  if (coin <= 0) {
    alert("코인이 부족합니다!");
    return;
  }
  if (gameReady) return;
  coin -= 1;
  document.getElementById("coin").innerHTML = `coin <br> ${coin}`;
  gameReady = true;
  
  alert("게임을 시작하세요! (가위/바위/보 선택)");

  // 1) 빠르게 가위→바위→보 순서로 돌아가기
  const order = ["scissors", "rock", "paper"];
  let idx = 0;

  cycleInterval = setInterval(() => {
    document.getElementById("centerImage").src = rspImages[order[idx]];
    // if(idx == 0) {
    //   document.getElementById("centerImage").style.transform = 'rotate(90deg)';
    // } else {
    //   document.getElementById("centerImage").style.transform = 'rotate(0deg)';
    // }
    idx = (idx + 1) % order.length;
  }, 200);  // 0.08초마다 교체 → 회전처럼 보임

  // 2) 1~2초 뒤 랜덤 결과 선택 후 멈추기 
  const duration = Math.random() * 1000 + 1000; // 1000~2000ms

  // setTimeout(() => {
  //   clearInterval(cycleInterval);
  // });
});

function getComputerChoice() {
  const arr = ["scissors", "rock", "paper"];
  return arr[Math.floor(Math.random() * 3)];
}


function judge(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "scissors" && computer === "paper") ||
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock")
  )
    return "win";
  return "lose";
}
  function startRouletteSlow(index, speed) {
    if (speed > 300) {
      stopRoulette(index);
      return;
    }

    spins.forEach(span => span.classList.remove("highlight"));
    spins[index].classList.add("highlight");

    index = (index + 1) % spins.length;

    setTimeout(() => startRouletteSlow(index, speed + 20), speed);
  }
  // ------- 최종 당첨 처리 -------
  function stopRoulette(finalIndex) {
    finalIndex = (finalIndex - 1 + spins.length) % spins.length;

    spins.forEach(span => span.classList.remove("highlight"));
    spins[finalIndex].classList.add("highlight");

    const value = parseInt(spins[finalIndex].querySelector("b").innerText);

    coin += value;
    updateCoin();

    alert(`🎉 당첨! ${value} 코인을 획득했습니다!`);
  }
Object.keys(buttons).forEach((key) => {
  buttons[key].addEventListener("click", () => {
    if (!gameReady) {
      alert("먼저 코인을 넣으세요!");
      return;
    }

    const comp = getComputerChoice();
    const result = judge(key, comp);

    if (result === "win") {
      // startRoulette();
    } else {
      alert("졌거나 비겼습니다! 다시 코인을 넣고 도전하세요.");
    }

    gameReady = false;
  });
});

//총 12칸
const coin_numbers = [4, 1, 2, 7, 4, 2, 20, 1, 2, 4, 7, 2];

const img = document.getElementById("player-rsp");



document.getElementById("btn-scissors").addEventListener("mouseenter", () => {
  img.src = rspImages.scissors;
  img.classList.add("show");
});
document.getElementById("btn-rock").addEventListener("mouseenter", () => {
  img.src = rspImages.rock;
  img.classList.add("show");
});
document.getElementById("btn-paper").addEventListener("mouseenter", () => {
  img.src = rspImages.paper;
  img.classList.add("show");
});

// 버튼에서 마우스가 나가면 이미지 사라짐
document.querySelectorAll(".select-button").forEach(btn => {
  btn.addEventListener("mouseleave", () => {
    img.classList.remove("show");
  });
});