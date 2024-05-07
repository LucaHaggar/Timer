let timerInterval;
let startTime;
let elapsedTime = 0;

function startTimer() {
  startTime = new Date();

  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date();
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
  startTime = null;
  elapsedTime = 0;
  document.getElementById("timer").textContent = "00:00:00";
  localStorage.removeItem("startTime");
  localStorage.removeItem("elapsedTime");
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

// Controlla se ci sono dati salvati nel localStorage
const savedStartTime = localStorage.getItem("startTime");
const savedElapsedTime = localStorage.getItem("elapsedTime");
if (savedStartTime && savedElapsedTime) {
  // Recupera l'orario di inizio e il tempo trascorso dal localStorage
  startTime = new Date(savedStartTime);
  elapsedTime = parseInt(savedElapsedTime);
  // Avvia il timer con il tempo trascorso già memorizzato
  startTimer();
}

document.getElementById("startButton").addEventListener("click", function () {
  startTimer();
  // Salva l'orario di avvio nel localStorage
  localStorage.setItem("startTime", new Date());
});

document.getElementById("resetButton").addEventListener("click", function () {
  resetTimer();
});

// Salva il tempo trascorso nel localStorage quando l'applicazione viene chiusa
window.addEventListener("beforeunload", function () {
  if (startTime) {
    localStorage.setItem("elapsedTime", elapsedTime);
  }
});
