let intervalId = null;
let speed = 3;

const scriptInput = document.getElementById('scriptInput');
const scriptContent = document.getElementById('scriptContent');
const speedInput = document.getElementById('speed');
const teleprompter = document.getElementById('teleprompter');

speedInput.addEventListener('input', () => {
  speed = parseInt(speedInput.value);
  if (intervalId) {
    clearInterval(intervalId);
    startScroll();
  }
});

function startScroll() {
  if (!scriptContent.innerText.trim()) {
    scriptContent.innerText = scriptInput.value;
    scriptContent.style.top = '100%';
  }

  if (intervalId) return;

  intervalId = setInterval(() => {
    const currentTop = parseFloat(scriptContent.style.top) || 100;
    scriptContent.style.top = (currentTop - 0.1 * speed) + '%';

    // Stop scrolling when the content is out of view
    if (teleprompter.getBoundingClientRect().bottom > scriptContent.getBoundingClientRect().bottom) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 30);
}

function pauseScroll() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetScroll() {
  pauseScroll();
  scriptContent.style.top = '100%';
}
