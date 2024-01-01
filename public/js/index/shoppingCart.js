let addressError = document.querySelector('.addressError');
let cartMsg = document.querySelector('.cartMsg');

document.addEventListener('DOMContentLoaded', function () {
  // Select the decrease and increase buttons using their class names
  const decreaseButtons = document.querySelectorAll('.dec.qtybutton');
  const increaseButtons = document.querySelectorAll('.inc.qtybutton');

  // Define functions to handle decrease and increase events
  async function handleDecrease(event) {
    // Get the current quantity value
    const qtyValue = event.target.parentElement.parentElement.querySelector(
      '.cart-plus-minus-box'
    );

    let currentQuantity = parseInt(qtyValue.value);
    let qty = Number(currentQuantity);

    let container =
      event.target.parentElement.parentElement.parentElement.parentElement;
    console.log(container);

    let image = container
      .querySelector('.li-product-thumbnail')
      .getAttribute('id');
    let id = container.querySelector('.itemMsg').getAttribute('id');
    let productId = container.querySelector('.quantity').getAttribute('id');
    let name = container.querySelector('.li-product-name').getAttribute('id');
    let price = container.querySelector('.li-product-price').getAttribute('id');
    let subtotal = container.querySelector('.product-subtotal');
    let column_Sum = document.querySelector('.total_Sum');
    let totalSum = document.querySelector('.totalSum');

    //// delete the product from the cart at less than 1 ////
    if (qty <= 0) {
      location.assign(`/delete-product/${id}`);
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
      let response = await axios.post('/api/v1/reduce_cartQty', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let status = response.data.status;

      if (status === 200) {
        let actual_total = qty * price;

        subtotal.textContent = actual_total;

        /////Get the colume_sum and updated the total bill payable
        let container_sum = container.parentElement;

        let get_columnSum = container_sum.querySelectorAll('.product-subtotal');

        let paralleTotal = [];

        Array.from(get_columnSum).forEach((column_sum) => {
          let get_Sum = Number(column_sum.textContent);
          paralleTotal.push(get_Sum);
        });

        ///// ----- Sum all the column together ----- /////
        function sumArray(paralleTotal) {
          let sum = 0;
          for (let i = 0; i < paralleTotal.length; i++) {
            if (typeof paralleTotal[i] === 'number') {
              sum += paralleTotal[i];
            }
          }
          return sum;
        }

        let columnSum = sumArray(paralleTotal);

        column_Sum.textContent = `₦ ${columnSum}`;
        totalSum.textContent = `₦ ${columnSum} `;
      } else if (response.status === 200) {
        let actual_total = qty * price;

        subtotal.textContent = actual_total;

        /////Get the colume_sum and updated the total bill payable
        let container_sum = container.parentElement;

        let get_columnSum = container_sum.querySelectorAll('.product-subtotal');

        let paralleTotal = [];

        Array.from(get_columnSum).forEach((column_sum) => {
          let get_Sum = Number(column_sum.textContent);
          paralleTotal.push(get_Sum);
        });

        ///// ----- Sum all the column together ----- /////
        function sumArray(paralleTotal) {
          let sum = 0;
          for (let i = 0; i < paralleTotal.length; i++) {
            if (typeof paralleTotal[i] === 'number') {
              sum += paralleTotal[i];
            }
          }
          return sum;
        }

        let columnSum = sumArray(paralleTotal);

        column_Sum.textContent = `₦ ${columnSum}`;
        totalSum.textContent = `₦ ${columnSum} `;
      }
    } catch (err) {
      let cartMsg = container.querySelector('.itemMsg');
      cartMsg.textContent = '';

      let status = err.response.data.status;
      let message = err.response.data.message;

      if (
        status === 400 &&
        message === 'This product is currently not available'
      ) {
        cartMsg.textContent = 'product is not available';

        setTimeout(() => {
          cartMsg.textContent = '';

          qtyValue.value = qty + 1;
        }, 4000);

        ///// ---- for authorize users ----- /////
        ///// ---- Let get product by ID and delete ----- /////
        location.assign(`/delete-product/${id}`);
      } else {
        location.assign('/error-page');
        return;
      }
    }
  }

  async function handleIncrease(event) {
    // Get the current quantity value
    const qtyValue = event.target.parentElement.parentElement.querySelector(
      '.cart-plus-minus-box'
    );

    let currentQuantity = parseInt(qtyValue.value);
    let qty = Number(currentQuantity);

    let container =
      event.target.parentElement.parentElement.parentElement.parentElement;
    console.log(container);

    let image = container
      .querySelector('.li-product-thumbnail')
      .getAttribute('id');
    let id = container.querySelector('.itemMsg').getAttribute('id');
    let productId = container.querySelector('.quantity').getAttribute('id');
    let name = container.querySelector('.li-product-name').getAttribute('id');
    let price = container.querySelector('.li-product-price').getAttribute('id');
    let subtotal = container.querySelector('.product-subtotal');
    let column_Sum = document.querySelector('.total_Sum');
    let totalSum = document.querySelector('.totalSum');

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

      let status = response.data.status;

      if (status === 200) {
        let actual_total = qty * price;

        subtotal.textContent = actual_total;

        /////Get the colume_sum and updated the total bill payable
        let container_sum = container.parentElement;

        let get_columnSum = container_sum.querySelectorAll('.product-subtotal');

        let paralleTotal = [];

        Array.from(get_columnSum).forEach((column_sum) => {
          let get_Sum = Number(column_sum.textContent);
          paralleTotal.push(get_Sum);
        });

        ///// ----- Sum all the column together ----- /////
        function sumArray(paralleTotal) {
          let sum = 0;
          for (let i = 0; i < paralleTotal.length; i++) {
            if (typeof paralleTotal[i] === 'number') {
              sum += paralleTotal[i];
            }
          }
          return sum;
        }

        let columnSum = sumArray(paralleTotal);

        column_Sum.textContent = `₦ ${columnSum}`;
        totalSum.textContent = `₦ ${columnSum} `;
      } else if (response.status === 200) {
        let actual_total = qty * price;

        subtotal.textContent = actual_total;

        /////Get the colume_sum and updated the total bill payable
        let container_sum = container.parentElement;

        let get_columnSum = container_sum.querySelectorAll('.product-subtotal');

        let paralleTotal = [];

        Array.from(get_columnSum).forEach((column_sum) => {
          let get_Sum = Number(column_sum.textContent);
          paralleTotal.push(get_Sum);
        });

        ///// ----- Sum all the column together ----- /////
        function sumArray(paralleTotal) {
          let sum = 0;
          for (let i = 0; i < paralleTotal.length; i++) {
            if (typeof paralleTotal[i] === 'number') {
              sum += paralleTotal[i];
            }
          }
          return sum;
        }

        let columnSum = sumArray(paralleTotal);

        column_Sum.textContent = `₦ ${columnSum}`;
        totalSum.textContent = `₦ ${columnSum} `;
      }
    } catch (err) {
      let cartMsg = container.querySelector('.itemMsg');
      cartMsg.textContent = '';

      let status = err.response.data.status;
      let message = err.response.data.message;

      if (
        status === 400 &&
        message === 'This product is currently not available'
      ) {
        cartMsg.textContent = 'product is not available';

        setTimeout(() => {
          cartMsg.textContent = '';

          qtyValue.value = qty - 1;
        }, 4000);

        ///// ---- Let get product by ID and delete ----- /////
        location.assign(`/delete-product/${id}`);
      } else {
        location.assign('/error-page');
        return;
      }
    }
  }

  // Add event listeners to decrease and increase buttons
  decreaseButtons.forEach((button) =>
    button.addEventListener('click', handleDecrease)
  );

  increaseButtons.forEach((button) =>
    button.addEventListener('click', handleIncrease)
  );
});

