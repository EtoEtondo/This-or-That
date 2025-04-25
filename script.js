const questions = [
  { question: "Pizza or Burger?", options: ["Pizza", "Burger"] },
  { question: "Beach or Mountains?", options: ["Beach", "Mountains"] },
  { question: "Cat or Dog?", options: ["Cat", "Dog"] },
  { question: "Tea or Coffee?", options: ["Tea", "Coffee"] },
  { question: "Morning or Night?", options: ["Morning", "Night"] },
  { question: "Books or Movies?", options: ["Books", "Movies"] },
  { question: "Train or Plane?", options: ["Train", "Plane"] },
  { question: "Summer or Winter?", options: ["Summer", "Winter"] },
  { question: "Sweet or Salty?", options: ["Sweet", "Salty"] },
  { question: "City or Countryside?", options: ["City", "Countryside"] },
];

let currentIndex = 0;
let shuffledQuestions = [];
let timerInterval;
let secondsPassed = 0;

const startBtn = document.getElementById("start-button");
const retryBtn = document.getElementById("retry-button");

startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", startGame);

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  currentIndex = 0;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  secondsPassed = 0;

  if (currentIndex >= shuffledQuestions.length) {
    showResult(true);
    return;
  }

  const current = shuffledQuestions[currentIndex];
  document.getElementById("question").innerText = current.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      clearInterval(timerInterval);
      currentIndex++;
      setTimeout(loadQuestion, 200);
    };
    optionsDiv.appendChild(btn);
  });

  updateCounter();
  renderTimer();
  startTimer();
}

function updateCounter() {
  document.getElementById("question-counter").innerText = `Question ${currentIndex + 1}/${questions.length}`;
}

function renderTimer() {
  const track = document.getElementById("timer-track");
  let line = "🐱";
  for (let i = 0; i < 5; i++) {
    line += i === secondsPassed ? "⬤" : "•";
  }
  line += "🐭";
  track.innerText = line;
}

function startTimer() {
  timerInterval = setInterval(() => {
    secondsPassed++;
    renderTimer();
    if (secondsPassed >= 5) {
      clearInterval(timerInterval);
      showResult(false);
    }
  }, 1000);
}

function showResult(won) {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "flex";

  const msg = document.getElementById("result-message");
  const visual = document.getElementById("result-visual");

  if (won) {
    msg.innerText = "🎉 Nice and fast answers!";
    visual.innerText = "🐭💨";
  } else {
    msg.innerText = "💀 Time’s up! The cat caught the mouse.";
    visual.innerText = "🐱🐭";
  }
}
