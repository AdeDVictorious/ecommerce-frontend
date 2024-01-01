let addItem = document.querySelectorAll('.addTocart');
let addWishList = document.querySelectorAll('.addToWishList');
let addCartItem = document.querySelectorAll('.add-to-cart');
let formdata = document.querySelector('.cart-quantity');

// ///// ----- add to cart under homepage script  example 1----- /////
// addItem.forEach((itemId) => {
//   itemId.addEventListener('click', async (e) => {
//     e.preventDefault();

//     /////----- Get the ID ----- /////
//     let productId = itemId.getAttribute('product_id');

//     /////Send data to server
//     let data = { product_TableId: productId };

//     console.log(data, 'Am with the data');

//     ///// ----- Send the id to server to add it to the cart ---- /////
//     // try {
//     //   let response = await axios.post('/api/v1/add-item-to-cart', data, {
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //   });

//     //   console.log(response.data.status);

//     //   let status = response.data.status;

//     //   if (status === 201) {
//     //     // Create a new <i> element with the desired FontAwesome class
//     //     // addedToCart = document.querySelector('.addTocart');
//     //     const iTag = document.createElement('i');
//     //     iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

//     //     // addedToCart.textContent = 'Cart item created';
//     //     itemId.replaceWith(iTag);

//     //     setTimeout(() => {
//     //       iTag.replaceWith(itemId);
//     //     }, 4000);
//     //   } else if (status === 200) {
//     //     // Create a new <i> element with the desired FontAwesome class
//     //     const iTag = document.createElement('i');
//     //     iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

//     //     // addedToCart.textContent = 'Cart item created';
//     //     itemId.replaceWith(iTag);

//     //     setTimeout(() => {
//     //       iTag.replaceWith(itemId);
//     //     }, 4000);
//     //   }
//     // } catch (err) {
//     //   console.log(err.response.data.status);

//     //   let status = err.response.data.status;
//     //   let message = err.response.data.message;
//     //   let errMsg1 = 'This product is currently not available';
//     //   let errMsg3 = 'Error adding a Cart ';
//     //   let errMsg4 = 'This product is not found';

//     //   console.log(err.response.data, status, message);
//     //   if (status == 404 && message === 'invalid login token') {
//     //     location.assign('/login-register');
//     //   } else if (status === 400 && message === errMsg1) {
//     //     const iTag = document.createElement('i');
//     //     iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

//     //     itemId.replaceWith(iTag);

//     //     setTimeout(() => {
//     //       iTag.replaceWith(itemId);
//     //     }, 4000);
//     //     return;
//     //   } else if (status === 404 && message === errMsg4) {
//     //     location.assign('/error-page');
//     //   } else if (status === 404 && message === errMsg3) {
//     //     location.assign('/error-page');
//     //   } else {
//     //     location.assign('/error-page');
//     //   }
//     // }
//   });
// });

let isDisabled = false;
// ///// ----- add to cart under homepage script  example 1----- /////
addItem.forEach((itemId) => {
  itemId.addEventListener('click', async (e) => {
    e.preventDefault();

    if (isDisabled) {
      return; // If disabled, do nothing
    }

    isDisabled = true;
    /////----- Get the ID ----- /////
    let productId = itemId.getAttribute('product_id');
    let container = itemId.closest('.single-product-wrap');
    let name = container.querySelector('.product_names').getAttribute('id');
    let image = container.querySelector('.product-image').getAttribute('id');
    let price = container.querySelector('.price-box').getAttribute('id');
    let qty_avail = container.querySelector('.new-price').getAttribute('id');
    let qty_available = Number(qty_avail);

    if (qty_available < 1) {
      const iTag = document.createElement('i');
      iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

      itemId.replaceWith(iTag);

      setTimeout(() => {
        iTag.replaceWith(itemId);

        isDisabled = false;
      }, 4000);
      return;
    }

    const data = {
      id: productId,
      Product_TableId: productId,
      image: image,
      name: name,
      price: price,
    };

    ///// ----- Send the data to server to add it to the cart ---- /////
    try {
      let response = await axios.post('/api/v1/add-item-to-cart', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      let status = response.data.status;

      if (status === 201) {
        //// get the value of the cartlength and update
        let cart_length = document.querySelector('.cart-item-count');

        let newLength = response.data.message.cart_length;

        cart_length.textContent = newLength;

        // Create a new <i> element with the desired FontAwesome class
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        // addedToCart.textContent = 'Cart item created';
        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 4000);
      } else if (status === 200) {
        // Create a new <i> element with the desired FontAwesome class
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        // addedToCart.textContent = 'Cart item created';
        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 4000);
      } else if (response.status === 201) {
        //// get the value of the cartlength and update
        let cart_length = document.querySelector('.cart-item-count');

        let newLength = response.data.cartLength;

        cart_length.textContent = newLength;

        // Create a new <i> element with the desired FontAwesome class
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        // addedToCart.textContent = 'Cart item created';
        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 3000);
      } else {
        // Create a new <i> element with the desired FontAwesome class
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        // addedToCart.textContent = 'Cart item created';
        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data.status);

      let status = err.response.data.status;
      let message = err.response.data.message;
      let errMsg1 = 'This product is currently not available';
      let errMsg3 = 'Error adding a Cart ';
      let errMsg4 = 'This product is not found';

      if (status === 400 && message === errMsg1) {
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 3000);
        return;
      } else if (status === 404 && message === errMsg4) {
        location.assign('/error-page');
      } else if (status === 404 && message === errMsg3) {
        location.assign('/error-page');
      } else {
        location.assign('/error-page');
      }
    }
  });
});