///// -----example 1 to clear this later ----- /////
// ///// ----- TO get the state selected and display the corresponding LGA ---- /////
// document.addEventListener('DOMContentLoaded', function () {
//   // Initialize the NiceSelect plugin on your select element
//   $('#mySelect').niceSelect();

//   let cartMsg = document.querySelector('.cartMsg');

//   // Add an event listener for the "change" event
//   $('#mySelect').on('change', async function () {
//     // Get the selected value
//     var selectedValue = $(this).val();

//     let data = { state: selectedValue };

//     if (data.state == 'Select') {
//       return;
//     }

//     try {
//       let response = await axios.get(`/api/v1/chosen-state/${data.state}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       // console.log(response.data.getAll);
//       let stateList = response.data.message;

//       const selectedLGA = $('#selectedLGA');

//       // Clear existing options (if any)
//       selectedLGA.empty();

//       // Iterate through the data and append options
//       stateList.forEach((list) => {
//         const option = $('<option></option>')
//           .attr('value', list.id)
//           .text(list.lga);
//         selectedLGA.append(option);
//       });

//       // Initialize the nice-select plugin
//       selectedLGA.niceSelect('update');

//       cartMsg.textContent = 'Delivery fee is yet to be included';
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   });
// });

// ///// ----- TO proceed from cart to Order to clear this later ---- /////
// document.addEventListener('DOMContentLoaded', function () {
//   // Initialize the NiceSelect plugin on your select element
//   $('#selectedLGA').niceSelect();

