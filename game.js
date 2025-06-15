const bottleBody = document.getElementById('bottle-body');
const bottle = document.getElementById('bottle');
const items = document.querySelectorAll('.drag-item');
const message = document.getElementById('message');
const correctOrder = ['cotton', 'charcoal', 'sand', 'gravel'];
let currentStep = 0;
let timerValue = 0; // Stopwatch in seconds
let timerInterval = null;
const timerDiv = document.getElementById('timer');
const resetBtn = document.getElementById('reset-btn');

items.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', item.id);
  });
});

bottleBody.addEventListener('dragover', e => {
  e.preventDefault();
});
bottleBody.addEventListener('drop', e => {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text/plain');
  if (itemId === correctOrder[currentStep]) {
    addLayer(itemId);
    currentStep++;
    if (currentStep === correctOrder.length) {
      message.textContent = 'Success! You built a DIY water filter!';
      enableGame(false);
      stopTimer();
      showResetButton();
    } else {
      message.textContent = 'Good! Add the next material.';
    }
  } else {
    message.textContent = 'Wrong order! Start over.';
    resetBottle();
  }
});

function addLayer(itemId) {
  const div = document.createElement('div');
  div.classList.add('filter-layer');
  if (itemId === 'cotton') div.classList.add('layer-cotton');
  if (itemId === 'charcoal') div.classList.add('layer-charcoal');
  if (itemId === 'sand') div.classList.add('layer-sand');
  if (itemId === 'gravel') div.classList.add('layer-gravel');
  // Insert at the beginning so new layers appear at the bottom (closest to neck)
  if (bottleBody.firstChild) {
    bottleBody.insertBefore(div, bottleBody.firstChild);
  } else {
    bottleBody.appendChild(div);
  }
}

function resetBottle() {
  bottleBody.innerHTML = '';
  currentStep = 0;
}

function startTimer() {
  timerValue = 0;
  timerDiv.textContent = `Time: 0.0s`;
  timerInterval = setInterval(() => {
    timerValue += 0.1;
    timerDiv.textContent = `Time: ${timerValue.toFixed(1)}s`;
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function showResetButton() {
  resetBtn.style.display = 'inline-block';
}

function hideResetButton() {
  resetBtn.style.display = 'none';
}

resetBtn.onclick = function() {
  resetBottle();
  message.textContent = '';
  hideResetButton();
  startTimer();
  enableGame(true);
};

// Start the timer and game on load
window.onload = function() {
  resetBottle();
  message.textContent = '';
  hideResetButton();
  startTimer();
  enableGame(true);
};