///// ----- add to Wishlist under homepage script ----- /////
addWishList.forEach((list) => {
  list.addEventListener('click', async (e) => {
    e.preventDefault();

    if (isDisabled) {
      return;
    }

    /////----- Get the ID ----- /////
    let productId = list.getAttribute('prod_id');

    isDisable = true;
    /// --- Send data to server ---- ////
    let data = { product_TableId: productId };

    ///// ----- Send the id to server to add it to the cart ---- /////
    try {
      let response = await axios.post('/api/v1/add-item-to-wishlist', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let authorized = response.data;

      if (authorized.status == 201) {
        ///// ---- Create a new HTML TAG ----- /////
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        list.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(list);

          isDisable = false;
        }, 4000);
      } else if (authorized.status == 200) {
        ///// ---- Create a new HTML TAG ----- /////
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        list.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(list);

          isDisable = false;
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data.status);
      let status = err.response.data.status;
      let message = err.response.data.message;
      let errMsg1 = 'This product is currently not available';
      let errMsg3 = 'Error adding a wishlist ';
      let errMsg4 = 'This product is not found';

      console.log(err.response.data, status, message);

      if (status === 404 && message === 'invalid login token') {
        location.assign('/login');
      } else if (status === 400 && message === errMsg1) {
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

        list.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(list);

          isDisable = false;
        }, 4000);
        return;
      } else if (status === 404 && message === errMsg4) {
        location.assign('/error-page');
      } else if (status === 404 && message === errMsg3) {
        location.assign('/error-page');
      } else {
        location.assign('/error-page');
      }
    }
  });
});

