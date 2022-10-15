
const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true 
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What tag is needed for javascript?", 
        choice1: "<link>",
        choice2: "<script>",
        choice3: "<div>",
        choice4: "<span>",
        answer: 2,
    },
    {
        question: "Where do you put the javascript tag in the html?", 
        choice1: "head",
        choice2: "title",
        choice3: "body",
        choice4: "css",
        answer: 3,
    },
    {
        question: "What suffix do you use for javascript?", 
        choice1: ".css",
        choice2: ".js",
        choice3: ".html",
        choice4: "jass",
        answer: 2,
    },
    {
        question: "What is Javascript used for?", 
        choice1: "To write the webpage",
        choice2: "To incorporate third party applications",
        choice3: "To add styling",
        choice4: "To create dynamic content",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

// Function that will initate the game
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

// Function that will present a new question when a user clicks on the "start game" button and after they answer a question
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
// question counter will create a bar at the top of the page showing the progress of the quiz
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

// function that will keep track of the correct and incorrect answers and tally the score
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

// adds and displays score based on correct answers
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

// Calls function to start game
startGame()



