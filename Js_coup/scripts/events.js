//이벤트 등록 관리 + 게임 시작 연결
import { UI } from "./ui.js";
import { Render } from "./render.js";
import { Game } from "./game.js";

export const Events = {
  init() {
    // 게임 시작
    UI.startBtn.addEventListener("click", () => {
      Game.start();
    });

    // UI 선택 버튼 이벤트 위임
    UI.selectBox.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;

      const type = e.target.dataset.btn;

      if (type === "ability") Render.abilitySelect();
      else if (type === "back") Render.mainSelect();

      console.log("버튼 클릭:", type);
    });
  },
};
