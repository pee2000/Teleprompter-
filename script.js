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

    // Wait for the DOM to update so we can measure correctly
    requestAnimationFrame(() => {
      const containerHeight = text.parentElement.clientHeight;
      const lineHeight = parseFloat(getComputedStyle(text).lineHeight);
      const offsetFromBottom = containerHeight - lineHeight;

      text.style.bottom = `${offsetFromBottom}px`; // Start with only the first line visible
    });

    stopScrolling();
    toggleButton.textContent = 'Start';
  }
});
