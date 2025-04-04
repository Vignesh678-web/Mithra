const rules = document.querySelectorAll('#rules .card');
        const examples = document.querySelectorAll('#examples .card');
        const feedback = document.getElementById('feedback');
        const resetBtn = document.getElementById('reset');

        let selectedRule = null;
        let score = 0;
        const totalPairs = rules.length;


        rules.forEach(rule => {
            rule.addEventListener('click', () => {
                if (selectedRule || rule.classList.contains('matched')) return;
                rule.classList.add('selected');
                selectedRule = rule;
            });
        });

        examples.forEach(example => {
            example.addEventListener('click', () => {
                if (!selectedRule || example.classList.contains('matched')) return;

                const rulePair = selectedRule.getAttribute('data-pair');
                const examplePair = example.getAttribute('data-pair');

                if (rulePair === examplePair) {
                    feedback.textContent = '✅ Great job! That’s a match!';
                    selectedRule.classList.add('matched');
                    example.classList.add('matched');
                    score++;

                    if (score === totalPairs) {
                        feedback.textContent = '🎉 You won! You’re an online safety star!';
                    }
                } else {
                    feedback.textContent = '❌ Oops! That’s incorrect. Try again.';
                }

                selectedRule.classList.remove('selected');
                selectedRule = null;
            });
        });

      
        resetBtn.addEventListener('click', () => {
            rules.forEach(rule => {
                rule.classList.remove('matched', 'selected');
            });
            examples.forEach(example => example.classList.remove('matched'));
            feedback.textContent = '';
            score = 0;
            selectedRule = null;
        });
    
