const API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';

let currentQuestionIndex = 0;
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');

async function getTriviaQuestion() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.results.length > 0) {
            const questionData = data.results[0];
            const question = questionData.question;
            const incorrectOptions = questionData.incorrect_answers;
            const correctOption = questionData.correct_answer;

            displayQuestion(question, [...incorrectOptions, correctOption]);
        } else {
            console.error('No questions received from the API.');
        }
    } catch (error) {
        console.error('Error fetching trivia question:', error);
    }
}

function displayQuestion(question, options) {
    questionElement.innerHTML = question;
    optionsElement.innerHTML = options.map(option => `<div class="option">${option}</div>`).join('');
    window.currentQuestionData = { correctAnswer: options[options.length - 1] }; // Save correct answer
}

function checkAnswer(event) {
    if (event.target.classList.contains('option')) {
        const selectedOption = event.target.textContent;
        const correctOption = window.currentQuestionData.correctAnswer || '';

        if (selectedOption === correctOption) {
            resultElement.textContent = 'Correct!';
        } else {
            resultElement.textContent = 'Incorrect!';
            setTimeout(() => {
                resultElement.textContent = ''; // Clear the result message
                nextQuestion();
            }, 1500); // Automatically move to the next question after 1.5 seconds (adjust as needed)
        }
    }
}

function nextQuestion() {
    resultElement.textContent = '';
    currentQuestionIndex++;
    getTriviaQuestion();
}

// Initial load
getTriviaQuestion();
