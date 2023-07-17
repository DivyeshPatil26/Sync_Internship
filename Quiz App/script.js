const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer:[
            {text: "Shark" , correct: false},
            {text: "Blue Whale" , correct: true},
            {text: "Elephant" , correct: false},
            {text: "Giraffe" , correct: false}
        ]
    },
    {
        question: "Which is the National Bird of India?",
        answer:[
            {text: "Parrot" , correct: false},
            {text: "Crow" , correct: false},
            {text: "Peacock" , correct: true},
            {text: "Eagle" , correct: false}
        ]
    },
    {
        question: "Which is the largest continent in the world?",
        answer:[
            {text: "Asia" , correct: true},
            {text: "South America" , correct: false},
            {text: "Africa" , correct: false},
            {text: "Australia" , correct: false}
        ]
    },
    {
        question: "How many States are in India?",
        answer:[
            {text: "24" , correct: false},
            {text: "29" , correct: true},
            {text: "25" , correct: false},
            {text: "20" , correct: false}
        ]
    },
    {
        question: "Which is the World Diaomand Center from the follwing?",
        answer:[
            {text: "Ahmedabad" , correct: false},
            {text: "Rajkot" , correct: false},
            {text: "Vadodara" , correct: false},
            {text: "Surat" , correct: true}
        ]
    }
]
const questionElement = document.getElementById("Question");
const answerbutton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    reSetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    })
}
function reSetState(){
    nextButton.style.display="none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true"
    });
    nextButton.style.display = "block"
}
function showScore(){
    reSetState();
    questionElement.innerHTML = `You Scored is ${score} out of ${questions.length}!`
    nextButton.innerHTML="Play Again";
    nextButton.style.display = "block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
showQuestion();