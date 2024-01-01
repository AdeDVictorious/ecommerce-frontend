const reset_pwd = document.querySelector('#reset');
const pwdErr = document.querySelector('.pwdErr');

///// ----- Reset password script ----- /////
reset_pwd.addEventListener('click', async (e) => {
  e.preventDefault();
  //clear the error message
  pwdErr.textContent = '';

  //query the form ID
  let password = document.querySelector('#reset_pwd').value.trim();

  // To validate if input is omitted by the users
  if (!password) {
    pwdErr.textContent = 'Kindly enter a new password';
    return;
  }

  // To validate if the password No is not <  3
  if (password.length <= 3) {
    pwdErr.textContent = 'Phone number must be greater than 3 digit';
    return;
  }

  let url = location.pathname;

  // Define a regular expression pattern to match the numbers after "/reset_password/"
  var pattern = /\/reset_password\/(\w+)/;

  // Use the match() method to find the match
  var match = url.match(pattern);

  var token = match[1].trim();

  ////Send data to the server
  let data = {
    password: password,
    token: token,
  };

  try {
    let response = await axios.post('/api/v1/reset_pwd', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let status = response.data.status;
    let message = response.data.message.message;

    if (status === 200) {
      pwdErr.textContent = message;
      return;
    }
  } catch (err) {
    console.log(err);
    let status = err.response.data.status;
    let message = err.response.data.message;
    let netwkErr = err.config.message;

    console.log(status, message);

    if (status === 404) {
      pwdErr.textContent = message;
      return;
    } else if (status === 400) {
      pwdErr.textContent = message;
      return;
    } else if (netwkErr) {
      pwdErr.textContent = 'Network error, try again later';
    } else {
      // location.href = '/error-page';
    }
  }
});
