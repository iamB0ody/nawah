const submitButton = document.getElementById("submit")
document.getElementById("submit").addEventListener("click", function () {
  disableBtn(submitButton, true)

  const fullName = document.getElementById("fullName").value.trim()
  const companyName = document.getElementById("companyName").value.trim()
  const title = document.getElementById("title").value.trim()
  const email = document.getElementById("email").value.trim()
  const mobile = document.getElementById("mobile").value.trim()

  // Validate all fields
  if (!fullName) {
    showCustomAlert("Full Name is required.")
    return
  }
  if (!companyName) {
    showCustomAlert("Company Name is required.")
    return
  }
  if (!title) {
    showCustomAlert("Title is required.")
    return
  }
  if (!email) {
    showCustomAlert("Email is required.")
    return
  }
  if (!mobile) {
    showCustomAlert("Mobile Number is required.")
    return
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showCustomAlert("Please enter a valid email.")
    return
  }

  // Validate Egyptian mobile number
  const egyptianMobileRegex = /^(?:\+20|0020|01)[0125]\d{8}$/ // Adjusted regex for Egyptian numbers

  if (!egyptianMobileRegex.test(mobile)) {
    showCustomAlert("Please enter a valid Egyptian mobile number.")
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

  const scriptURL = "https://script.google.com/macros/s/AKfycbythkHukQr47rrz9ZnKCzWrQhFZ_u8l0TEJ8wNP5RgR-XXbZCzzrr8PfWliJw6BV8M6qg/exec"
  fetch(scriptURL, {
    method: "POST",
    body: formData, // Send FormData instead of JSON
  })
    .then((response) => {
      if (response.ok) {
        clearForm()
        showCustomAlert("Form submitted successfully!, Thanks!.")
      } else {
        showCustomAlert("Failed to submit the form.")
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      showCustomAlert("Error submitting the form.")
    })
})

function clearForm() {
  // Clear all input fields
  document.getElementById("fullName").value = ""
  document.getElementById("companyName").value = ""
  document.getElementById("title").value = ""
  document.getElementById("email").value = ""
  document.getElementById("mobile").value = ""
}

function showCustomAlert(message) {
  document.getElementById("alertMessage").textContent = message
  document.getElementById("customAlert").style.display = "block"
}

function closeCustomAlert() {
  document.getElementById("customAlert").style.display = "none"
  disableBtn(submitButton, false)
}

function disableBtn(submitButton, state) {
  submitButton.disabled = state
}

function setRandomValues() {
  // Generate random values for each input field
  document.getElementById("fullName").value = `John Doe ${Math.floor(Math.random() * 100)}`
  document.getElementById("companyName").value = `Company ${Math.floor(Math.random() * 100)}`
  document.getElementById("title").value = `Title ${Math.floor(Math.random() * 100)}`
  document.getElementById("email").value = `test${Math.floor(Math.random() * 1000)}@example.com`

  // Generate a random Egyptian mobile number
  const egyptianPrefixes = ["010", "011", "012", "015"]
  const randomPrefix = egyptianPrefixes[Math.floor(Math.random() * egyptianPrefixes.length)]
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000) // Generate 8 random digits
  document.getElementById("mobile").value = `${randomPrefix}${randomNumber}` // Concatenate with country code +20
}

// Set random values on page load for testing
// window.onload = setRandomValues
