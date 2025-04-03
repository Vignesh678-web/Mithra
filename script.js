const rules = document.querySelectorAll('#rules .card');
const examples = document.querySelectorAll('#examples .card');
const feedback = document.getElementById('feedback');
const resetBtn = document.getElementById('reset');

let selectedRule = null;
let score = 0;
const totalPairs = rules.length;

rules.forEach(rule => {
    rule.addEventListener('click', () => {
        if (selectedRule) return; 
        rule.classList.add('selected');
        selectedRule = rule;
    });
});

examples.forEach(example => {
    example.addEventListener('click', () => {
        if (!selectedRule) return; 

        const rulePair = selectedRule.getAttribute('data-pair');
        const examplePair = example.getAttribute('data-pair');

        if (rulePair === examplePair) {
            feedback.textContent = 'Great job! That’s a match!';
            selectedRule.style.visibility = 'hidden'; 
            example.style.visibility = 'hidden';
            score++;
            if (score === totalPairs) {
                feedback.textContent = 'You won! You’re an online safety star!';
            }
        } else {
            feedback.textContent = 'Oops! Try again.';
        }

        selectedRule.classList.remove('selected');
        selectedRule = null;
    });
});

resetBtn.addEventListener('click', () => {
    rules.forEach(rule => {
        rule.style.visibility = 'visible';
        rule.classList.remove('selected');
    });
    examples.forEach(example => example.style.visibility = 'visible');
    feedback.textContent = '';
    score = 0;
    selectedRule = null;
});