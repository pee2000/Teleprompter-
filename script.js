const scriptInput = document.getElementById("script");
const scrollContent = document.getElementById("scrollContent");
const prompter = document.getElementById("prompter");
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let scrollSpeed = parseInt(speedInput.value);
let animationFrameId = null;
let scrollPos = 0;

speedInput.addEventListener("input", () => {
  scrollSpeed = parseInt(speedInput.value);
  speedValue.textContent = scrollSpeed;
});

startBtn.addEventListener("click", () => {
  scrollContent.innerText = scriptInput.value;
  scrollContent.style.top = `${prompter.offsetHeight}px`;
  scrollPos = prompter.offsetHeight;

  startBtn.disabled = true;
  stopBtn.disabled = false;
  animateScroll();
});

stopBtn.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function animateScroll() {
  scrollPos -= scrollSpeed * 0.1; // Adjust scroll speed
  scrollContent.style.top = `${scrollPos}px`;

  if (Math.abs(scrollPos) < scrollContent.offsetHeight + 100) {
    animationFrameId = requestAnimationFrame(animateScroll);
  } else {
    stopBtn.disabled = true;
    startBtn.disabled = false;
  }
}
