
function showOTP() {
  // Get the user email and validate it
  var userEmail = document.getElementById("user_email").value;
  if (!userEmail) {
    alert("Please enter a valid email address.");
    return;
  }

  // Send OTP and show the OTP input field
  sendOTP(userEmail);
  document.getElementById("otp-block").classList.remove("hidden");

  // Show the alert
  alert("OTP has been sent.");
}

function verifyOTP() {
  // Get the OTP and validate it
  var otp = document.getElementById("otp").value;
  if (!otp) {
    alert("Please enter the OTP sent to your email.");
    return;
  }

  // Verify OTP and show success message
  if (verifyOTP(otp)) {
    alert("OTP verified.");
  } else {
    alert("Invalid OTP. Please try again.");
  }
}






// // Select the reset password button and the OTP block
// const resetPasswordButton = document.querySelector("button");
// const otpBlock = document.createElement("div");

// // Add a class to the OTP block
// otpBlock.classList.add("otp-block");

// // Set the HTML content of the OTP block
// otpBlock.innerHTML = `
//   <h6 class="information-text">Enter the OTP sent to your email.</h6>

//   <div class="form-group">
//     <input type="number" name="otp" id="otp">
//     <p><label for="otp">OTP</label></p>
//     <button>Verify</button>
//   </div>
// 

// // Add an event listener to the reset password button
// resetPasswordButton.addEventListener("click", () => {
//   // Add the OTP block to the page
//   resetPasswordButton.parentNode.insertBefore(otpBlock, resetPasswordButton.nextSibling);
// });
