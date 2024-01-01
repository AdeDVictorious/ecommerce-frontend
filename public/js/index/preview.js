let addCartItem = document.querySelector('.add-to-cart');
let qtyMsg = document.querySelector('.err-Msg');
let reviews = document.querySelector('#submit');
let customerName = document.querySelector('.author');
let email = document.querySelector('.email');
let message = document.querySelector('.feedbackMsg');

///// ----- add to cart under get One product preview script ----- /////
let clickDisallowed = false;

addCartItem.addEventListener('click', async (e) => {
  e.preventDefault();
  qtyMsg.textContent = '';

  if (clickDisallowed) {
    return;
  }

  clickDisallowed = true;
  /////----- Get the ID ----- /////
  let itemId = document.querySelector('.quantity').getAttribute('id');
  let productId = document.querySelector('.quantity').getAttribute('id');
  let name = document.querySelector('.product-names').getAttribute('id');
  let image = document.querySelector('.lg-image').getAttribute('id');
  let price = document.querySelector('.price-box').getAttribute('id');
  let qty = document.querySelector('#addToCart').value;
  let qty_avail = document.querySelector('.qty_avail').getAttribute('id');
  let qty_available = Number(qty_avail);

  //Validate User custInput for number only
  function validateqty(qty) {
    const regex = /^[0-9]+$/;
    return regex.test(qty);
  }

  if (validateqty(qty)) {
    // The input contains only number
  } else {
    qtyMsg.textContent = 'Not allowed, use a valid number';

    setTimeout(() => {
      // Reset the form
      formdata = document.querySelector('.cart-quantity');
      formdata.reset();

      qtyMsg.textContent = '';

      clickDisallowed = false;
    }, 3000);
    return;
  }

  let quantity = Number(qty);

  if (quantity === 0) {
    qtyMsg.textContent =
      'Quantity cannot be zero (0). Kindly select/enter quantity ';

    setTimeout(() => {
      // Reset the form
      formdata = document.querySelector('.cart-quantity');
      formdata.reset();

      qtyMsg.textContent = '';

      clickDisallowed = false;
    }, 3000);
    return;
  } else if (qty_available < 1) {
    qtyMsg.textContent = 'This product is currently not available';
    setTimeout(() => {
      // Reset the form
      formdata = document.querySelector('.cart-quantity');
      formdata.reset();

      qtyMsg.textContent = '';

      clickDisallowed = false;
    }, 3000);
    return;
  } else if (quantity > qty_available) {
    qtyMsg.textContent =
      'Quantity entered is greater than available quantities';
    setTimeout(() => {
      // Reset the form
      formdata = document.querySelector('.cart-quantity');
      formdata.reset();

      qtyMsg.textContent = '';

      clickDisallowed = false;
    }, 3000);
    return;
  }

  const data = {
    id: productId,
    Product_TableId: productId,
    image: image,
    name: name,
    price: price,
    quantity: quantity,
  };

  /// ----- Send the id to server to add it to the cart ---- /////
  try {
    let response = await axios.post('/api/v1/addQtyCart', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let status = response.data.status;

    if (status === 201) {
      //// get the value of the cartlength and update
      let cart_length = document.querySelector('.cart-item-count');

      let newLength = response.data.message.cart_length;

      cart_length.textContent = newLength;

      // Reset the form
      formdata = document.querySelector('.cart-quantity');
      formdata.reset();

      // Create a new <i> element with the desired FontAwesome class
      const iTag = document.createElement('i');
      iTag.className = 'fa-solid fa-check fa-beat-fade fa-2xl';

      // addedToCart.textContent = 'Cart item created';
      addCartItem.replaceWith(iTag);

      setTimeout(() => {
        iTag.replaceWith(addCartItem);

        clickDisallowed = false;
      }, 3000);
    } else if (status === 200) {
      // Create a new <i> element with the desired FontAwesome class
      formdata = document.querySelector('.cart-quantity');

      formdata.reset();

      const iTag = document.createElement('i');
      iTag.className = 'fa-solid fa-check fa-beat-fade fa-2xl';

      addCartItem.replaceWith(iTag);

      setTimeout(() => {
        iTag.replaceWith(addCartItem);

        clickDisallowed = false;
      }, 3000);
    } else if (response.status === 201) {
      //// get the value of the cartlength and update
      let cart_length = document.querySelector('.cart-item-count');

      let newLength = response.data.cartLength;

      cart_length.textContent = newLength;

      // Create a new <i> element with the desired FontAwesome class
      formdata = document.querySelector('.cart-quantity');

      formdata.reset();

      const iTag = document.createElement('i');
      iTag.className = 'fa-solid fa-check fa-beat-fade fa-2xl';
      // iTag.classList.add('fa-solid', 'fa-check', 'fa-beat');

      // addedToCart.textContent = 'Cart item created';
      addCartItem.replaceWith(iTag);

      setTimeout(() => {
        iTag.replaceWith(addCartItem);

        clickDisallowed = false;
      }, 3000);
    } else {
      // Create a new <i> element with the desired FontAwesome class
      formdata = document.querySelector('.cart-quantity');

      formdata.reset();

      const iTag = document.createElement('i');
      iTag.className = 'fa-solid fa-check fa-beat-fade fa-2xl';

      addCartItem.replaceWith(iTag);

      setTimeout(() => {
        iTag.replaceWith(addCartItem);

        clickDisallowed = false;
      }, 3000);
    }
  } catch (err) {
    console.log(err.response.data);
    let status = err.response.data.status;
    let message = err.response.data.message;

    let errMsg1 = 'Error adding a Cart ';
    let errMsg2 = 'This product is not found';

    if (status === 404 && message === errMsg1) {
      qtyMsg.textContent = 'This product is not found';
      return;
    } else if (status === 404 && message === errMsg2) {
      location.assign('/error-page');
    } else {
      location.assign('/error-page');
    }
  }
});

///// ----- Register/New User script ----- /////
reviews.addEventListener('click', async (e) => {
  e.preventDefault();
  //clear the error message
  customerName.textContent = '';
  email.textContent = '';
  message.textContent = '';

  //query the form input
  let custName = document.getElementById('author').value.trim();
  let custEmail = document.querySelector('#email').value.trim();
  let custRating = document.querySelector('.star-rating').value.trim();
  let custMessage = document.querySelector('#feedback').value.trim();
  let product_id = customerName.getAttribute('product_id');

  // To validate if input is omitted by the users
  if (!custName || !custEmail || !custMessage) {
    email.textContent = 'Kindly enter all required field';
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
    custRating: custRating,
    custMessage: custMessage,
    product_ID: product_id,
  };

  try {
    let response = await axios.post('/api/v1/sendReview', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let status = response.data.status;

    if (status === 200) {
      reviewForm = document.querySelector('#review_form');

      reviewForm.reset();

      //// ----- Send back a Success message to user ----- /////
      email.textContent =
        'Your review has been sent successfully. Thank you for your time';

      setTimeout(() => {
        //// ----- Clear the message displayed to user ----- /////
        email.textContent = '';
      }, 5000);
    }
  } catch (err) {
    console.log(err);
  }
});
