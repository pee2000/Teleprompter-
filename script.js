const text = document.getElementById('text');
const speedControl = document.getElementById('speed-control');
const toggleButton = document.getElementById('toggle');
const scriptInput = document.getElementById('script-input');
const loadBtn = document.getElementById('load-btn');

let speed = parseFloat(speedControl.value);
let scrolling = false;
let animationFrame;
let currentOffset = 0;

function scrollText() {
  if (!scrolling) return;

  currentOffset += speed;
  text.style.transform = `translateY(-${currentOffset}px)`;

  const containerHeight = text.parentElement.clientHeight;
  const textHeight = text.scrollHeight;

  if (currentOffset < textHeight + 50) {
    animationFrame = requestAnimationFrame(scrollText);
  } else {
    stopScrolling();
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
    text.style.transform = 'translateY(0px)';
    currentOffset = 0;
    stopScrolling();
    toggleButton.textContent = 'Start';
  }
});
