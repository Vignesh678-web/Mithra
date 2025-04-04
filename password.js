document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const userPasswordInput = document.getElementById('userPassword');
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const feedbackElement = document.getElementById('feedback');
    const meterFillElement = document.getElementById('meterFill');

    generateBtn.addEventListener('click', () => {
        const password = generatePassword();
        generatedPasswordElement.textContent = `Generated Password: ${password}`;
        userPasswordInput.value = password;
        updateFeedback(4); // Set max strength for generated password
    });

    userPasswordInput.addEventListener('input', () => {
        const password = userPasswordInput.value;
        const strength = calculateStrength(password);
        console.log("Password strength:", strength);
        updateFeedback(strength);
    });

    function generatePassword() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    }

    function updateFeedback(strength) {
        console.log("Updating feedback for strength:", strength);
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
