const text = document.getElementById('text');
const speedControl = document.getElementById('speed-control');
const toggleButton = document.getElementById('toggle');
const scriptInput = document.getElementById('script-input');
const loadBtn = document.getElementById('load-btn');

let speed = parseFloat(speedControl.value);
let scrolling = false;
let animationFrame;

function scrollText() {
  const currentBottom = parseFloat(text.style.bottom || '0');
  text.style.bottom = (currentBottom + speed) + 'px';

  if (text.getBoundingClientRect().top > text.parentElement.getBoundingClientRect().bottom) {
    stopScrolling();
  } else {
    animationFrame = requestAnimationFrame(scrollText);
  }
}

function startScrolling() {
  if (!text.textContent.trim()) return;
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

loadBtn.addEventListener('click', () => {
  const script = scriptInput.value.trim();
  if (script) {
    text.textContent = script;
    text.style.bottom = '0'; // Start from visible bottom
    stopScrolling();
    toggleButton.textContent = 'Start';
  }
});
