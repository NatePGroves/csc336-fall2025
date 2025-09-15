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
    let incorrectPopUp = document.createElement("img");
    incorrectPopUp.src = "images/incorrect.png"
    incorrectPopUp.classList.add("pop-up");
    document.body.appendChild(incorrectPopUp);
    setTimeout(() => { incorrectPopUp.remove(); }, 2000); //Don't really understand this, but its from https://www.sitepoint.com/delay-sleep-pause-wait/
    revealCorrect();
}

function correctAnswer() {
    let correctPopUp = document.createElement("img");
    correctPopUp.src = "images/correct.png"
    correctPopUp.classList.add("pop-up");
    document.body.appendChild(correctPopUp);
    setTimeout(() => { correctPopUp.remove(); }, 2000); //Don't really understand this, but its from https://www.sitepoint.com/delay-sleep-pause-wait/
    revealCorrect();    
    loadQuestion();
}

function chooseQuestion() {
    
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    return quizQuestions.splice(randomIndex, 1) [0];// This line is from ChatGPT but I'm learning JS from it
}

function loadQuestion() {
    if (quizQuestions.length === 0) {
        setTimeout(() => {winner()
        }, 2000);
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

function winner(){
    let winningPopUp = document.createElement("img");
    let rotation = 0
    winningPopUp.src = "images/winning.png"
    winningPopUp.classList.add("pop-up");
    document.body.appendChild(winningPopUp);
    setTimeout(() => { alert("Click Here to Restart:");
        window.location.reload(true);
     }, 2000); //Don't really understand this, but its from https://www.sitepoint.com/delay-sleep-pause-wait/ 
                // Okay after experimenting it seems like it is performing an async function where what happens inside the time out happens after the wait 
                // but whats after will not wait for the timeout
    
}