document.getElementById("submit").addEventListener("click", function () {
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

  // Validate mobile (US example)
  const mobileRegex = /^\+?\d{10,14}$/ // Adjust the regex based on your country code requirements
  if (!mobileRegex.test(mobile)) {
    showCustomAlert("Please enter a valid mobile number.")
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
    })
    .catch((error) => {
      console.error("Error:", error)
      showCustomAlert("Error submitting the form.")
    })
})

function showCustomAlert(message) {
  document.getElementById("alertMessage").textContent = message
  document.getElementById("customAlert").style.display = "block"
}

function closeCustomAlert() {
  document.getElementById("customAlert").style.display = "none"
}