///// ----- add to Cart under homepage preview page script ----- /////
addCartItem.forEach((item) => {
  item.addEventListener('click', async (e) => {
    e.preventDefault();

    if (isDisabled) {
      return; // If disabled, do nothing
    }

    isDisabled = true;
    /////----- Get the ID and values ----- /////
    let productId = item.getAttribute('ProductId');
    let container = item.closest('.modal-inner-area');
    let name = container.querySelector('.product_names').getAttribute('id');
    let image = container.querySelector('.lg-image').getAttribute('id');
    let price = container.querySelector('.price-box').getAttribute('id');
    let qty = item.closest('form').querySelector('.cart-plus-minus-box').value;
    let qty_avail = container.querySelector('.qty_avail').getAttribute('id');
    let qty_available = Number(qty_avail);

    //Validate User custInput for number only
    function validateqty(qty) {
      const regex = /^[0-9]+$/;
      return regex.test(qty);
    }

    if (validateqty(qty)) {
      // The input contains only number
    } else {
      // The input contains alphabet characters
      let errMsg = document.createElement('div');
      errMsg.classList.add('error-message');
      errMsg.style.color = 'red';
      errMsg.textContent = 'Not allowed, use a valid number';
      item.closest('form').appendChild(errMsg);
      setTimeout(() => {
        // Reset the form
        item.closest('form').reset();
        errMsg.textContent = '';

        isDisabled = false;
      }, 5000);
      return;
    }

    let quantity = Number(qty);

    if (quantity === 0) {
      let errMsg = document.createElement('div');
      errMsg.classList.add('error-message');
      errMsg.style.color = 'red';
      item.closest('form').appendChild(errMsg);

      errMsg.textContent =
        'Quantity cannot be zero (0). Kindly select/enter quantity ';

      //// Reset the form ////
      item.closest('form').reset();

      setTimeout(() => {
        errMsg.textContent = '';

        isDisabled = false;
      }, 5000);
      return;
    } else if (qty_available < 1) {
      ///// create a new div /////
      let errMsg = document.createElement('div');
      errMsg.classList.add('error-message');
      errMsg.style.color = 'red';
      item.closest('form').appendChild(errMsg);

      errMsg.textContent = 'This product is currently not available';

      // Reset the form
      item.closest('form').reset();
      setTimeout(() => {
        errMsg.textContent = '';

        isDisabled = false;
      }, 5000);
      return;
    } else if (quantity > qty_available) {
      let errMsg = document.createElement('div');
      errMsg.classList.add('error-message');
      errMsg.style.color = 'red';
      item.closest('form').appendChild(errMsg);
      errMsg.textContent =
        'Quantity entered is greater than available quantities';

      // Reset the form
      item.closest('form').reset();

      setTimeout(() => {
        errMsg.textContent = '';

        isDisabled = false;
      }, 5000);
      return;
    }

    ////----- Get the ID ----- /////
    let data = {
      id: productId,
      Product_TableId: productId,
      image: image,
      name: name,
      price: price,
      quantity: quantity,
    };

    //// ----- Send the id to server to add it to the cart ---- /////
    try {
      let response = await axios.post('/api/v1/addQtyCart', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let status = response.data.status;

      if (status === 201) {
        //// get the value of the cartlength and update
        let cart_length = item
          .closest('body')
          .querySelector('.cart-item-count');

        let newLength = response.data.message.cart_length;

        cart_length.textContent = newLength;

        // Reset the form
        item.closest('form').reset();
        // Create a new <i> element with the desired FontAwesome class
        let successMsg = document.createElement('i');
        successMsg.className = 'fa-solid fa-check fa-beat-fade fa-2xl';
        item.replaceWith(successMsg);

        setTimeout(() => {
          successMsg.replaceWith(item);

          isDisabled = false;
        }, 3000);
      } else if (status === 200) {
        // Reset the form
        item.closest('form').reset();
        // Create a new <i> element with the desired FontAwesome class
        let successMsg = document.createElement('i');
        successMsg.className = 'fa-solid fa-check fa-beat-fade fa-2xl';
        item.replaceWith(successMsg);

        setTimeout(() => {
          successMsg.replaceWith(item);

          isDisabled = false;
        }, 3000);
      } else if (response.status === 201) {
        //// get the value of the cartlength and update
        let cart_length = document.querySelector('.cart-item-count');

        let newLength = response.data.cartLength;

        cart_length.textContent = newLength;

        // Reset the form
        item.closest('form').reset();
        // Create a new <i> element with the desired FontAwesome class
        let successMsg = document.createElement('i');
        successMsg.className = 'fa-solid fa-check fa-beat-fade fa-2xl';
        item.replaceWith(successMsg);

        setTimeout(() => {
          successMsg.replaceWith(item);

          isDisabled = false;
        }, 3000);
      } else {
        // Reset the form
        item.closest('form').reset();
        // Create a new <i> element with the desired FontAwesome class
        let successMsg = document.createElement('i');
        successMsg.className = 'fa-solid fa-check fa-beat-fade fa-2xl';
        item.replaceWith(successMsg);

        setTimeout(() => {
          successMsg.replaceWith(item);

          isDisabled = false;
        }, 3000);
      }
    } catch (err) {
      console.log(err.response.data);
      let status = err.response.data.status;
      let message = err.response.data.message;

      if (status === 404 && message) {
        let errMsg = document.createElement('div');
        errMsg.classList.add('error-message');
        errMsg.style.color = 'red';
        item.closest('form').appendChild(errMsg);

        errMsg.textContent = message;

        // Reset the form
        item.closest('form').reset();

        setTimeout(() => {
          errMsg.textContent = '';

          isDisabled = false;
        }, 5000);

        return;
      } else if (status === 404 && message) {
        let errMsg = document.createElement('div');
        errMsg.classList.add('error-message');
        errMsg.style.color = 'red';
        item.closest('form').appendChild(errMsg);
        errMsg.textContent = message;

        // Reset the form
        item.closest('form').reset();

        setTimeout(() => {
          errMsg.textContent = '';

          isDisabled = false;
        }, 5000);
        return;
      } else if (status === 400 && message) {
        location.assign('/error-page');
      } else {
        location.assign('/error-page');
      }
    }
  });
});
