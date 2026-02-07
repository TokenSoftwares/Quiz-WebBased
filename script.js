const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which of the following is a physical change?",
    answers: [
      { text: "Rusting of iron", correct: false },
      { text: "Burning wood", correct: false },
      { text: "Melting ice", correct: true },
      { text: "Digesting food", correct: false },
    ],
  },
  {
    question: "Which unit is NOT an SI base unit?",
    answers: [
      { text: "Kilogram", correct: false },
      { text: "Second", correct: false },
      { text: "Kelvin", correct: false },
      { text: "Liter", correct: true },
    ],
  },
  {
    question: "How many significant figures are in the number 0.00450?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "Which statement best describes an element?",
    answers: [
      { text: "It can be separated by physical means", correct: false },
      { text: "It consists of only one type of atom", correct: true },
      { text: "It contains two or more compounds", correct: false },
      { text: "It has a variable composition", correct: false },
    ],
  },
  {
    question: "What is the SI unit of energy?",
    answers: [
      { text: "Calorie", correct: false },
      { text: "Electron volt", correct: false },
      { text: "Joule", correct: true },
      { text: "Watt", correct: false },
    ],
  },
  {
    question: "Which of the following is a heterogeneous mixture?",
    answers: [
      { text: "Salt water", correct: false },
      { text: "Air", correct: false },
      { text: "Brass", correct: false },
      { text: "Sand and water", correct: true },
    ],
  },
  {
    question:
      "A substance that cannot be broken down into simpler substances by chemical means is called a:",
    answers: [
      { text: "Compound", correct: false },
      { text: "Mixture", correct: false },
      { text: "Element", correct: true },
      { text: "Solution", correct: false },
    ],
  },
  {
    question: "Which temperature scale is an absolute temperature scale?",
    answers: [
      { text: "Celsius", correct: false },
      { text: "Fahrenheit", correct: false },
      { text: "Kelvin", correct: true },
      { text: "Rankine", correct: false },
    ],
  },
  {
    question: "Which of the following has the greatest mass?",
    answers: [
      { text: "1 mole of hydrogen atoms", correct: false },
      { text: "1 mole of oxygen atoms", correct: false },
      { text: "1 mole of carbon atoms", correct: false },
      { text: "1 mole of iron atoms", correct: true },
    ],
  },
  {
    question:
      "Which law states that matter is neither created nor destroyed in a chemical reaction?",
    answers: [
      { text: "Law of definite proportions", correct: false },
      { text: "Law of multiple proportions", correct: false },
      { text: "Law of conservation of mass", correct: true },
      { text: "Avogadro’s law", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great Job! You know your stuff";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good Effort! Keep learning though..";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Ehh.. Try again to improve.";
  } else {
    resultMessage.textContent = "WTF? You stupid?";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