//   let cartMsg = document.querySelector('.cartMsg');

//   // Add an event listener for the "change" event
//   $('#checkout').on('click', async function (e) {
//     e.preventDefault();
//     // Get the selected value

//     addressError.textContent = ' ';

//     let address_Id = document.querySelector('#deliveryAddress');
//     let location_Id = document.querySelector('#selectElement');
//     let productQty = document.querySelector('#productQty');

//     let address = address_Id.value.trim();
//     let locationId = location_Id.value;

//     if (productQty === null) {
//       cartMsg.textContent = 'Shopping cart cannot be empty';
//       return;
//     } else if (!address || !locationId) {
//       addressError.textContent = 'Kindly enter all required field';
//       return;
//     } else if (address == '') {
//       addressError.textContent = 'Kindly enter your delivery address';
//       return;
//     }

//     //// let validate user input inside thhe address column /////
//     //Validate User Address for non-alphabet
//     function validateAddress(address) {
//       const regex = /^[0-9A-Za-z\s\.,#-]+$/;
//       return regex.test(address);
//     }

//     if (validateAddress(address)) {
//       // The input contains only alphabet letters
//     } else {
//       // The input contains non-alphabet characters
//       addressError.textContent = 'Kindly enter a valid delivery address';
//       return;
//     }

//     let data = {
//       locationId: locationId,
//       address: address,
//     };

//     ///// --- Send data to the server --- /////
//     try {
//       let response = await axios.post('/api/v1/checkout-cart', data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       let status = response.data.status;

//       if (status === 201) {
//         location.assign('/checkout');
//       }
//     } catch (err) {
//       console.log(err.response);
//       let errStatus = err.response.data.status;
//       let errMgs = err.response.data.message;
//       console.log(errStatus, errMgs);

//       if (errMgs === 'Error adding a Order ') {
//         cartError.textContent =
//           'An error has occurred, kindly check your network & try again';
//         return;
//       } else if (errStatus === 400) {
//         location.assign('/error-page');
//       } else {
//         location.assign('/error-page');
//       }
//     }
//   });
// });

