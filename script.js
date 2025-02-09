import questions from "./data/questions.js";
const bodyQuiz = document.querySelector(".box_quiz"); 
const question = document.querySelector("#question");
const paginatons = document.querySelector(".pagination");
const result = document.querySelector("#result");
const congrats = document.querySelector(".title_congradulations");
const answers = document.querySelector("#answers");
const numberQuestion = document.querySelector("#number_questions");
const numberPagination = document.querySelector(".pagination");
const finish = document.querySelector(".finish_quiz");
let correctQuestions = 0;
let currentQuestion = 0;
let answeredQuestions = [false, false, false];


function goToQuestion(index) {
  if (!answeredQuestions[index]) {
    alert("Responda esta pergunta antes de avançar!");
    return;
  }
  currentQuestion = index;
  loadQuestion();
}

function nextQuestion(e) {
  if (!answeredQuestions[currentQuestion]) {
    if (e.target.getAttribute("correct") === "true") {
      correctQuestions++;
    }
    answeredQuestions[currentQuestion] = true;
  }

  createPagination();

  if (currentQuestion === questions.length - 1) {
    finish.style.display = "flex"; 
    paginatons.style.display = "none";
  } else {
    finish.style.display = "none"; 
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

finish.addEventListener("click", () => {
  if (currentQuestion === questions.length - 1) {
    Conglatulation();
  }
});


function Conglatulation() {
  bodyQuiz.style = "display: none";
  congrats.style = "display: flex";
  finish.style = "display: none";
  paginatons.style = "display: none";
  paginatons.style = "display: none";
  result.innerHTML = `Você acertou ${correctQuestions} de ${questions.length} perguntas!`;
  
}

function createPagination() {
  numberPagination.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const button = document.createElement("button");
    button.classList.add("pagination");
    button.textContent = i + 1;

    if (answeredQuestions[i]) {
      button.classList.add("active");
      button.addEventListener("click", () => goToQuestion(i));
    } else {
      button.addEventListener("click", () => {
        alert("Responda esta pergunta antes de avançar!");
      });
      button.disabled = true;
    }
    numberPagination.appendChild(button);
  }
}

function loadQuestion() {
  const item = questions[currentQuestion];
  answers.innerHTML = "";
  question.innerHTML = item.question;
  createPagination();
  numberQuestion.innerHTML = `${currentQuestion + 1}`;
  item.answer.forEach((answer) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="answer" correct="${answer.correct}">
      ${answer.text}
    </button >
    `;
    answers.appendChild(div);
  });
  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
