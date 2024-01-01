const register = document.querySelector('#register');
const first_Name = document.querySelector('.firstName');
const last_Name = document.querySelector('.lastName');
const signUp = document.querySelector('.signUp');
let signUpEmail = document.querySelector('.signUpEmail');
const signUpNumber = document.querySelector('.PhoneNo');

//// To disable the button /////
let clickDisable = false;
///// ----- Register/New User script ----- /////
register.addEventListener('click', async (e) => {
  e.preventDefault();
  //clear the error message
  first_Name.textContent = '';
  last_Name.textContent = '';
  signUp.textContent = '';
  signUpEmail.textContent = '';
  signUpNumber.textContent = '';

  if (clickDisable) {
    return;
  }

  clickDisable = true;
  //query the form ID
  let firstName = document.querySelector('#firstName').value.trim();
  let lastName = document.querySelector('#lastName').value.trim();
  let phoneNumber = document.querySelector('#phoneNumber').value.trim();
  let email = document.querySelector('#emailAddress').value.trim();
  let password = document.querySelector('#regPassword').value.trim();

  // To validate if input is omitted by the users
  if (!firstName || !lastName || !phoneNumber || !email || !password) {
    signUp.textContent = 'Kindly enter all required field';

    clickDisable = false;
    return;
  }

  ///////--------To look for a better way to do this later--------//////////
  //Validate User firstName for non-alphabet
  function validatefirst_Name(firstName) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(firstName);
  }

  if (validatefirst_Name(firstName)) {
    // The input contains only alphabet letters
  } else {
    // The input contains non-alphabet characters
    first_Name.textContent = 'only alphabet is allowed';

    clickDisable = false;
    return;
  }

  // //Validate User lastName for non-alphabet
  function validatelast_Name(lastName) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(lastName);
  }

  if (validatelast_Name(lastName)) {
    // The input contains only alphabet letters
  } else {
    // The input contains non-alphabet characters
    last_Name.textContent = 'only alphabet is allowed';

    clickDisable = false;
    return;
  }
  ///////--------To look for a better later inorder to reduce the long line of code--------//////////

  //Validate User firstName for numbers
  function validatefirstName(firstName) {
    const regex = /^-?\d+(\.\d+)?$/;
    // const regex = /^[a-zA-Z]+$/;
    return regex.test(firstName);
  }

  // To validate if firstName for numbers
  if (validatefirstName(firstName)) {
    first_Name.textContent = 'Only alphabet is allowed';

    clickDisable = false;
    return;
  }

  //Validate User lastName for numbers
  function validatelastName(lastName) {
    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(lastName);
  }

  // To validate if firstName for numbers
  if (validatelastName(lastName)) {
    last_Name.textContent = 'Only alphabet is allowed';

    clickDisable = false;
    return;
  }

  //Validate if User email is valid
  function validateForm(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  // To validate if email is valid
  if (validateForm(email)) {
    // console.log(Email is valid);
  } else {
    signUpEmail.textContent = 'enter a valid email';

    clickDisable = false;
    return;
  }

  // To validate if the length Phone No is not < or > 11
  if (phoneNumber.length < 11 || phoneNumber.length > 11) {
    signUpNumber.textContent = 'Phone number must be 11 digit';

    clickDisable = false;
    return;

    // To validate if input is not an empty string
  } else if (phoneNumber.length < 11 || phoneNumber.length > 11) {
    signUpNumber.textContent = 'Phone number must be 11 digit';

    clickDisable = false;
    return;
  }

  ////Send data to the server
  let data = {
    firstName: firstName,
    lastName: lastName,
    phoneNo: phoneNumber,
    email: email,
    password: password,
  };

  try {
    let response = await axios.post('/api/v1/newUser', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data, 'Am inside the data');

    let status = response.data.message.result.status;
    let message = response.data.message.result.message;

    let errMsg1 = 'This email has been used';
    let errMsg2 = 'All field must be filled';
    let errMsg3 = 'Kindly confirm your phone number';

    if (message === errMsg2 && status === 404) {
      signUp.textContent = message;

      clickDisable = false;
      return;
    } else if (message === errMsg3 && status === 404) {
      signUpNumber.textContent = message;

      clickDisable = false;
      return;
    } else if (message === errMsg2 && status === 404) {
      signUp.textContent = message;

      clickDisable = false;
      return;
    } else if (message === errMsg1 && status === 404) {
      signUpEmail.textContent = message;

      clickDisable = false;
      return;
    } else {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);

    let netwkErr = err.config.message;

    if (netwkErr) {
      signUp.textContent = 'Network error, try again later';

      clickDisable = false;

      location.href = '/error-page';
    }
  }
});