///// -----example 2 ----- /////
// ///// ----- TO get the state selected and display the corresponding LGA ---- /////
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the NiceSelect plugin on your select element
  $('#mySelect').niceSelect();

  let optMsg = document.querySelector('.addressError');
  let cartMsg = document.querySelector('.cartMsg');

  // Add an event listener for the "change" event
  $('#mySelect').on('change', async function () {
    let productQty = document.querySelector('.columnSum');

    // Get the selected value
    var selectedValue = $(this).val();

    let data = { state: selectedValue };

    if (data.state == 'Select') {
      return;
    }

    try {
      let response = await axios.get(`/api/v1/chosen-state/${data.state}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let stateList = response.data.message;

      const selectedLGA = $('#selectedLGA');

      // Clear existing options (if any)
      selectedLGA.empty();

      // Iterate through the data and append options
      stateList.forEach((list) => {
        const option = $('<option></option>')
          .attr('value', list.id)
          .text(list.lga);
        selectedLGA.append(option);
      });

      // Initialize the nice-select plugin
      selectedLGA.niceSelect('update');

      optMsg.textContent = 'click on your LGA to display the payment breakdown';

      cartMsg.textContent = 'delivery fee is yet to be included';
    } catch (err) {
      console.log(err.response.data);
    }
  });
});

///// ----- TO proceed from cart to Order ---- /////

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the NiceSelect plugin on your select element
  $('#selectedLGA').niceSelect();

  let optMsg = document.querySelector('.addressError');

  // Add an event listener for the "change" event
  $('#selectedLGA').on('change', async function (e) {
    e.preventDefault();

    optMsg.textContent = ' ';

    // Get the selected value
    let location_Id = document.querySelector('#selectedLGA');

    let locationId = location_Id.value;

    // ///// --- Send data to the server --- /////
    try {
      let response = await axios.get('/api/v1/get_delivery', {
        params: {
          locationId: `${locationId}`,
        },
      });

      let data = response.data.message;

      /////----- To clear the HTML code before inserting new one ---- /////
      $('#cart-page').empty();

      var newHTML =
        '<h2>Payment details</h2>' +
        '<ul>' +
        '<li class="sub_total" id="' +
        data.sub_total +
        '">Sub total<span>₦ ' +
        data.sub_total +
        '</span></li>' +
        '<li class="total_shippingFee" id="' +
        data.total_shippingFee +
        '">Shipping fee<span>₦ ' +
        data.total_shippingFee +
        '</span></li>' +
        '<li class="grand_total" id="' +
        data.grandTotal +
        '">Grand total<span>₦ ' +
        data.grandTotal +
        '</span></li>' +
        '</ul>' +
        '<div class="cartMsg" style="color: #f71111;"><h5></h5></div>' +
        '<button type="button" id="checkout">Proceed to checkout</button>';
      // Replace the content of the "container" with the new HTML
      $('#cart-page').html(newHTML);

      ///// ----- To disable the click button ----- /////
      let clickDisable = false;

      ///// ----- Adding event on click delegation to the button ----- /////
      $('#checkout').on('click', async function (e) {
        e.preventDefault();

        addressError.textContent = ' ';

        if (clickDisable) {
          console.log(clickDisable);
          return;
        }

        clickDisable = true;

        let address = document.querySelector('#deliveryAddress').value.trim();
        let locationId = document.querySelector('#selectedLGA').value;
        let sub_totals = document.querySelector('.sub_total');
        let total_shippingFees = document.querySelector('.total_shippingFee');
        let grand_totals = document.querySelector('.grand_total');

        let sub_total = sub_totals.getAttribute('id');
        let total_shippingFee = total_shippingFees.getAttribute('id');
        let grand_total = grand_totals.getAttribute('id');

        if (!address) {
          addressError.textContent = 'Kindly enter your delivery address';

          clickDisable = false;
          return;
        }

        //// let validate user input inside thhe address column /////
        //Validate User Address for non-alphabet
        function validateAddress(address) {
          const regex = /^[0-9A-Za-z\s\.,#-]+$/;
          return regex.test(address);
        }

        if (validateAddress(address)) {
          // The input contains only alphabet letters
        } else {
          // The input contains non-alphabet characters
          addressError.textContent = 'Kindly enter a valid delivery address';

          clickDisable = false;
          return;
        }

        let data = {
          sub_total: sub_total,
          total_shippingFee: total_shippingFee,
          grand_total: grand_total,
          locationId: locationId,
          address: address,
        };

        ///// --- Send data to the server --- /////
        try {
          let response = await axios.post('/api/v1/checkout_cart', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          let status = response.data.status;

          if (status === 201) {
            location.assign('/checkout');
          }
        } catch (err) {
          console.log(err.response);
          let errStatus = err.response.data.status;
          let errMgs = err.response.data.message;
          console.log(errStatus, errMgs);

          if (errMgs === 'Error adding a Order ') {
            cartError.textContent =
              'An error has occurred, kindly check your network & try again';

            clickDisable = false;
            return;
          } else if (errStatus === 400) {
            clickDisable = true;
            location.assign('/error-page');
          } else {
            clickDisable = true;
            location.assign('/error-page');
          }
        }
      });
    } catch (err) {
      console.log(err);

      let errStatus = err.config.message;
      let errMgs = err.response.data.message;
      let status = err.response.data.message.status;
      let errMgs2 = err.response.data.message.message;
      let errMgs1 = 'Cart cannot be empty';

      if (errMgs === 'invalid login token') {
        location.assign('/login');
      } else if (errStatus && errMgs === 'Error adding a Order ') {
        let cartMsg = document.querySelector('.cartMsg');

        cartMsg.textContent = errMgs;

        clickDisable = false;
        return;
      } else if (status === 404 && errMgs1 === errMgs2) {
        let cartMsg = document.querySelector('.cartMsg');

        cartMsg.textContent = errMgs2;

        clickDisable = false;
        return;
      } else {
        location.assign('/error-page');
      }
    }
  });
});
