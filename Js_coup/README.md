# Web Coup Game
# 브라우저 동작 원리
브라우저는 우리의 프론트 단 소스(html, css, js)를 실행시켜주고 view해준다

브라우저의 동작 원리는 매우 중요하다

```js
console.log(1+1) //1
setTimeout(() => {console.log(2+2)}, 1000) //2
console.log(3+3) //3
```

여기서 실행 순서가 1 > 3 > 2 순으로 실행된다

브라우저는 js를 실행해줄때 절차가 있다

코드에 Stack이라는 저장공간에 저장 되고, Heap에 변수가 저장된다

이때 Stack에 있는 코드는 한 줄씩 실행된다

그리고 setTimeout()이라는 따로 저장한다
Ajax 요청 코드, 이벤트 리스너, setTimeout 등 따로 대기 시키는 공간 Queue에 저장한다

Queue라는 저장 공간에 오래걸리는 코드를 두고 필요할 때 Stack에 둔다 이때! Stack이 비어있을 때만 Queue에 있는 코드를 올린다

![alt text](image.png)

js는 싱글 스레드 기반이 언어라 비동기적인 행동에 제약이 생긴다
이때 너무 어려운 연산(반복문 1000만번 10초 정도 걸림)을 하면 Stack에 연산이 종료될때 까지 이벤트를 실행할 수 없다

그래서 js를 할때 주의할 사항이다
1. Stack이 바쁘게 하지 마라
2. Queue도 바쁘게 하지 마라
# this
```js
let group = {
    title: "1모둠",
    students: ["보라", "효진", "지민"],

    title2 : this.title,
    title3() {
        console.log(group.title2)
    }
};
console.log(group.title2); //undefined
group.title3() //1모둠

```

# JS 함수 호이스팅(Hoisting)
JS에서 호이스팅(Hoisting)은 변수 선언과 함수 선언을 코드의 맨 위로 끌어올려지는 현상을 일컫는다. <br>
그래서 개발자가 어느 라인 위치에 코드를 선언해도, 실행 되기전에 코드가 최상단으로 끌어올려지고 실행되게 된다.

이러한 호이스팅이 발생하는 원인은 JS의 변수 생성(Instantiation)과 초기화(Intitalization)의 작업이 분리되어 진행되기 때문이다.

```js
console.log(a()) // 'a'
console.log(b()) // Uncaught TypeError: b is not a function
console.log(c()) // Uncaught TypeError: c is not a function

function a() {
    return 'a'
}

var b = function bb() {
    return 'bb'
}

var c = function() {
    return 'c'
}
```

위에 보이는 코드에서 `a()` 부터 실행 오류가 떠야 하지만 a는 출력된다 <br>
왜냐하면 호이스팅에 의해 실제 JS 컴파일은 이러한 방식으로 이루어 지기 때문이다.

```js
function a() {
    return 'a'
}

var b;
var c; //함수 선언은 위로 강제로 끌어져 올라온다.(호이스팅)

console.log(a()) // 'a'
console.log(b()) // Uncaught TypeError: b is not a function
console.log(c()) // Uncaught TypeError: c is not a function

var b = function bb() {
    return 'bb'
}

var c = function() {
    return 'c'
}
```

이와 같이 함수 선언과 변수 선언이 위로 호이스팅 되어서 정의가 되었기 때문에 a만 실행이 되었던 것이다. <br>
그런데 `b()`, `c()`는 아직 변수 b와 c 안에 넣어지지 않은 형태이기에, <br>
함수 선언문이 아니라서 b와 c는 그냥 변수로 취급 때문에 실행 오류가 뜨는 것이다.

## 함수의 호이스팅 방법
JS 함수를 정의하는 문법으로 함수 표현식과 함수 선언식이 있다.
```js
//함수 선언식
function add(x,y) {
    return x+y
}

//함수 표현식
const add = function(x,y) {
    return x+y;
}
```

둘은 결국 함수를 만드는데 기본적인 동일한 기능을 수행하지만, 함수 표현식은 함수를 변수에 할당함으로 유연성이 높다. <br>
그리고 <b>호이스팅이 강제적으로 되지 않아</b>개발자로 하여금 혼동을 주지 않게 된다

### 함수 표현식 권장 이유
함수 선언식의 사용 예제를 보자
```js
console.log(add(2,3))
function add(x,y) {
    return x+y;
}

console.log(add(3,4))
```

