const quiz =[
    {
        question: "what does trolling mean? 🤔",
        options: ["A) A Fun Game 🎲","B) Telling Silly Stories 📑", "C) Saying Mean Things🥺", "D) A New App 📱"],
        correct: "C"
    },
    {
        question: "If Someone sends a scary message what do you do? ⚠",
        options: ["A) Hide it 😣","B) Talk back 🗣️", "C) Take Picture And Tell A Grown-Up 📸", "D) Throw it away 🗑"],
        correct : "C"
    },
    {
        question: "What is a best way to handle cyberbullying ? 👾",
        options: ["A) Report block and ignore 😏","B) Bully them back 👊🏽","C) Delete your account 😭","D) Ask them to stop nicely 🤗"],
        correct: "A"
    },
    {
        question:"What should you do if a cyberbully apologizes to you? 😮‍💨",
        options:["A) Accept it but stay cautious ⚠", "B)Start being mean to them 😡", "C) Never forgive them 😾", "D) Ignore them forever 🫸🏻"],
        correct: "A"
    },
    {
        question:"You accidently hurt someone's feeling online what should you do? 😥",
        options:["A) ignore it 😮", "B) Apologize and learn from it 🙅🏼‍♂️", "C) Block them  🚫 ","D) Make fun of them more 🤣"],
        correct: "B"

    },
    {
      question: "Why is it important to report cyberbullying? 👾",
      options: ["A) It helps stop bullying and protect others 👫", "B) It fun to report people 🤪 ","D) It makes you look like a hero 🫤 ","D) It doesn't matter 🥺"],
      correct: "A"
    },
    {
        question:"What is the golden rule of online behaviour? ⚠️",
        options:["A) Treat others how you want to be treated 🤝"," B) Say whatever you want 🤓 ", "C) Ignore online safety rule 🤞🏼","D) Only be nice to people you know 👿"],
        correct:"A"

    },
    {
        question:"If a friend tell you they are being bullied online what should you do? 😶 ",
        options:["A) Tell them to ignore it 😲","B) Support them and report it 🫂","C) join in the bullying 🤝","D) laugh it off  😜"],
        correct:"B"
    },
    {
        question:"What does it mean to block someone? 🫷🏿",
        options:["A) Remove them from your friendlist 📜","B) Let them see your past but not comment 👀"," C) Report them to police 👮🏾‍♂️","D) Send them a warning message ⚠"],
        correct:"A"
    },
    {
        question:"What is a digital footprint? 👣",
        options:["A) The tail of information you leave online 👣", "B) The size of your computer screen 🖥 ", "C) A way to track cyberbullies 👾", "D) A gaming term  🕹"],
        correct:"A"  
    }    
];



const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('nextBtn');
const dogImage = document.getElementById('dog');

let currentQuestionIndex = 0;
let score = 0;
let animationInterval;

function loadQuestion() {
    const currentQuestion = quiz[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    resetDogPosition();
    clearInterval(animationInterval);
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quiz[currentQuestionIndex];
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(currentQuestion.correct);

    const options = optionsContainer.children;
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
        if (i === correctIndex) {
            options[i].classList.add('correct');
        } else if (i === selectedIndex) {
            options[i].classList.add('incorrect');
        }
    }

    if (selectedIndex === correctIndex) {
        score++;
        feedbackElement.textContent = "Correct! 🎉";
        animateDog('jump');
    } else {
        feedbackElement.textContent = "Oops! That's not correct. 😕";
        animateDog('nod');
    }

    scoreElement.textContent = `Stars: ${'⭐'.repeat(score)}`;
    nextButton.style.display = 'block';
}

function animateDog(action) {
    let frame = 0;
    const frameCount = 5;
    clearInterval(animationInterval);
    
    animationInterval = setInterval(() => {
        if (action === 'jump') {
            dogImage.style.transform = `translateY(${-Math.sin(frame / frameCount * Math.PI) * 10}px)`;
        } else if (action === 'nod') {
            dogImage.style.transform = `rotate(${Math.sin(frame / frameCount * Math.PI) * 5}deg)`;
        }
        
        frame++;
        if (frame >= frameCount * 2) {
            clearInterval(animationInterval);
            resetDogPosition();
        }
    }, 100);
}

function resetDogPosition() {
    dogImage.style.transform = 'translateY(0) rotate(0)';
}

function nextQuestion() {
    clearInterval(animationInterval);
    resetDogPosition();
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(animationInterval);
    quizContainer.innerHTML = `
        <h1>Quiz Completed! 🎊</h1>
        <p>Your final score: ${score} out of ${quiz.length}</p>
        <p>Stars earned: ${'⭐'.repeat(score)}</p>
        <button onclick="location.reload()">Play Again</button>
    `;
}

nextButton.addEventListener('click', nextQuestion);

// Start the quiz
loadQuestion();
