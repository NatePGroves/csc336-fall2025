const quizQuestions = [ //asked ChatGPT for some quiz questions for the first 3
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Shakespeare", "Hemingway", "Tolkien", "Orwell"],
        correct: "Shakespeare"
    },
    {
        question: "Which volleyball position is expected to be the best blocker?",
        answers: ["Libero", "Outside", "Defensive Specialist", "Middle"],
        correct: "Middle"
    },
    {
        question: "What studio developed Hollow Knight?",
        answers: ["Team Cherry", "Ubisoft", "SilkSinger", "Microsoft"],
        correct: "Team Cherry"
    },
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High-level Text Machine Language"],
        correct: "Hyper Text Markup Language"
    }
];

currentQuestionAnswerPair = NaN;

function showMenu() {
    document.getElementById("menu").classList.add("show");
    document.getElementById("overlay").classList.add("show");
    document.getElementById("main-page").classList.add("oof");
}

function closeMenu() {
    document.getElementById("menu").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
    document.getElementById("main-page").classList.remove("oof");
}

function incorrectAnswer() {
    alert("incorrect");
    revealCorrect();
}

function correctAnswer() {
    alert("correct");
    revealCorrect();    
    loadQuestion();
}

function chooseQuestion() {
    if (quizQuestions.length === 0) {
        alert("You Win!");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    return quizQuestions.splice(randomIndex, 1) [0];// This line is from ChatGPT but I'm learning JS from it
}

function loadQuestion() {
    if (quizQuestions.length === 0) {
        alert("You Win!");
        return null;
    }
    document.getElementById("answer-space").innerHTML = ""
    currentQuestionAnswerPair = chooseQuestion()
    for (let choice of currentQuestionAnswerPair.answers) {
        let currentAnswer = document.createElement("div");
        currentAnswer.classList.add("answer");
        currentAnswer.textContent = choice;
        if (choice == currentQuestionAnswerPair.correct){
            currentAnswer.addEventListener("click", correctAnswer)
        } else {
            currentAnswer.addEventListener("click", incorrectAnswer)
        }
        document.getElementById("answer-space").appendChild(currentAnswer);
    }
    document.getElementById("question-card").innerText = currentQuestionAnswerPair.question

}

function revealCorrect(){
    let answers = document.getElementsByClassName("answer");
    for (let choice of answers){
        if (choice.textContent == currentQuestionAnswerPair.correct){
            choice.classList.add("correct")
        } else {
            choice.classList.add("incorrect")
        } 
    }
}
