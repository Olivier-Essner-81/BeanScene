document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const countryButtons = document.querySelectorAll('.country-btn');
    const signUpBtn = document.querySelector('button[type="submit"]');

    let countrySelected = false;

    countryButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            countryButtons.forEach(b => {
                b.classList.remove('bg-black', 'text-white');
                b.classList.add('bg-white', 'text-black');
            });
            this.classList.remove('bg-white', 'text-black');
            this.classList.add('bg-black', 'text-white');
            countrySelected = true;
            updateButtonState();
        });
    });

    function updateButtonState() {
        const usernameFilled = usernameInput.value.trim().length > 0;
        const passwordFilled = passwordInput.value.trim().length > 0;
        if (usernameFilled && passwordFilled && countrySelected) {
            signUpBtn.disabled = false;
            signUpBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            signUpBtn.disabled = true;
            signUpBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    usernameInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);

    // Username and password minimum length check on submit
    signUpBtn.addEventListener('click', function (e) {
        if (usernameInput.value.trim().length < 5) {
            e.preventDefault();
            alert('Username must be at least 5 characters long.');
            usernameInput.focus();
            return;
        }
        if (passwordInput.value.trim().length < 5) {
            e.preventDefault();
            alert('Password must be at least 5 characters long.');
            passwordInput.focus();
            return;
        }
        // If both are OK, redirect to main.html
        e.preventDefault();
        window.location.href = "main.html";
    });

    // Initial state
    updateButtonState();
});