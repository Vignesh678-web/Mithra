document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const userPasswordInput = document.getElementById('userPassword');
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const feedbackElement = document.getElementById('feedback');
    const meterFillElement = document.getElementById('meterFill');

    generateBtn.addEventListener('click', generatePassword);
    userPasswordInput.addEventListener('input', checkStrength);

    function generatePassword() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        const password = Array(12).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
        generatedPasswordElement.textContent = `Generated Password: ${password}`;
    }

    function checkStrength() {
        const password = userPasswordInput.value;
        const strength = calculateStrength(password);
        updateFeedback(strength);
    }

    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!-+]/.test(password)) strength++;
        return strength;
    }

    function updateFeedback(strength) {
        const feedbacks = [
            { width: "20%", color: "red", message: "Very weak! Add more variety." },
            { width: "40%", color: "orange", message: "Weak! Keep improving." },
            { width: "60%", color: "yellow", message: "Moderate. Add more complexity." },
            { width: "80%", color: "lightgreen", message: "Strong! Almost there." },
            { width: "100%", color: "green", message: "Very strong password!" }
        ];

        const { width, color, message } = feedbacks[strength] || feedbacks[0];
        
        meterFillElement.style.width = width;
        meterFillElement.style.backgroundColor = color;
        feedbackElement.textContent = message;
    }
});