`add(2,3)`은 아직 `function add()` 함수가 정의되지 않았음에도 `add()` 함수 호출하는 것이 가능하다. 왜냐하면 코드 해석 단계에서 호이스팅이 일어나 `function add()`가 상단으로 올려졌기 때문이다

## Hoisting 주의할 점
- 코드의 가독성과 유지보수를 위해 Hoisting이 일어나지 않도록 한다.
- Hoisting을 제대로 모르더라도 함수와 변수를 가급적 상단부에서 선언하면, Hoisting으로 인한 스코프 꼬임 현상을 방지할 수 있다.
- let/const를 사용한다.

https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%8A%A4%EC%BD%94%ED%94%84-%ED%95%A8%EC%88%98-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85
https://inpa.tistory.com/entry/MarkDown-%F0%9F%93%9A-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EB%AC%B8%EB%B2%95-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC
https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-async-await
https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%F0%9F%92%AF-%EC%B4%9D-%EC%A0%95%EB%A6%AC
https://inpa.tistory.com/entry/%F0%9F%94%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84-%EA%B5%AC%EC%A1%B0-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC
https://inpa.tistory.com/entry/%F0%9F%8C%90-js-async
https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%9C%EB%B0%B1-%ED%95%A8%EC%88%98
https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B0%B0%EC%97%B4-%EA%B3%A0%EC%B0%A8%ED%95%A8%EC%88%98-%EC%B4%9D%EC%A0%95%EB%A6%AC-%F0%9F%92%AF-mapfilterfindreducesortsomeevery?category=889099

Anki 사용법 알아보기
# JS 비동기 처리 3가지 방식
JS는 싱글 스레드 프로그래밍 언어기 때문에 멀티 작업(Thread 작업)을 하기 위해선 비동기 처리 방식이 자주 쓰인다. 비동기 처리는 백그라운드로 동작되기 때문에 그 결과가 언제 반환될지 알 수 없어, 완료되면 결과를 받아 처리하기 위해 사용되는 대표적인 `콜백 함수(Callback)`와 이를 개선한 `프로미스 객체(Promise)`가 있다 

하지만 서비스 규모가 커질 수록 코드가 복잡해짐에 따라 코드를 중첩해서 사용하다 가독성이 떨어지고 유지보수가 어려워지는 상황이 발생하게 되는데, 이를 `Callback Hell`, `Promise Hell` 이라고 부른다.
```js
// Callback Hell
getData(function (x) {

})
```



# JS 배열 고차 함수(Higher-Order Function)
## 고차 함수
고차 함수란, 함수를 파라미터로 전달받거나 연산의 결과로 반환해주는 메서드를 일컫는다.
<br>
요즘 자주 거론되는 `함수형 프로그래밍`의 핵심이기도 하며, JS를 `함수형 프로그래밍`에 알맞는 언어로 만들어주는 특성이기도 하다

> <b>함수형 프로그래밍</b><br>
함수를 다른 함수의 파라미터로 넘길 수도 있고 반환(return)값으로 함수를 받을 수도 있는 프로그래밍 형태를 말한다.

이 파트에는 JS에서 광범위 하게 사용되는 배열의 고차함수를 총정리할 것이다. <br>
똑같이 배열을 순회한다는 점에서 이들은 모두 비슷하나 리턴하는 결과는 각각 다르니 이를 유심히 보며 익하기 바란다

## .forEach()
- for문을 대체하는 고차 함수
- 반복문을 추상화해 구현된 메서드이고 내부에서 주어진 배열을 순회하면서 연산 수행
```js
arr.forEach((item, index, thisArr) => {});
/*
    item : 배열 요소값
    index : 배열 인덱스
    thisArr : 참조된 배열

    return 값 : 없음
*/

//예시
const numberArr = [1,2,3,4,5];
let total = 0;

numberArr.forEach((item) => {
    total += item;
})

console.log(total)
```


## .map()
- `forEach` 같이 순회하면서, 콜백함수에서의 실행결과를 리턴한 값으로 이루어진 배열을 만들어 반환

> 콜백(Callback) 함수
매개변수로 함수 객체를 전달해 호출 함수 내에서 매개변수 함수를 실행하는 것
```js
function sayHello(name, callback) {
    const words = '안녕 내 이름은 '+name+'이야.';
    callback(words); //매개변수의 함수(콜백 함수) 실행
}

sayHello("성준", function printing(name) {
    console.log(name); //안녕 내 이름은 성준이야
})

```

> 콜백 함수 주의점
this를 사용한 콜백 함수

