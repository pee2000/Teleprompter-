const scriptInput = document.getElementById("scriptInput");
const scrollText = document.getElementById("scrollText");
const teleprompter = document.getElementById("teleprompter");
const speedControl = document.getElementById("speedControl");
const speedDisplay = document.getElementById("speedDisplay");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

let scrollSpeed = parseInt(speedControl.value);
let animationFrame;
let currentTop;
let isScrolling = false;

speedDisplay.textContent = scrollSpeed;

// Update speed in real time without restarting
speedControl.addEventListener("input", () => {
  scrollSpeed = parseInt(speedControl.value);
  speedDisplay.textContent = scrollSpeed;
});

startButton.addEventListener("click", () => {
  scrollText.innerText = scriptInput.value;
  scrollText.style.top = `${teleprompter.offsetHeight}px`;
  currentTop = teleprompter.offsetHeight;
  isScrolling = true;

  startButton.disabled = true;
  stopButton.disabled = false;

  animateScroll();
});

stopButton.addEventListener("click", () => {
  isScrolling = false;
  cancelAnimationFrame(animationFrame);
  startButton.disabled = false;
  stopButton.disabled = true;
});

function animateScroll() {
  if (!isScrolling) return;

  currentTop -= scrollSpeed * 0.1;
  scrollText.style.top = `${currentTop}px`;

  if (Math.abs(currentTop) < scrollText.offsetHeight + 100) {
    animationFrame = requestAnimationFrame(animateScroll);
  } else {
    // End of scroll
    isScrolling = false;
    startButton.disabled = false;
    stopButton.disabled = true;
  }
}
