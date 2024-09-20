// Create a quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Create a question class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer.toLowerCase() === choice.toLowerCase(); // Changed for case insensitivity
    }
}

// Display Question
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // Show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // Show options
        let choices = quiz.getQuestionIndex().choices;

        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]); // Removed space in button ID
        }

        showProgress();
    }
}

// Guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

// Show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = 
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`; // Fixed typo: questions
}

// Show score
function showScores() {
    let quizEndHTML = 
        `
        <h1>Quiz Completed</h1>
        <h2 id="score">You scored: ${quiz.score} of ${quiz.questions.length}</h2> <!-- Fixed typo: questions -->
        <div class="quiz-repeat">
            <a href="Simple Quiz.html">Take Quiz Again</a>
        </div>
        `;
    let quizElement = document.getElementById("quiz"); // Ensure you have a div with id "quiz"
    quizElement.innerHTML = quizEndHTML;
}

// Create quiz questions
let questions = [
    new Question("Hyper Text Markup Language Stands For?", ["JQuery", "XHTML", "CSS", "HTML"], "HTML"),
    new Question("Which is a Javascript Framework?", ["React", "Laravel", "Django", "Sass"], "React"),
    new Question("Cascading Style Sheet Stands for?", ["JQuery", "HTML", "CSS", "XML"], "CSS"), // Fixed case
    new Question("Which is a backend language?", ["PHP", "HTML", "React", "All"], "PHP"),
    new Question("Which is the best for Artificial intelligence?", ["React", "Laravel", "Python", "Sass"], "Python")
];

let quiz = new Quiz(questions);

// Add event listener for DOMContentLoaded to ensure elements are available before running code
document.addEventListener("DOMContentLoaded", function() {
    displayQuestion(); // Moved this inside the event listener
});
