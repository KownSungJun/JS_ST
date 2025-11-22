const images = document.getElementsByClassName('images')[0]
const btn = document.getElementsByClassName('stop')[0]
const coin_area = document.getElementById('coin-area')

let stopIndex = 0;
//배열에 이런식으로 넣을 수 있음
const reels = [
  document.querySelector("#slot1 .images"),
  document.querySelector("#slot2 .images"),
  document.querySelector("#slot3 .images"),
  document.querySelector("#slot4 .images"),
  document.querySelector("#slot5 .images"),
];
//이미지 매핑
/**
 * 이미지 슬롯 a,b,c,d,e(5칸) reels[0~4]
 * 개구리 이미지 0
 * 병아리 이미지 1
 * 해파리 이미지 2
 * 코인 이미지 3
 * 7 이미지 4
 */

let pos = 0;
let speed = 1;
let running = false;
let rafId;
let coin=10;
const imgHeight = 100;
const totalImgs = 5;
let result_list = [];
//stop할 때 랜덤으로 이미지 타겟 지정
function getRandomTarget(count) {
  const result = Math.floor(Math.random() * totalImgs);
  result_list[count] = result;
  return result;
}


// function slowStop(reel, targetIndex, callback) {
//   reel.style.animation = "none"
//   reel.style.animationPlayState = "paused";
//   let current = getTranslateY(reel);
//   let targetY = -(targetIndex * imgHeight);

//   targetY -= imgHeight * totalImgs * 3;

//   let speed = 25;
//   let friction = 0.95;

//   function animate() {
//     speed *= friction;

//     current -= speed;

//     if (current <= targetY) {
//       reel.style.transform = `translateY(${targetY}px)`;
//       callback();
//       return;
//     }

//     reel.style.transform = `translateY(${current}px)`;
//     requestAnimationFrame(animate);
//   }
//   requestAnimationFrame(animate);
// }

// function getTranslateY(element) {
//   const matrix = window.getComputedStyle(element).transform;

//   if (matrix === "none") return 0;
//   //정규식으로 괄호 안에 있는 숫자 목록만 추출
//   const values = matrix.match(/matrix.*\((.+\))/)[1].split(", ");
//   return parseFloat(values[5])
// }


coin_area.innerHTML = `coin <br> ${coin}`
//변수에 따로 안넣고 바로 이벤트 추가 가능
document.getElementById('play').addEventListener('click', () => {
    running = true;
    if(coin == 0) {
      alert("코인을 모두 소진하였습니다! \nGame Over!");
      running = false;
      return;
    }
    coin--;
    coin_area.innerText = `coin = ${coin}`
    stopIndex = 0;
    //모든 칸 다시 에니메이션 동작
    reels.forEach((reel) => {
        reel.style.animation = "spin 0.2s linear infinite"
        reel.style.animationPlayState = "running";
    })
})

function checkResult() {
  console.log('!!')
  let seven_count = 0;
  let same_image_count = 0;
  let pair_count = 0;
  console.log(result_list)
  for(let i=0;i<result_list.length;i++) {
    
    if(result_list[i] == 4) {
      seven_count++;
    }
  }
  switch(seven_count) {
    case 2:
      alert('7 페어 coin +1');
      coin+=1;
      break;
    case 3:
      alert('7 트리플 coin +3');
      coin+=3;
      break;
    case 4:
      alert('7 쿼드라 coin +10');
      coin+=10;
      break;
    case 5:
      alert('7 펜타 coin +777');
      coin+=777;
      break;
  }

}

document.getElementById("stop").addEventListener("click", () => {
  if (!running) return;
  if (stopIndex >= reels.length) return;

  const reel = reels[stopIndex];

  // 애니메이션 즉시 중지
  console.log("이미지 중단")
  reel.style.animation = "none";
  reel.style.animationPlayState = "paused";
  // 랜덤 이미지 인덱스
  const target = getRandomTarget(stopIndex);

  // 이미지 위치 즉시 설정
  const targetY = -(target * imgHeight);
  reel.style.transform = `translateY(${targetY}px)`;

  stopIndex++;
  //마지막에 룰렛이 다 안멈췄는데도 checkResult alert가 실행되는 버그 있음
  if (stopIndex === reels.length) {
    running = false;
    checkResult(stopIndex);
  }
});



// const imgHeight = 100;
// const total = 5;
// const resetPoint = imgHeight * total;

// function step() {
//     pos += speed;
//     if(pos >= resetPoint) pos = 0;
//     images.style.transform = `translateY(${-pos}px)`;
//     rafId = requestAnimationFrame(step)
// }


// step()