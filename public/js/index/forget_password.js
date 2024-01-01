const forget = document.querySelector('#forget');
const add_email = document.querySelector('#email');
const emailErr = document.querySelector('.email-error');

///// ----- Login script ----- /////
forget.addEventListener('click', async () => {
  //Clear the error message
  emailErr.textContent = ' ';

  let email = add_email.value.trim();

  if (!email) {
    let message = 'Kindly enter your email to reset your password';
    emailErr.textContent = message;
    return;
  }

  // Validate email input
  function validateForm(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  if (validateForm(email)) {
  } else {
    let message = 'Kindly enter a valid email address';
    emailErr.textContent = message;
    return;
  }

  //Send data to server
  let data = {
    email: email,
  };

  console.log(data);
  try {
    let response = await axios.post('/api/v1/forget_pwd', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let status = response.data.status;

    if (status === 200) {
      emailErr.textContent = 'Reset password link has been sent to your email.';
    }
  } catch (err) {
    console.log(err);
    console.log(err.response.data, 'We are Hererer');
    let message = err.response.data.message;
    let errMsg1 = 'User does exist with this email';
    let errMsg2 = 'Error sending password reset link';
    let errMsg3 = 'Network Error';
    let status = err.response.data.status;
    let NetWkErr = err.message;

    if (message === errMsg1 && status == 404) {
      emailErr.textContent = message;
    } else if (message === errMsg2 && status == 404) {
      emailErr.textContent = message;
    } else if (status == 400 && message === errMsg1) {
      emailErr.textContent = message;
    } else if (NetWkErr === errMsg3) {
      emailErr.textContent = message;
    } else {
      console.log(err);
      emailErr.textContent = message;
    }
  }
});
