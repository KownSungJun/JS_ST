const images = document.getElementsByClassName('images')[0]
const btn = document.getElementsByClassName('stop')[0]

let pos = 0;
let speed = 1;
let running = true;
let rafId;

const imgHeight = 100;
const total = 5;
const resetPoint = imgHeight * total;

function step() {
    pos += speed;
    if(pos >= resetPoint) pos = 0;
    images.style.transform = `translateY(${-pos}px)`;
    rafId = requestAnimationFrame(step)
}
step()