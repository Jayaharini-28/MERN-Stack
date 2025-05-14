// Global variable to store the generated OTP
let generatedOtp = '';

// Function to generate a random 6-digit OTP
function generateOtp() {
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated OTP: ", generatedOtp); // For debugging purposes
}

// Timer functionality
let timer;
let timeLeft = 30; // 30 seconds timer

function startTimer() {
  timeLeft = 30; // Reset timer
  timer = setInterval(function () {
    document.getElementById("timer").textContent = `Time left: ${timeLeft--} seconds`;
    if (timeLeft < 0) {
      clearInterval(timer);
      document.getElementById("timer").textContent = "OTP expired!";
      document.getElementById("validate-btn").style.display = "none";
    }
  }, 1000);
}

// Handle OTP validation
function validateOtp(event) {
  event.preventDefault(); // Prevent form submission

  const enteredOtp = document.getElementById('otp').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Clear previous error messages
  errorMessage.textContent = '';

  if (enteredOtp === '') {
    errorMessage.textContent = 'OTP cannot be empty.';
  } else if (enteredOtp.length !== 6) {
    errorMessage.textContent = 'OTP must be 6 digits.';
  } else if (enteredOtp === generatedOtp) {
    alert('OTP is correct! Proceeding...');
    // Redirect to another page or take further actions here
  } else {
    errorMessage.textContent = 'Invalid OTP. Please try again.';
  }
}

// Add event listener for the "Send OTP" button
document.getElementById("send-otp-btn").addEventListener("click", function () {
  generateOtp();
  startTimer();
  document.getElementById("validate-btn").style.display = "inline-block"; // Show the Validate OTP button
  alert('OTP has been sent! Please enter it below.');
});

// Add event listener for the OTP validation form
document.getElementById("otp-form").addEventListener("submit", validateOtp);
