document.getElementById("submit").addEventListener("click", function () {
  const submitButton = document.getElementById("submit")
  submitButton.disabled = true // Disable the submit button

  const fullName = document.getElementById("fullName").value.trim()
  const companyName = document.getElementById("companyName").value.trim()
  const title = document.getElementById("title").value.trim()
  const email = document.getElementById("email").value.trim()
  const mobile = document.getElementById("mobile").value.trim()

  // Validate all fields
  if (!fullName) {
    showCustomAlert("Full Name is required.")
    submitButton.disabled = false // Re-enable the submit button
    return
  }
  if (!companyName) {
    showCustomAlert("Company Name is required.")
    submitButton.disabled = false // Re-enable the submit button
    return
  }
  if (!title) {
    showCustomAlert("Title is required.")
    submitButton.disabled = false // Re-enable the submit button
    return
  }
  if (!email) {
    showCustomAlert("Email is required.")
    submitButton.disabled = false // Re-enable the submit button
    return
  }
  if (!mobile) {
    showCustomAlert("Mobile Number is required.")
    submitButton.disabled = false // Re-enable the submit button
    return
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showCustomAlert("Please enter a valid email.")
    submitButton.disabled = false // Re-enable the submit button
    return
  }

  // Validate mobile (US example)
  const mobileRegex = /^\+?\d{10,14}$/ // Adjust the regex based on your country code requirements
  if (!mobileRegex.test(mobile)) {
    showCustomAlert("Please enter a valid mobile number.")
    submitButton.disabled = false // Re-enable the submit button
    return
  }

  // Prepare data for submission
  const data = {
    fullName,
    companyName,
    title,
    email,
    mobile,
  }

  // Create a FormData object
  const formData = new FormData()
  formData.append("fullName", data.fullName)
  formData.append("companyName", data.companyName)
  formData.append("title", data.title)
  formData.append("email", data.email)
  formData.append("mobile", data.mobile)

  const scriptURL = "https://script.google.com/macros/s/AKfycbwz0H1VprKMoixpsMeUgYnf7V5rOaBuEHQthdNzKcEgFHmC2ywMqW_RUWS1wI463CWJfg/exec"
  fetch(scriptURL, {
    method: "POST",
    mode: "cors", // Ensure CORS is handled
    body: formData, // Send FormData instead of JSON
  })
    .then((response) => {
      if (response.ok) {
        showCustomAlert("Form submitted successfully!, Thanks!.")
      } else {
        showCustomAlert("Failed to submit the form.")
      }
      submitButton.disabled = false // Re-enable the submit button after submission
    })
    .catch((error) => {
      console.error("Error:", error)
      showCustomAlert("Error submitting the form.")
      submitButton.disabled = false // Re-enable the submit button after submission
    })
})

function showCustomAlert(message) {
  document.getElementById("alertMessage").textContent = message
  document.getElementById("customAlert").style.display = "block"
}

function closeCustomAlert() {
  document.getElementById("customAlert").style.display = "none"
}
