
// HTML and js

// FED Project JS file for quiz.html
// Author: Kaung Ye Myint Mo 
// Date:   08/05/2023

// Filename: script.js

//timer
let secondsLeft = 15 * 60; // 15 minutes

let timeDisplay;
function displayTimeLeft() {
  const timerValueElement = document.getElementById("timer-value");
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  timerValueElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateTimeRemaining() {
  secondsLeft--;
  displayTimeLeft(); // Call the displayTimeLeft function here

  if (secondsLeft <= 0) {
    clearInterval(timeDisplay);
    showResult();
  }
}


//Questions 
const questions = [
  {
    question: "1. Do you keep up with news about the environment?",
    answers: {
      a: "YES",
      b: "NO"
    },
    correctAnswer: "a"
  },
  {
    question: "2. Do you use disposable straws?",
    answers: {
      a: "YES",
      b: "NO"
    },
    correctAnswer: "b"
  },
  {
    question: "3. Do you throw away plastic bottles and plastic bags?",
    answers: {
      a: "YES",
      b: "NO"
    },
    correctAnswer: "b"
  },
  {
    question: "4. Do you conserve water?",
    answers: {
      a: "YES",
      b: "NO"
    },
    correctAnswer: "a"
  },
  {
    question: "5. Do you take public transport?",
    answers: {
      a: "YES",
      b: "NO"
    },
    correctAnswer: "a"
  },
  {
    question: "6. I don't think I can change the environment.",
    answers: {
      a: "TRUE",
      b: "FALSE"
    },
    correctAnswer: "b"
  },
  {
    question: "7. I do not believe it is my duty to care for mother nautre.",
    answers: {
      a: "TRUE",
      b: "FALSE"
    },
    correctAnswer: "b"
  },
  {
    question: "8. I believe the responsibility to combat climate change falls in the hands of the government only.",
    answers: {
      a: "TRUE",
      b: "FALSE"
    },
    correctAnswer: "b"
  },
  {
    question: "9. How concerned are you about climate change?",
    answers: {
      a: "EXTREMELY",
      b: "NOT AT ALL"
    },
    correctAnswer: "a"
  },
  {
    question: "10. How concerned are you about endangered species?",
    answers: {
      a: "EXTREMELY",
      b: "NOT AT ALL"
    },
    correctAnswer: "a"
  },
  {
    question: "11. How strong is your belief in society being able to combat climate change?",
    answers: {
      a: "VERY STRONG",
      b: "NONE"
    },
    correctAnswer: "a"
  }
]


let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const answersSpace = document.getElementById("answers");
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;

  const answers = [];
  for (letter in currentQuestion.answers) {
    answers.push(
      `<label>
        <input type="radio" name="question${currentQuestionIndex}" value="${letter}">
        ${currentQuestion.answers[letter]}
      </label>`
    );
  }
answersSpace.innerHTML = answers.join(''); //answers is an array, join> turn into a single string 
}

//to calculate score when the answer is correct 
function selectAnswer(selectedChoice) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedChoice === currentQuestion.correctAnswer) {
    score++;
  }
}

function nextQuestion() {
  const userAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
  //document.querySelector is a modal, checked >> only target the checked input 

  if (userAnswer !== null) {
    // An answer is selected, proceed to the next question
    selectAnswer(userAnswer.value);
    currentQuestionIndex++; //to go to the next question 

//to display next ques 
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      clearInterval(timeLeft);
      showResult();
    }
  } else {
    // No answer selected, show an alert or message to prompt the user
    alert("Please select an answer before proceeding.");
  }
}

function showResult() {
  const quizSpace = document.getElementById("quiz-container");
  const resultSpace = document.getElementById("result");
  const scoreElement = document.getElementById("score-value");
  const resultMessageElement = document.getElementById("result-message");
  
  quizSpace.classList.add("d-none");
  resultSpace.classList.remove("d-none");
  scoreElement.textContent = score;

  if (score >= 10) {
    resultMessageElement.textContent = `WOW! You got ${score} out of 11. This is impressive. It shows how much you care for the environment and mother nature.
    We appreciate your effort into making the earth a better place. The world is better with you in it.` ;
  } else if (score >=4) {
    resultMessageElement.textContent = `You got ${score} out of 11. You are doing a lot for the environment but there is still more we can do to help.
    We hope our blog was educational enough for you.`;
  } else {
    resultMessageElement.textContent = `You got ${score} out of 11. There are still things you can do to save the earth. As citizens of the earth,
    each individual has the reponsibility to do our part. You are not alone in this.`;
  }
}

const nextButton = document.getElementById("next-btn");
nextButton.addEventListener("click", nextQuestion);

// to start the quiz on command 
function startQuiz() {
  const startPage = document.getElementById("start-page");
  const quizSpace = document.getElementById("quiz-container");
  const timerElement = document.getElementById("timer");

  startPage.classList.add("d-none");
  quizSpace.classList.remove("d-none");
  timerElement.classList.remove("d-none");

  displayQuestion();

  timeLeft = setInterval(updateTimeRemaining, 1000); // Start the timer here
}

const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startQuiz);

displayQuestion();