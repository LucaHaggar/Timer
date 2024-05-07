let timerInterval;
let startTime;
let elapsedTime = 0;

function startTimer() {
  startTime = new Date();
  localStorage.setItem("startTime", startTime.getTime());

  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date();
  const savedStartTime = localStorage.getItem("startTime");
  if (savedStartTime) {
    startTime = new Date(parseInt(savedStartTime));
  }

  const currentTimeInSeconds = Math.floor(currentTime.getTime() / 1000);
  const startTimeInSeconds = Math.floor(startTime.getTime() / 1000);
  elapsedTime = currentTimeInSeconds - startTimeInSeconds;

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
    seconds
  )}`;
  document.getElementById("timer").textContent = formattedTime;

  // Controllo per il primo avviso a 3 ore
  if (hours === 3 && minutes === 0 && seconds === 0) {
    alert("Primo avviso: Sono passate 3 ore.");
  }

  // Controllo per il secondo avviso a 3 ore e 30 minuti
  if (hours === 3 && minutes === 30 && seconds === 0) {
    alert("Secondo avviso: Sono passate 3 ore e 30 minuti.");
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  localStorage.removeItem("startTime");
  elapsedTime = 0;
  document.getElementById("timer").textContent = "00:00:00";
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

document.getElementById("startButton").addEventListener("click", function () {
  startTimer();
});

document.getElementById("resetButton").addEventListener("click", function () {
  resetTimer();
});

// Calcola il tempo trascorso all'avvio della pagina
window.addEventListener("DOMContentLoaded", function () {
  const savedElapsedTime = localStorage.getItem("elapsedTime");
  if (savedElapsedTime) {
    elapsedTime = parseInt(savedElapsedTime);
    startTimer();
  }
});

// Salva il tempo trascorso nel localStorage quando l'applicazione viene chiusa
window.addEventListener("beforeunload", function () {
  localStorage.setItem("elapsedTime", elapsedTime);
});
