let currentRsp = "paper";
let rspInterval = null;
let gameReady = false;
let coin = 10;
//rsp 이미지
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
  document.getElementById("win").style.backgroundColor = "#947a12"
  document.getElementById("draw").style.backgroundColor = "rgb(37, 115, 117)"
  document.getElementById("lose").style.backgroundColor = "#993227"
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
    idx = (idx + 1) % order.length;
  }, 200);  // 0.08초마다 교체 → 회전처럼 보임

});

function getComputerChoice() {
  const arr = ["scissors", "rock", "paper"];
  return arr[Math.floor(Math.random() * 3)];
}

function getRulletChoice() {
  const coin_numbers = [4, 1, 2, 7, 4, 2, 20, 1, 2, 4, 7, 2];
  const weightMap = {
    1: 50,
    2: 30,
    4: 15,
    7: 4,
    20: 1,
  }
  
  const weightedList = []

  coin_numbers.forEach(value => {
    for(let i=0;i<weightMap[value];i++) {
      weightedList.push(value)
    }
  })
  const randomIndex = Math.floor(Math.random() * weightedList.length);
  return weightedList[randomIndex];
}
function judge(player, computer) {
  document.getElementById("centerImage").src = rspImages[player];
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
    // finalIndex = (finalIndex - 1 + spins.length) % spins.length;

    // spins.forEach(span => span.classList.remove("highlight"));
    // spins[finalIndex].classList.add("highlight");

    //const value = parseInt(spins[finalIndex].querySelector("b").innerText);

    coin += finalIndex;
    document.getElementById("coin").innerHTML = `coin <br> ${coin}`;

    alert(`🎉 당첨! ${finalIndex} 코인을 획득했습니다!`);
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
      alert("이겼습니다! 룰렛이 돌아갑니다!");
      document.getElementById("win").style.backgroundColor = "#e5ff00ff"
      stopRoulette(getRulletChoice())

    } else if(result === "draw"){
      alert("비겼습니다! 다시 코인을 넣고 도전하세요.");
      document.getElementById("draw").style.backgroundColor = "#00ff88ff"
    } else {
      alert("졌습니다! 다시 코인을 넣어 도전하세요.");
      document.getElementById("lose").style.backgroundColor = "#ff0000ff"
    }
    
    gameReady = false;
  });
});



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