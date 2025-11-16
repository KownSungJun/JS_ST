let p1Choice = null;
let p2Choice = null;

const slots = document.querySelectorAll(".slot");
const cards = document.querySelectorAll(".card");
const result = document.getElementById("result");

// 카드 드래그
cards.forEach(card => {
    card.addEventListener("dragstart", e => {
        e.dataTransfer.setData("type", card.dataset.type);
        e.dataTransfer.setData("emoji", card.textContent);
    });
});

// 슬롯 드래그 허용 + 드롭 처리
slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
        if (slot.childElementCount > 0) return;

        const type = e.dataTransfer.getData("type");
        const emoji = e.dataTransfer.getData("emoji");

        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.textContent = emoji;

        // 아래 플레이어 슬롯이면 뒤집기 유지
        if (slot.classList.contains("flip")) {
            newCard.classList.add("flip");
        }

        slot.appendChild(newCard);

        if (slot.id === "slot-p1") p1Choice = type;
        if (slot.id === "slot-p2") p2Choice = type;

        checkResult();
    });
});

// 승패 판단 로직
function checkResult() {
    if (!p1Choice || !p2Choice) return;

    const win = {
        "가위": "보",
        "바위": "가위",
        "보": "바위"
    };

    if (p1Choice === p2Choice) {
        result.textContent = "결과: 무승부!";
    } else if (win[p1Choice] === p2Choice) {
        result.textContent = "결과: 플레이어 1 승!";
    } else {
        result.textContent = "결과: 플레이어 2 승!";
    }
}

// 리셋
document.getElementById("resetBtn").addEventListener("click", () => {
    p1Choice = p2Choice = null;
    slots.forEach(s => s.innerHTML = "");
    result.textContent = "결과: -";
});
