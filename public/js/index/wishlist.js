let addItem = document.querySelectorAll('.addToCart');

let isDisable = false;

///// ----- Script to add to cart under wishlist ----- /////
addItem.forEach((item) => {
  item.addEventListener('click', async (e) => {
    e.preventDefault();

    if (isDisable) {
      return;
    }

    /////----- Get the ID ----- /////
    let productId = item.getAttribute('id');

    isDisable = true;

    /////Send data to server
    let data = { Product_TableId: productId };

    ///// ----- Send the id to server to add it to the cart ---- /////
    try {
      let response = await axios.post('/api/v1/add-item-to-cart', data, {
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

        // Create a new <i> element with the desired FontAwesome class
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        item.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(item);

          isDisable = false;
        }, 3000);
      } else if (status === 200) {
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        item.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(item);

          isDisable = false;
        }, 3000);
      }
    } catch (err) {
      console.log(err.response.data);

      let status = err.response.data.status;
      let message = err.response.data.message;
      let errMsg1 = 'This product is currently not available';
      let errMsg3 = 'Error adding a wishlist ';
      let errMsg4 = 'This product is not found';

      if (status === 404 && message === 'invalid login token') {
        location.assign('/login');
      } else if (status === 400 && message === errMsg1) {
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

        item.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(item);

          isDisable = false;
        }, 3000);
        return;
      } else if (status === 400 && message === errMsg4) {
        location.assign('/error-page');
      } else if (status === 400 && message === errMsg3) {
        location.assign('/error-page');
      } else {
        location.assign('/error-page');
      }
    }
  });
});
