const form = document.getElementById('registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const pass2 = document.getElementById('confirm-password');

const  errorUser = document.getElementById('errorUser');
const  errorEmail = document.getElementById('errorEmail');
const  errorPass = document.getElementById('errorPass');
const errorPass2 = document.getElementById('errorPass2');

// form.addEventListener('submit', function (event) {

//     // username validation
//     const userRegex = /^[a-zA-Z0-9]{6,}$/;
//     if (!userRegex.test(username.value)) {
//         event.preventDefault();
//         username.style.border = 'red solid 2px';
//         errorUser.style.display = 'block';
//         return;
//     } else {
//         username.style.border = '';
//         errorUser.style.display = 'none';

//     }

//     // email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(email.value)) {
//         event.preventDefault();

//         email.style.border = 'red solid 2px';
//         errorEmail.style.display = 'block';

//         return;
//     } else {
//         email.style.border = '';
//         errorEmail.style.display = 'none';

//     }

//     // password validation
//     if (pass.value.length < 8) {
//         event.preventDefault();

//         pass.style.border = 'red solid 2px';
//         errorPass.style.display = 'block';

//         return;
//     } else {
//         pass.style.border = '';
//         errorPass.style.display = 'none';

//     }

//     // confirm password validation
//     if (pass.value !== pass2.value) {
//         event.preventDefault();

//         pass2.style.border = 'red solid 2px';
//         errorPass2.style.display = 'block';

//         return;
//     } else {
//         pass2.style.border = '';
//         errorPass2.style.display = 'none'
//     }

//     if (userRegex.test(username.value) &&
//         emailRegex.test(email.value) &&
//         pass.value.length >= 8 &&
//         pass.value === pass2.value) {

//         // Check if the user already exists in the LocalStorage
//         var oldUsers = JSON.parse(localStorage.getItem('users')) || [];

//         // Find the user if already exists
//         var userIndex = oldUsers.findIndex((user) => user.username === username.value);

//         if (userIndex !== -1) {
//             event.preventDefault();
//             alert('User already exists!');
//             return;
//         }

//         var newUser = {
//             username: username.value,
//             email: email.value,
//             password: pass.value
//         };

//         oldUsers.push(newUser);

//         // Save the  users array to LocalStorage
//         localStorage.setItem('users', JSON.stringify(oldUsers));

//         // alert for successful registration
//         alert(`${username.value} + ${email.value}`);
//     }
// })



///////////////////////////////////////////


function validateUsername() {
    const userRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!userRegex.test(username.value)) {
        setError(username, errorUser, 'Username must be at least 6 characters long.');
        return false;
    } else {
        clearError(username, errorUser);
        return true;
    }
}

function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        setError(email, errorEmail, 'Invalid email format.');
        return false;
    } else {
        clearError(email, errorEmail);
        return true;
    }
}

function validatePassword() {
    if (pass.value.length < 8) {
        setError(pass, errorPass, 'Password must be at least 8 characters long.');
        return false;
    } else {
        clearError(pass, errorPass);
        return true;
    }
}

function validateConfirmPassword() {
    if (pass.value !== pass2.value) {
        setError(pass2, errorPass2, 'Passwords do not match.');
        return false;
    } else {
        clearError(pass2, errorPass2);
        return true;
    }
}

function setError(inputField, errorElement, errorMessage) {
    inputField.style.border = 'red solid 2px';
    errorElement.style.display = 'block';
    errorElement.textContent = errorMessage;
}

function clearError(inputField, errorElement) {
    inputField.style.border = '';
    errorElement.style.display = 'none';
    errorElement.textContent = '';
}




form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Validation 
        const oldUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = oldUsers.findIndex(user => user.username === username.value);

        if (userIndex !== -1) {
            alert('User already exists!');
        } else {
            const newUser = {
                username: username.value,
                email: email.value,
                password: pass.value
            };
            oldUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(oldUsers));
            alert('Registration successful!');
            form.reset();
            window.location.href = 'login.html';
        }
    }
});
