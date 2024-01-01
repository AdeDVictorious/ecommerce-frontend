const login = document.querySelector('#login');
const add_email = document.querySelector('#email');
const add_password = document.querySelector('#password');
const emailErr = document.querySelector('.email-error');
const pwdErr = document.querySelector('.pwd-error');

//// To disable the button /////
let clickDisable = false;
///// ----- Login script ----- /////
login.addEventListener('click', async () => {
  //Clear the error message
  emailErr.textContent = ' ';
  pwdErr.textContent = ' ';

  if (clickDisable) {
    console.log(clickDisable);
    return;
  }

  clickDisable = true;
  let email = add_email.value.trim();
  let password = add_password.value.trim();

  if (!email || !password) {
    let message = 'All required field must be filled';
    pwdErr.textContent = message;

    clickDisable = false;
    return;
  }

  // Validate email input
  function validateForm(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  if (validateForm(email)) {
  } else {
    let message = 'kindly enter a valid email address';
    emailErr.textContent = message;

    clickDisable = false;
    return;
  }

  //Send data to server
  let data = {
    email: email,
    password: password,
  };

  try {
    let response = await axios.post('/api/v1/userLogin', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let status = response.data.status;

    if (status === 200) {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);
    let message = err.response.data.message;
    let errMessage1 = 'Please provide email and password';
    let errMessage2 = 'User does not exist';
    let errMessage3 = 'Incorrect Password';
    let status = err.response.data.status;

    if (message == errMessage1 && status == 404) {
      pwdfeedback.textContent = message;

      clickDisable = false;
    } else if (message == errMessage2 && status == 404) {
      emailErr.textContent = message;
      clickDisable = false;
    } else if (message == errMessage3 && err.response.data.status == 404) {
      pwdErr.textContent = err.response.data.message;

      clickDisable = false;
    } else if (status == 400) {
      pwdfeedback.textContent = message;

      clickDisable = false;
    } else {
      console.log(err);
      clickDisable = false;
    }
  }
});
