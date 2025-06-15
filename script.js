const text = document.getElementById('text');
const speedControl = document.getElementById('speed-control');
const toggleButton = document.getElementById('toggle');

let speed = parseFloat(speedControl.value);
let scrolling = false;
let animationFrame;

function scrollText() {
  const currentTop = parseFloat(getComputedStyle(text).top);
  text.style.top = (currentTop - speed) + 'px';

  if ((text.getBoundingClientRect().bottom) < 0) {
    stopScrolling();
  } else {
    animationFrame = requestAnimationFrame(scrollText);
  }
}

function startScrolling() {
  scrolling = true;
  toggleButton.textContent = 'Pause';
  animationFrame = requestAnimationFrame(scrollText);
}

function stopScrolling() {
  scrolling = false;
  toggleButton.textContent = 'Start';
  cancelAnimationFrame(animationFrame);
}

toggleButton.addEventListener('click', () => {
  scrolling ? stopScrolling() : startScrolling();
});

speedControl.addEventListener('input', () => {
  speed = parseFloat(speedControl.value);
});
