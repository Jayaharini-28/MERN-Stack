// Function to redirect to the registration page with the selected place name
function redirectToRegistration(placeName) {
    // Store the selected place name in local storage
    localStorage.setItem("selectedPlace", placeName);
    // Redirect to the registration page
    window.location.href = "./register.html";
}

// Load place name on the registration page
function loadPlaceName() {
    const placeName = localStorage.getItem("selectedPlace");
    if (placeName) {
        const placeElement = document.getElementById("place-name");
        placeElement.textContent = `Register for ${placeName}`;
    } else {
        console.error("No place name found in local storage.");
    }
}

// Display error message below the input field
function showError(inputElement, message) {
    // Remove existing error message if any
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
        existingError.remove();
    }

    // Create and insert error message
    const errorMessage = document.createElement("div");
    errorMessage.textContent = message;
    errorMessage.className = "error-message text-red-500 text-sm mt-1";
    inputElement.insertAdjacentElement("afterend", errorMessage);
}

// Clear error messages
function clearError(inputElement) {
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
        existingError.remove();
    }
}

// Advanced Form Validation
function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form elements
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phoneNumber");

    let isValid = true;

    // Clear previous error messages
    clearError(fullName);
    clearError(email);
    clearError(phoneNumber);

    // Validate Full Name
    if (fullName.value.trim() === '') {
        showError(fullName, 'Full Name is required.');
        isValid = false;
    }

    // Validate Email (valid format)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.value.match(emailPattern)) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate Phone Number (Indian format)
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phoneNumber.value.match(phonePattern)) {
        showError(phoneNumber, 'Please enter a valid phone number.');
        isValid = false;
    }

    // If valid, show success message
    if (isValid) {
        alert('Registration successful!');
        document.getElementById("registerForm").reset();
    }
}
// Show error message below the input field
function showError(inputElement, message) {
    // Get the error message element
    const errorElement = inputElement.nextElementSibling;
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear error message
function clearError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement) {
        errorElement.textContent = '';
    }
}


// Login Form Validation
function login(event) {
    event.preventDefault();

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    let isValid = true;

    // Clear previous errors
    clearError(username);
    clearError(password);
    clearError(confirmPassword);

    // Username validation
    const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
    if (!username.value) {
        showError(username, "Username is required.");
        isValid = false;
    } else if (!username.value.match(usernamePattern)) {
        showError(username, "Username must be 4-12 alphanumeric characters.");
        isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;
    if (!password.value) {
        showError(password, "Password is required.");
        isValid = false;
    } else if (!password.value.match(passwordPattern)) {
        showError(password, "Password must be 6-15 characters with letters and numbers.");
        isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword.value) {
        showError(confirmPassword, "Confirm password is required.");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match.");
        isValid = false;
    }

    // If valid, proceed to login
    if (isValid) {
        alert("Login successful!");
        window.location.href = "./index.html";
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    // On the registration page, load the place name
    if (window.location.pathname.includes("register.html")) {
        loadPlaceName();
    }

    // Add click events to place cards
    const placeContainers = document.querySelectorAll(".place-container");
    placeContainers.forEach((container) => {
        container.addEventListener("click", function () {
            const placeName = container.getAttribute("data-name");
            if (placeName) {
                redirectToRegistration(placeName);
            }
        });
    });

    // Register form validation
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", validateForm);
    }

    // Login form validation
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
});
