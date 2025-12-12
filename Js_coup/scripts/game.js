//게임 메인 로직 (async/await 기반)
import { State } from "./state.js";
import { Render } from "./render.js";
import { UI } from "./ui.js";
import { waitForClick, delay } from "./utils.js";

export const Game = {
  async start() {
    Render.text(`
      지금부터 보드게임 Coup을 시작합니다! <br>
      플레이어 수 : ${State.playerCount}명
    `);

    Render.mainSelect();
    UI.startBtn.innerHTML = "";
    UI.deck.innerHTML = "<img src='./src/images/back.PNG' />";

    await delay(3000);

    // 메인 턴 루프
    while (true) {
      Render.text(`
        현재 플레이어 ${State.currentTurn}의 턴입니다. <br>
        옵션을 선택해주세요.
      `);

      // 선택 기다림
      const choice = await waitForClick(UI.selectBox);
      console.log("플레이어 선택:", choice);

      Render.text(`플레이어 ${State.currentTurn} 선택 완료!`);
      await delay(1000);

      // 다음 턴
      State.currentTurn++;
      if (State.currentTurn > State.playerCount) {
        State.currentTurn = 1;
      }

      // 게임 종료 조건
      if (State.playerCount === 1) {
        Render.text(`게임 종료!`);
        break;
      }
    }
  },
};
