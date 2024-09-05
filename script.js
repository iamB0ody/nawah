document.getElementById("submitBtn").addEventListener("click", function () {
  const fullName = document.getElementById("fullName").value.trim()
  const companyName = document.getElementById("companyName").value.trim()
  const title = document.getElementById("title").value.trim()
  const email = document.getElementById("email").value.trim()
  const mobile = document.getElementById("mobile").value.trim()

  // Validate all fields
  if (!fullName) {
    alert("Full Name is required.")
    return
  }
  if (!companyName) {
    alert("Company Name is required.")
    return
  }
  if (!title) {
    alert("Title is required.")
    return
  }
  if (!email) {
    alert("Email is required.")
    return
  }
  if (!mobile) {
    alert("Mobile Number is required.")
    return
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email.")
    return
  }

  // Validate mobile (US example)
  const mobileRegex = /^\+?\d{10,14}$/ // Adjust the regex based on your country code requirements
  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid mobile number.")
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
  formData.append("fullName", "John Doe 18")
  formData.append("companyName", "Company 16")
  formData.append("title", "Title 11")
  formData.append("email", "test856@example.com")
  formData.append("mobile", "+15465324103")

  const scriptURL = "https://script.google.com/macros/s/AKfycbwz0H1VprKMoixpsMeUgYnf7V5rOaBuEHQthdNzKcEgFHmC2ywMqW_RUWS1wI463CWJfg/exec"
  fetch(scriptURL, {
    method: "POST",
    mode: "cors", // Ensure CORS is handled
    body: formData, // Send FormData instead of JSON
  })
    .then((response) => {
      if (response.ok) {
        alert("Form submitted successfully!")
      } else {
        alert("Failed to submit the form.")
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("Error submitting the form.")
    })
})
