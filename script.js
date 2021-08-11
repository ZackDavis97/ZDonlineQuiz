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

var quiz = document.querySelector("#quiz");
var buttonA = document.querySelector("#A");
var buttonB = document.querySelector("#B");
var buttonC = document.querySelector("#C");
var buttonD = document.querySelector("#D");
var questions = document.querySelector("#questions");
var timer = document.querySelector("#timer");
var results = document.querySelector("#result");
var startPage = document.querySelector("#startPage");
var startBtn = document.querySelector("#startBtn");
var startHighscore = document.querySelector("#startHighscore");
var Gameover = document.querySelector("#Gameover");
var finalScore = document.querySelector("#finalScore");
var initials = document.querySelector("#initials");
var submitScore = document.querySelector("#submitScore");
var highContainer = document.querySelector("#highContainer");
var highPage = document.querySelector("#highPage");
var highscore = document.querySelector("#highscore-score");
var highscoreInitials = document.querySelector("#highscore-initials");
var endgameBtn = document.querySelector("#endgameBtn");
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
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;

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
    Gameover.style.display = "none";
    if (currentQuestion === finalQuestion) {
        return showScore();
    }
    var questions = quizQuestions[currentQuestion];
    questions.innerHTML = currentQuestion.question;
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
    let choiceA = currentQuestion.choiceA
    console.log(choiceA);
};

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

function showHighscore(){
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

function generateHighscores() {
    highscoreInitials.innerHTML = "";
    highscore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreInitials.appendChild(newNameSpan);
        highscore.appendChild(newScoreSpan);
    }
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestion].correctAnswer;
    if (answer === correct && currentQuestion !== finalScore) {
        score++;
        alert("You git it right fellow human!");
        currentQuestion++;
        generateQuizQuestion();
    } else if (answer !== correct && currentQuestion !== finalQuestion) {
        alert("That is wrong :(");
        currentQuestion++;
        generateQuizQuestion();
    } else {
        showScore();
    }
    
}

startBtn.addEventListener("click", startQuiz);