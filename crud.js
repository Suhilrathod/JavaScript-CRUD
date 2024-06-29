// Load data from local storage on page load
var arr = JSON.parse(localStorage.getItem("data")) || [];

// Variable to store the index of the selected row for editing
var selectedRowIndex = null;

// Function to handle form submission or update
function formSubmit(event) {
  event.preventDefault();

  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var gender = document.querySelector('input[name="gender"]:checked').value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var university = document.getElementById("university").value;
  var city = document.getElementById("city").value;
  var mobileNum = document.getElementById("mobileNum").value;

  var student = {
    fname: fname,
    lname: lname,
    gender: gender,
    email: email,
    password: password,
    university: university,
    city: city,
    mobileNum: mobileNum,
  };

  var passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters long and contain at least one special character");
    return;
  }

  // Check if a row is selected for editing
  if (selectedRowIndex !== null) {
    // Check if the email already exists, excluding the current student's email
    for (const obj of arr) {
      if (obj.email === student.email && arr.indexOf(obj) !== selectedRowIndex) {
        alert("Email already exists");
        return;
      }
    }
    arr[selectedRowIndex] = student; // Update the selected row
    selectedRowIndex = null; // Reset selectedRowIndex
  } else {
    // Check if the email already exists
    for (const obj of arr) {
      if (obj.email === student.email) {
        alert("Email already exists");
        return;
      }
    }
    arr.push(student); // Add a new row
  }

  localStorage.setItem("data", JSON.stringify(arr));
  updateTable();
  resetForm();
}

// Function to update the table with the latest data
function updateTable() {
  var tbody = document.getElementById("myTableBody");
  tbody.innerHTML = "";

  for (const obj of arr) {
    const index = arr.indexOf(obj);
    tbody.innerHTML +=
      "<tr><td>" +
      obj.fname +
      "</td><td>" +
      obj.lname +
      "</td><td>" +
      obj.gender +
      "</td><td>" +
      obj.email +
      "</td><td>" +
      maskPassword(obj.password) +
      "</td><td>" +
      obj.university +
      "</td><td>" +
      obj.city +
      "</td><td>" +
      obj.mobileNum +
      "</td><td><button onclick='editRow(" +
      index +
      ")' class='edit-button'>Edit</button> <button onclick='deleteRow(" +
      index +
      ")' class='delete-button'>Delete</button></td></tr>";
  }
}

function maskPassword(password) {
  return "*".repeat(password.length);
}

// Function to edit a row by reflecting its data into the form
function editRow(index) {
  selectedRowIndex = index;
  var student = arr[index];

  // Reflect data into the form for editing
  document.getElementById("fname").value = student.fname;
  document.getElementById("lname").value = student.lname;
  document.querySelector(
    'input[name="gender"][value="' + student.gender + '"]'
  ).checked = true;
  document.getElementById("email").value = student.email;
  document.getElementById("password").value = student.password;
  document.getElementById("university").value = student.university;
  document.getElementById("city").value = student.city;
  document.getElementById("mobileNum").value = student.mobileNum;
}

// Function to delete a row
function deleteRow(index) {
  arr.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(arr));
  updateTable();
  resetForm();
}

// Function to reset the form
function resetForm() {
  document.getElementById("myForm").reset();
}

// Initialize table on page load
updateTable();
