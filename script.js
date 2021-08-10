var quizQuestions = [{
    question: "What is the color of an orange?",
    choiceA: "Yes",
    choiceB: "Orange-ish",
    choiceC: "Dog",
    choiceD: "Not orange",
    correctAnswer: "B"},
    {
    question: "What is the answer to life?",
    choiceA: "Not this answer",
    choiceB: "Maybe this answer",
    choiceC: "42",
    choiceD: "Definitely not this answer",
    correctAnswer: "C"},
    {
    question: "Is yes no ,or, no yes?",
    choiceA: "What?",
    choiceB: "Cucumber",
    choiceC: "yes no",
    choiceD: "no yes",
    correctAnswer: "A"},
    {
    question: "This is a gimme, the answer is A.",
    choiceA: "This is the answer",
    choiceB: "Not this one",
    choiceC: "Try again",
    choiceD: "Come on, the answer is A",
    correctAnswer: "A"},
    {
    question: "Who is mans best friend?",
    choiceA: "Dolphin",
    choiceB: "Cat",
    choiceC: "Mr. Potato",
    choiceD: "Dog",
    correctAnswer: "D"},
    {
    question: "What sound does a duck make?",
    choiceA: "Bark",
    choiceB: "Squawk",
    choiceC: "Moo",
    choiceD: "Duck sounds",
    correctAnswer: "D"},

];

var quiz = document.getElementById("quiz");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
var questions = document.getElementById("questions");
var timer = document.getElementById("timer");
var results = document.getElementById("result");
var startPage = document.getElementById("startPage");
var startBtn = document.getElementById("startBtn");
var startHighscore = document.getElementById("startHighscore");
var Gameover = document.getElementById("Gameover");
var finalScore = document.getElementById("finalScore");
var initials = document.getElementById("initials");
var submitScore = document.getElementById("submitScore");
var highContainer = document.getElementById("highContainer");
var highPage = document.getElementById("highPage");
var highscore = document.getElementById("highscore-score");
var highscoreInitials = document.getElementById("highscore-initials");
var endgameBtn = document.getElementById("endgameBtn");
var currentQuestion = 0;
var finalQuestion = quizQuestions.length;
var timeLeft = 60;
var timerInterval;
var correct;
var score = 0;

function startQuiz(){
    startPage.style.display = "none";
    Gameover.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timer.textContent = "Time left: " + timeLeft;
        timeLeft--;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
}

function showScore() {
    quiz.style.display = "none";
    Gameover.style.display = "flex";
    clearInterval(timerInterval);
    finalScore.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct";
    initials.value = "";
}

function generateQuizQuestion() {
    var currentQuestion = quizQuestions[currentQuestion];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
    
    Gameover.style.display = "none";
    if (currentQuestion === finalQuestion) {
        return showScore();
    }
}

submitScore.addEventListener("click", function highscore (){
    if (initials.value === "") {
        alert("Initials can't be blank");
        return false;
    } else {
       var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
       var currentUser = initials.value.trim ();
       var cuurrentHighscore = {
           name: currentUser,
           score: score
       };

       Gameover.style.display = "none";
       highContainer.style.display = "flex";
       highPage.style.display = "block";
       endgameBtn.style.display = "flex";

       savedHighscores.push(cuurrentHighscore);
       localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
       generateHighscores();
    }
});

function showHighscores(){
    startPage.style.display = "none";
    Gameover.style.display = "none";
    highContainer.style.display = "none";
    highscore.style.display = "block";
    endgameBtn.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    highscoreInitials.textContent = "";
    highscore.textContent = "";
}

function replayQuiz(){
    highContainer.style.display = "none";
    Gameover.style.display = "none";
    startPage.style.display = "flex";
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
}

startBtn.addEventListener("click", startBtn);