## Thread
## Event
### 이벤트 위임
그럼 JS는 멀티태스킹을 어떻게 함?

💡 이벤트 루프 + 콜백 + 프로미스를 이용한 비동기 처리

그래서 JS는 싱글 스레드지만 멀티스레드처럼 느껴짐.

setTimeout

fetch

이벤트

async/await

이런 비동기 작업들은 실제로 브라우저 엔진의 쓰레드에서 처리됨,
하지만 JS 엔진 자체는 단 하나의 스레드만 사용.

```js
  <script>
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const player3 = document.getElementById("player3");
    const player4 = document.getElementById("player4");
    const player5 = document.getElementById("player5");
    const player6 = document.getElementById("player6");
    const text_area = document.getElementById("game-text-area");
    const game_start_button = document.getElementById("game-start-button");
    const player_containers =
      document.getElementsByClassName("player-container");
    const deck = document.getElementById("deck");
    const player_select_box = document.getElementById("player-select-box");

    //0: not_ready 1: ready
    let players_ready = [0, 0, 0, 0, 0, 0];
    let player_count = 4;
    let current_turn = 1;
    let players_coin = [2, 2, 2, 2, 2, 2];
    // 메인 선택 UI

    //player 선택 메뉴 매핑
    //코인1개 받기 : 1
    //코인2개 받기 : 2
    //공작 능력 : 3
    //대사 능력 : 4
    //사령관 능력 : 5
    //암살자 능력 : 6
    //쿠 일으키기 : 7
    function renderMainSelect() {
      player_select_box.innerHTML = `
    <button data-btn="coin1">코인 1개 받기</button>
    <button data-btn="coin2">코인 2개 받기</button>
    <button data-btn="ability">캐릭터 능력 사용</button>
    <button data-btn="coup">쿠 일으키기</button>
  `;
    }

    // 능력 선택 UI
    function renderAbilitySelect() {
      player_select_box.innerHTML = `
    <button data-btn="duke"><img src="./src/images/공작.PNG"/>공작</button>
    <button data-btn="ambassador"><img src="./src/images/대사.PNG"/>대사</button>
    <button data-btn="assassin"><img src="./src/images/암살자.PNG"/>암살자</button>
    <button data-btn="captain"><img src="./src/images/사령관.PNG"/>사령관</button>
    <button data-btn="back">뒤로 가기</button>
  `;
    }
    game_start_button.addEventListener("click", () => {
      game();
      game_start_button.innerHTML = "";
      deck.innerHTML = "<img src='./src/images/back.PNG'/>";
      renderMainSelect();
    });

    // 📌 이벤트 위임: 부모 박스에 단 한 번만 이벤트 등록
    player_select_box.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName !== "BUTTON") return;

      const type = target.dataset.btn;

      if (type === "ability") {
        renderAbilitySelect();
      }

      if (type === "back") {
        renderMainSelect();
      }

      console.log("버튼 클릭:", type);
    });

    function waitForClick(element) {
      return new Promise((resolve) => {
        element.addEventListener("click", function handler() {
          element.removeEventListener("click", handler);
          resolve(); // 클릭되면 Promise 완료
        });
      });
    }

    //Game main 함수
    async function game() {
      text_area.innerHTML = `
    지금 부터 보드게임 coup을 시작하겠습니다! <br>
    플레이어 수 : ${player_count}명
  `;

      await new Promise((r) => setTimeout(r, 3000));

      // 🔁 턴이 계속 무한히 반복됨
      while (true) {
        text_area.innerHTML = `
      현재 플레이어 ${current_turn}턴 입니다. <br>
      옵션을 선택해주시기 바랍니다.
    `;

        // 플레이어가 선택할 때까지 기다림
        await waitForClick(player_select_box);

        text_area.innerHTML = `플레이어 ${current_turn} 선택 완료!`;

        // 1초 정도 지연 (안 해도 되지만 UX 좋음)
        await new Promise((r) => setTimeout(r, 1000));

        // 🔄 다음 플레이어로 이동
        current_turn++;

        // 🔁 마지막 플레이어까지 했으면 다시 1로
        if (current_turn > player_count) {
          current_turn = 1;
        }

        //플레이어가 1명이 되면 게임종료
        if (player_count == 1) {
          text_area.innerHTML = `
        지금 부터 보드게임 coup을 시작하겠습니다! <br>
        플레이어 수 : ${player_count}명`;
        }
      }
    }
  </script>



```