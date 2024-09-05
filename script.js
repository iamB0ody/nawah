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

  // Replace 'YOUR_SCRIPT_URL' with your Google Apps Script URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbyrf9sCCmc0tX7Qf9trT_ABG3dc0yHaNU_0KpHN14bDO59iqHzZs8Dvm-m3pAzRS-hHlw/exec"
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
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
