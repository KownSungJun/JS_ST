const dice = document.getElementById('dice');
const result = document.getElementById('result');
const rollBtn = document.getElementById('rollBtn');

rollBtn.addEventListener('click', () => {
  const xRotation = 720 + Math.floor(Math.random() * 360);
  const yRotation = 720 + Math.floor(Math.random() * 360);

  dice.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

  const diceResult = Math.floor(Math.random() * 6) + 1;

  result.textContent = '굴리는 중...';
  rollBtn.disabled = true;

  setTimeout(() => {
    result.textContent = `결과: 🎲 ${diceResult}`;
    rollBtn.disabled = false;
  }, 1000);
});
