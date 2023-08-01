document.getElementById('login-form').addEventListener('submit', function (event) {

    var loginUsername = document.getElementById('login-username').value;
    var loginPassword = document.getElementById('login-password').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with matching username and password
    var loggedInUser = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (loggedInUser) {
        localStorage.setItem('unique', JSON.stringify(loggedInUser.username));
        alert('Login successful! Welcome, ' + loggedInUser.username);


    } else {
        event.preventDefault();

        alert('Invalid username or password. Please try again.');
    }
});