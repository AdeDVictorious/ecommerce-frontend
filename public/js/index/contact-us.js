let contactUs = document.querySelector('#submit');
let customerName = document.querySelector('.name');
let email = document.querySelector('.email');
let subject = document.querySelector('.subject');
let message = document.querySelector('.message');

///// ----- Register/New User script ----- /////
contactUs.addEventListener('click', async (e) => {
  e.preventDefault();
  //clear the error message
  customerName.textContent = '';
  email.textContent = '';
  subject.textContent = '';
  message.textContent = '';

  //query the form ID
  let custName = document.querySelector('#customername').value.trim();
  let custEmail = document.querySelector('#customerEmail').value.trim();
  let custSubject = document.querySelector('#contactSubject').value.trim();
  let custMessage = document.querySelector('#contactMessage').value.trim();

  // To validate if input is omitted by the users
  if (!custName || !custEmail || !custSubject || !custMessage) {
    message.textContent = 'Kindly enter all required field';
    return;
  }

  ///////--------To look for a better way to do this later--------//////////
  //Validate User custName for non-alphabet
  function validateName(custName) {
    const regex = /^[0-9A-Za-z\s\.,#-]+$/;
    return regex.test(custName);
  }

  if (validateName(custName)) {
    // The input contains only alphabet letters
  } else {
    // The input contains non-alphabet characters
    customerName.textContent = 'only alphabet is allowed';
    return;
  }

  //Validate if User email is valid
  function validateForm(custEmail) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(custEmail);
  }

  // To validate if email is valid
  if (validateForm(custEmail)) {
    // console.log(Email is valid);
  } else {
    email.textContent = 'enter a valid email';
    return;
  }

  ///---- to replace the Req Exp later ----- /////
  ///// ----- Validate User Subject for numbers ----- /////
  function validateSubject(custSubject) {
    const regex = /^[0-9A-Za-z\s\.,#-]+$/;
    return regex.test(custSubject);
  }

  ///// ----- To validate if customer Subject  ----- /////
  if (validateSubject(custSubject)) {
    // The input contains only alphabet letters
  } else {
    // The input contains non-alphabet characters
    subject.textContent = 'only alphabet is allowed';
    return;
  }

  //Validate User lastName for numbers
  function validateMessage(custMessage) {
    const regex = /^[0-9A-Za-z\s\.,#-]+$/;
    return regex.test(custMessage);
  }

  ///// ----- To validate if customer Subkect  ----- /////
  if (validateMessage(custMessage)) {
    // The input contains only alphabet letters
  } else {
    // The input contains non-alphabet characters
    message.textContent = 'only alphabet is allowed';
    return;
  }

  ////Send data to the server
  let data = {
    custName: custName,
    custEmail: custEmail,
    custSubject: custSubject,
    custMessage: custMessage,
  };

  try {
    let response = await axios.post('/api/v1/sendUsAMessage', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let status = response.data.status;
    console.log(response.data, status);

    if (status === 201) {
      contactUsForm = document.querySelector('#contact-form');
      successMsg = document.querySelector('.successMsg');

      contactUsForm.reset();

      successMsg.textContent =
        'Your message has been sent successfully, We would get back to you shortly. Thank you';
      setTimeout(() => {
        successMsg.textContent = '';
      }, 5000);
    }
  } catch (err) {
    console.log(err);
  }
});
