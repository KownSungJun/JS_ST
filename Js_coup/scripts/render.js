//UI 업데이트(HTML 변경 전담)
export const Render = {
  mainSelect() {
    const box = document.getElementById("player-select-box");
    box.innerHTML = `
      <button data-btn="coin1">코인 1개 받기</button>
      <button data-btn="coin2">코인 2개 받기</button>
      <button data-btn="ability">캐릭터 능력 사용</button>
      <button data-btn="coup">쿠 일으키기</button>
    `;
  },

  abilitySelect() {
    const box = document.getElementById("player-select-box");
    box.innerHTML = `
      <button data-btn="duke"><img src="./src/images/공작.PNG" /> 공작</button>
      <button data-btn="ambassador"><img src="./src/images/대사.PNG" /> 대사</button>
      <button data-btn="assassin"><img src="./src/images/암살자.PNG" /> 암살자</button>
      <button data-btn="captain"><img src="./src/images/사령관.PNG" /> 사령관</button>
      <button data-btn="back">뒤로 가기</button>
    `;
  },

  text(msg) {
    const textArea = document.getElementById("game-text-area");
    textArea.innerHTML = msg;
  },
};
