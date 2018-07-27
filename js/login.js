// So secure wow!
const username = 'ron@platterz.ca';
const password = 'ponies';


function login() {

  // Input field nodes
  var u = document.getElementById('login-email');
  var p = document.getElementById('login-password');

  // Check input field values
  if (u.value == username && p.value == password) {

    // Reset input fields
    u.value = "";
    p.value = "";

    // Switch to task list page
    window.location.replace("task-list.html")
  }
  else {
    // Display error message
    document.getElementById('error').innerHTML="Incorrect username or password";
  }

}

// Switch to login page
function logout() {
  window.location.replace("index.html")
}