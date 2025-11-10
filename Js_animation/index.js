const cards = document.querySelectorAll('.card');
const dropZone = document.getElementById('field');

let selected = null;
let offsetX = 0;
let offsetY = 0;
let originalX = 0;
let originalY = 0;
const board = document.querySelector('.board');

cards.forEach(card => {
  card.addEventListener('mousedown', e => {
    selected = card;

    const cardRect = card.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    offsetX = e.clientX - cardRect.left;
    offsetY = e.clientY - cardRect.top;

    originalX = parseInt(card.style.left);
    originalY = parseInt(card.style.top);
    card.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', e => {
  if (!selected) return;

  const boardRect = board.getBoundingClientRect();

  // 부모(board) 좌표 기준으로 보정
  const x = e.clientX - boardRect.left - offsetX;
  const y = e.clientY - boardRect.top - offsetY;

  selected.style.left = x + 'px';
  selected.style.top = y + 'px';

  // drop zone 감지 로직은 그대로
  const dzRect = dropZone.getBoundingClientRect();
  const cardRect = selected.getBoundingClientRect();
  const isOverlapping =
    cardRect.right > dzRect.left &&
    cardRect.left < dzRect.right &&
    cardRect.bottom > dzRect.top &&
    cardRect.top < dzRect.bottom;

  dropZone.classList.toggle('active', isOverlapping);
});


document.addEventListener('mouseup', () => {
  if (!selected) return;

  const boardRect = board.getBoundingClientRect();
  const dzRect = dropZone.getBoundingClientRect();
  const cardRect = selected.getBoundingClientRect();

  const isOverlapping =
    cardRect.right > dzRect.left &&
    cardRect.left < dzRect.right &&
    cardRect.bottom > dzRect.top &&
    cardRect.top < dzRect.bottom;

  if (isOverlapping) {
    // 부모(board) 기준 좌표로 변환
    const targetX = dzRect.left - boardRect.left + (dzRect.width / 2 - selected.offsetWidth / 2);
    const targetY = dzRect.top - boardRect.top + 20;

    selected.style.left = targetX + 'px';
    selected.style.top = targetY + 'px';
  } else {
    // 원래 자리로 복귀
    selected.style.left = originalX + 'px';
    selected.style.top = originalY + 'px';
  }

  dropZone.classList.remove('active');
  selected.style.zIndex = 1;
  selected = null;
});
