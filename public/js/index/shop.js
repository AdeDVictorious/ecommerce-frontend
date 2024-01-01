let addItem = document.querySelectorAll('.addTocart');
let addWishList = document.querySelectorAll('.addToWishList');
let addCartItem = document.querySelectorAll('.add-to-cart');
let formdata = document.querySelector('.cart-quantity');

// ///// ----- add to cart under homepage script ----- /////
/// To disable the button and enable it after a server responses /////
let isDisabled = false;

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

        // addedToCart.textContent = 'Cart item created';
        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 3000);
      } else if (status === 200) {
        // Create a new <i> element with the desired FontAwesome class
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        // addedToCart.textContent = 'Cart item created';
        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 3000);
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

        itemId.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(itemId);

          isDisabled = false;
        }, 3000);
      }
    } catch (err) {
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
/// To disable the button and enable it after a server responses /////
let itemClickDisabled = false;

addWishList.forEach((list) => {
  list.addEventListener('click', async (e) => {
    e.preventDefault();

    if (itemClickDisabled) {
      return;
    }

    itemClickDisabled = true;

    /////----- Get the ID ----- /////
    let productId = list.getAttribute('prod_id');

    /// --- Send data to server ---- ////
    let data = { product_TableId: productId };

    ///// ----- Send the id to server to add it to the cart ---- /////
    try {
      let response = await axios.post('/api/v1/add-item-to-wishlist', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let status = response.data.status;

      if (status == 201) {
        ///// ---- Create a new HTML TAG ----- /////
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        list.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(list);

          itemClickDisabled = false;
        }, 3000);
      } else if (status == 200) {
        ///// ---- Create a new HTML TAG ----- /////
        const iTag = document.createElement('i');
        iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

        list.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(list);

          itemClickDisabled = false;
        }, 4000);
      }
    } catch (err) {
      console.log(err);
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

        list.replaceWith(iTag);

        setTimeout(() => {
          iTag.replaceWith(list);

          itemClickDisabled = false;
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

///// ----- add to Cart under shop preview page ----- /////
/// To disable the button and enable it after a server responses /////
let isDisable = false;

addCartItem.forEach((item) => {
  item.addEventListener('click', async (e) => {
    e.preventDefault();

    if (isDisable) {
      return;
    }

    isDisable = true;
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

        isDisable = false;
      }, 3000);
      return;
    }

    let quantity = Number(qty);

    if (quantity === 0) {
      let errMsg = document.createElement('div');
      errMsg.classList.add('error-message');
      errMsg.style.color = 'red';
      errMsg.textContent =
        'Quantity cannot be zero (0). Kindly select/enter quantity ';
      item.closest('form').appendChild(errMsg);
      setTimeout(() => {
        // Reset the form
        item.closest('form').reset();
        errMsg.textContent = '';

        isDisable = false;
      }, 4000);
      return;
    } else if (qty_available < 1) {
      let errMsg = document.createElement('div');
      errMsg.classList.add('error-message');
      errMsg.style.color = 'red';
      item.closest('form').appendChild(errMsg);

      errMsg.textContent = 'This product is currently not available';
      setTimeout(() => {
        // Reset the form
        item.closest('form').reset();
        errMsg.textContent = '';

        isDisable = false;
      }, 4000);
      return;
    } else if (quantity > qty_available) {
      let errMsg = document.createElement('div');
      errMsg.classList.add('error-message');
      errMsg.style.color = 'red';
      errMsg.textContent =
        'Quantity entered is greater than available quantities';
      item.closest('form').appendChild(errMsg);
      setTimeout(() => {
        // Reset the form
        item.closest('form').reset();
        errMsg.textContent = '';

        isDisable = false;
      }, 4000);
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

    // //// ----- Send the id to server to add it to the cart ---- /////
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

          isDisable = false;
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

          isDisable = false;
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

          isDisable = false;
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

          isDisable = false;
        }, 3000);
      }
    } catch (err) {
      console.log(err.response.data);
      let status = err.response.data.status;
      let message = err.response.data.message;

      if (status === 404 && message) {
        //// create a new div
        let errMsg = document.createElement('div');
        errMsg.classList.add('error-message');
        errMsg.style.color = 'red';
        errMsg.textContent = message;
        item.closest('form').appendChild(errMsg);
        setTimeout(() => {
          errMsg.textContent = '';
          // Reset the form
          item.closest('form').reset();

          isDisable = false;
        }, 3000);

        return;
      } else if (status === 400 && message) {
        location.assign('/error-page');
      } else {
        location.assign('/error-page');
      }
    }
  });
});

let currentPage = 0;
let isLoading = false;

///// ----- Pagination using windows scrolling method ----- /////
window.addEventListener('scroll', async (e) => {
  e.preventDefault();

  if (isLoading) {
    // If a request is already in progress, do nothing
    return;
  }

  try {
    // Get the current scroll position
    const scrollTop = window.scrollY;

    // Get the height of the page
    const pageHeight = document.documentElement.scrollHeight;

    // Calculate the percentage of the page that has been scrolled
    const scrollPercentage = scrollTop / pageHeight;

    // Check if the user has scrolled to the desired height
    if (scrollPercentage >= 0.5) {
      isLoading = true;

      currentPage++;

      ///// ----- All shopping/Product items ----- /////
      let response = await axios.get('/api/v1/shoppingGoods', {
        params: {
          page: `${currentPage}`,
        },
      });

      let productItem = response.data.data.data.rows;
      let totalPage = response.data.data.totalPage;

      //// ----- Grid views data  ----- /////
      const parentGridview = document.querySelector('#product-container');

      let gridviews = [];

      for (let item of productItem) {
        const gridview = document.createElement('div');

        gridview.className = 'col-lg-3 col-md-4 col-sm-6 mt-40';

        gridview.innerHTML += `
               <div class="single-product-wrap">
                 <div class="product-image" id="${item.image}">
                     <a href="/product-preview/${item.id}">
                         <img src="${item.image}" alt="${item.name}">
                     </a>
                 </div>
                 <div class="product_desc">
                     <div class="product_desc_info">
                         <div class="product-review">
                             <h5 class="manufacturer">
                                 <div style="color: black;">Quantities available</div>
                             </h5>
                             <div class="rating-box">
                                 <ul class="rating">
                                     <span class="new-price" id="${item.quantity}">${item.quantity}</span>
                                 </ul>
                             </div>
                         </div>
                         <h4 class="product_names" id="${item.name}"><a class="product_name" href="/product-preview/${item.id}">${item.name}</a></h4>
                         <div class="price-box" id="${item.price}">
                             <span class="new-price">₦ ${item.price}</span>
                         </div>
                     </div>

                     <div class="add-actions ">
                         <ul class="add-actions-link addedToCart">
                             <li class="add-cart active addtocart" product_id="${item.id}">Add to cart</li>
                             <li class="add-to-wishlist addtowishList" prod_id="${item.id}"><i class="fa fa-heart-o"></i></li>
                             <li><a class="quick-view" data-toggle="modal" data-target="#${item.id}"><i class="fa fa-eye"></i></a></li>
                         </ul>
                     </div>
                 </div>
             </div>
           `;
        gridviews.push(gridview);
      }

      ///// Append the new elements to the parent element /////
      gridviews.forEach((gridview, index) => {
        parentGridview.appendChild(gridview);

        ///// ---- To add to cart ----- //////
        const addCartBtns = gridview.querySelectorAll('.addtocart');

        //// This will disable the button for stop double btn trigger /////
        let clickDisabled = false;

        addCartBtns.forEach((addCartBtn) => {
          addCartBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (clickDisabled) {
              return;
            }

            clickDisabled = true;
            /////----- Get the ID ----- /////
            let productId = addCartBtn.getAttribute('product_id');
            let container = addCartBtn.closest('.single-product-wrap');
            let name = container
              .querySelector('.product_names')
              .getAttribute('id');
            let image = container
              .querySelector('.product-image')
              .getAttribute('id');
            let price = container
              .querySelector('.price-box')
              .getAttribute('id');
            let qty_avail = container
              .querySelector('.new-price')
              .getAttribute('id');

            let qty_available = Number(qty_avail);

            if (qty_available < 1) {
              const iTag = document.createElement('i');
              iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

              addCartBtn.replaceWith(iTag);

              setTimeout(() => {
                iTag.replaceWith(addCartBtn);

                clickDisabled = false;
              }, 3000);
              return;
            }

            const data = {
              id: productId,
              Product_TableId: productId,
              image: image,
              name: name,
              price: price,
            };

            ///// ----- Send the id to server to add it to the cart ---- /////
            try {
              let response = await axios.post(
                '/api/v1/add-item-to-cart',
                data,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              let status = response.data.status;

              if (status === 201) {
                //// get the value of the cartlength and update
                let cart_length = document.querySelector('.cart-item-count');

                let newLength = response.data.message.cart_length;

                cart_length.textContent = newLength;
                ///// create a new i tag /////
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisabled = false;
                }, 3000);
              } else if (status === 200) {
                // Create a new <i> element with the desired FontAwesome class
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisabled = false;
                }, 3000);
              } else if (response.status === 201) {
                //// get the value of the cartlength and update
                let cart_length = document.querySelector('.cart-item-count');

                let newLength = response.data.cartLength;

                cart_length.textContent = newLength;
                // Create a new <i> element with the desired FontAwesome class
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisabled = false;
                }, 4000);
              } else {
                // Create a new <i> element with the desired FontAwesome class
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisabled = false;
                }, 4000);
              }
            } catch (err) {
              console.log(err.response.data.status);
              let status = err.response.data.status;
              let message = err.response.data.message;
              let errMsg1 = 'This product is currently not available';
              let errMsg3 = 'Error adding a Cart ';
              let errMsg4 = 'This product is not found';

              if (status === 400 && message === errMsg1) {
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisabled = false;
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

        ///// ---- To add to wishlist ----- //////
        const addWishlistBtns = gridview.querySelectorAll('.addtowishList');

        //// This will disable the button for stop double btn trigger /////
        let clickDisable = false;

        addWishlistBtns.forEach((addWishlistBtn) => {
          addWishlistBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (clickDisable) {
              return;
            }

            clickDisable = true;
            /////----- Get the ID ----- /////
            let productId = addWishlistBtn.getAttribute('prod_id');

            /// --- Send data to server ---- ////
            let data = { product_TableId: productId };

            ///// ----- Send the id to server to add it to the cart ---- /////
            try {
              let response = await axios.post(
                '/api/v1/add-item-to-wishlist',
                data,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              console.log(response.data);
              let status = response.data.status;

              if (status === 201) {
                ///// ---- Create a new HTML i TAG ----- /////
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addWishlistBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addWishlistBtn);

                  clickDisable = false;
                }, 3000);
              } else if (status === 200) {
                ///// ---- Create a new HTML TAG ----- /////
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addWishlistBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addWishlistBtn);

                  clickDisable = false;
                }, 3000);
              }
            } catch (err) {
              console.log(err);
              console.log(err.response.data.status);
              let status = err.response.data.status;
              let message = err.response.data.message;

              let errMsg1 = 'Error adding a wishlist ';
              let errMsg2 = 'This product is not found';

              if (status === 404 && message === 'invalid login token') {
                location.assign('/login');
              } else if (status === 400 && message) {
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

                addWishlistBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addWishlistBtn);

                  clickDisable = false;
                }, 3000);
                return;
              } else if (status === 404 && message === errMsg1) {
                location.assign('/error-page');
              } else if (status === 404 && message === errMsg2) {
                location.assign('/error-page');
              } else {
                location.assign('/error-page');
              }
            }
          });
        });
      });

      // /////// ----- List views data ----- /////
      const parentListview = document.querySelector('.product-list-view');

      let listviews = [];

      for (let item of productItem) {
        let listview = document.createElement('div');

        listview.className = 'row';

        listview.innerHTML += `
                 <div class="col single-product-wrap">
                   <div class="row product-layout-list">
                     <div class="col-lg-3 col-md-5 ">
                       <div class="product-image" id="${item.image}">
                         <a href="/product-preview/${item.id}">
                           <img src="${item.image}" alt="${item.name}">
                         </a>
                       </div>
                     </div>
                     <div class="col-lg-5 col-md-7">
                       <div class="product_desc">
                         <div class="product_desc_info">
                           <div class="product-review">
                             <h5 class="manufacturer">
                               <div style="color: black;"> Quantities available</div>
                             </h5>
                             <div class="rating-box">
                               <ul class="rating">
                                 <span class="new-price" id="${item.quantity}">${item.quantity}</span>
                                </ul>
                             </div>
                           </div>
                           <h4 class="product_names" id="${item.name}"><a class="product_name" href="/product-preview/${item.id}">${item.name}</a></h4>
                           <div class="price-box" id="${item.price}">
                             <span class="new-price">₦ ${item.price}</span>
                           </div>
                            <p>${item.description}</p>
                         </div>
                       </div>
                     </div>
                     <div class="col-lg-4">
                       <div class="shop-add-action mb-xs-30">
                         <ul class="add-actions-link">
                           <li class="add-cart addtocart" product_id="${item.id}"> Add to cart</li>
                           <li class="wishlist addtoWishList" prod_id="${item.id}"><i class="fa fa-heart-o"></i> Add to wishlist</li>
                           <li><a class="quick-view" data-toggle="modal" data-target="#${item.id}" href="#"><i class="fa fa-eye"></i>Quick view</a></li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 </div>
               `;
        listviews.push(listview);
      }

      ///// Append the new elements to the parent element /////
      listviews.forEach((listview, index) => {
        parentListview.appendChild(listview);

        ///// ---- To add to cart ----- //////
        const addCartBtns = listview.querySelectorAll('.addtocart');

        //// This will disable the button for stop double btn trigger /////
        let clickDisallowed = false;

        addCartBtns.forEach((addCartBtn) => {
          addCartBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (clickDisallowed) {
              return;
            }

            clickDisallowed = true;
            /////----- Get the ID ----- /////
            let productId = addCartBtn.getAttribute('product_id');
            let container = addCartBtn.closest('.single-product-wrap');
            let name = container
              .querySelector('.product_names')
              .getAttribute('id');
            let image = container
              .querySelector('.product-image')
              .getAttribute('id');
            let price = container
              .querySelector('.price-box')
              .getAttribute('id');
            let qty_avail = container
              .querySelector('.new-price')
              .getAttribute('id');

            let qty_available = Number(qty_avail);

            if (qty_available < 1) {
              const iTag = document.createElement('i');
              iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

              addCartBtn.replaceWith(iTag);

              setTimeout(() => {
                iTag.replaceWith(addCartBtn);

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
            };

            ///// ----- Send the id to server to add it to the cart ---- /////
            try {
              let response = await axios.post(
                '/api/v1/add-item-to-cart',
                data,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              let status = response.data.status;

              if (status === 201) {
                //// get the value of the cartlength and update
                let cart_length = document.querySelector('.cart-item-count');

                let newLength = response.data.message.cart_length;

                cart_length.textContent = newLength;
                ///// create a new i tag /////
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisallowed = false;
                }, 3000);
              } else if (status === 200) {
                // Create a new <i> element with the desired FontAwesome class
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisallowed = false;
                }, 3000);
              } else if (response.status === 201) {
                //// get the value of the cartlength and update
                let cart_length = document.querySelector('.cart-item-count');

                let newLength = response.data.cartLength;

                cart_length.textContent = newLength;

                // Create a new <i> element with the desired FontAwesome class
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisallowed = false;
                }, 3000);
              } else {
                // Create a new <i> element with the desired FontAwesome class
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addCartBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addCartBtn);

                  clickDisallowed = false;
                }, 3000);
              }
            } catch (err) {
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

                  clickDisallowed = false;
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

        ///// ---- To add to wishlist ----- //////
        const addWishlistBtns = listview.querySelectorAll('.addtoWishList');

        let clickDisallow = false;

        addWishlistBtns.forEach((addWishlistBtn) => {
          addWishlistBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (clickDisallow) {
              return;
            }

            clickDisallow = true;
            /////----- Get the ID ----- /////
            let productId = addWishlistBtn.getAttribute('prod_id');

            /// --- Send data to server ---- ////
            let data = { product_TableId: productId };

            ///// ----- Send the id to server to add it to the cart ---- /////
            try {
              let response = await axios.post(
                '/api/v1/add-item-to-wishlist',
                data,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              let status = response.data.status;

              if (status === 201) {
                ///// ---- Create a new HTML TAG ----- /////
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addWishlistBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addWishlistBtn);

                  clickDisallow = false;
                }, 3000);
              } else if (status === 200) {
                ///// ---- Create a new i tag ----- /////
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-check fa-beat-fade fa-xl';

                addWishlistBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addWishlistBtn);

                  clickDisallow = false;
                }, 3000);
              }
            } catch (err) {
              console.log(err);
              let status = err.response.data.status;
              let message = err.response.data.message;
              let errMsg1 = 'Error adding a wishlist ';
              let errMsg2 = 'This product is not found';

              if (status === 404 && message === 'invalid login token') {
                location.assign('/login');
              } else if (status === 400 && message) {
                const iTag = document.createElement('i');
                iTag.className = 'fa-solid fa-pause fa-beat-fade fa-xl';

                addWishlistBtn.replaceWith(iTag);

                setTimeout(() => {
                  iTag.replaceWith(addWishlistBtn);

                  clickDisallow = false;
                }, 3000);
                return;
              } else if (status === 404 && message === errMsg1) {
                location.assign('/error-page');
              } else if (status === 404 && message === errMsg2) {
                location.assign('/error-page');
              } else {
                location.assign('/error-page');
              }
            }
          });
        });
      });

      /////// ----- Modal views data ----- /////
      const parentModal = document.querySelector('.modal-view');

      let modalviews = [];

      for (let item of productItem) {
        let modalview = document.createElement('div');

        modalview.innerHTML += `
                 <div class="modal fade modal-wrapper" id="${item.id}" >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body" singleView-id="" >
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div class="modal-inner-area row">
                                    <div class="col-lg-5 col-md-6 col-sm-6">
                                       <!-- Product Details Left -->
                                        <div class="product-details-left">
                                            <div class="product-details-images slider-navigation-1">
                                                <div class="lg-image" id="${item.image}">
                                                    <img class="viewImage" src="${item.image}" alt="${item.name}">
                                                </div>

                                            </div>

                                        </div>
                                        <!--// Product Details Left -->
                                    </div>

                                    <div class="col-lg-7 col-md-6 col-sm-6">
                                        <div class="product-details-view-content pt-60">
                                            <div class="product-info">
                                                <h2 class="product_names" id="${item.name}">${item.name}</h2>
                                                <span class="product-details-ref">size: ${item.bottleSize}</span>

                                                <div class="price-box pt-20" id="${item.price}">
                                                    <span class="new-price new-price-2">₦ ${item.price}  </span>
                                                </div>
                                                <div class="product-desc">
                                                    <p>
                                                        <span> ${item.description}</span>
                                                    </p>
                                                </div>
                                                <div class="product-variants">
                                                    <div class="produt-variants-size">
                                                        <label>Bottlesize: ${item.bottleSize} </label>
                                                        <label class="qty_avail" id=${item.quantity} >Quantities available: ${item.quantity} </label>
                                                    </div>
                                                </div>
                                                <div class="single-add-to-cart">
                                                    <form action="#" class="cart-quantity" >
                                                        <div class="quantity">
                                                            <label>Quantity</label>
                                                            <div class="cart-plus-minus">
                                                                <input class="cart-plus-minus-box" value="1" type="text" id="cart-plus-minus-box">
                                                                <div class="dec qtybutton"><i class="fa fa-angle-down" ></i></div>
                                                                <div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>
                                                            </div>
                                                        </div>
                                                        <button class="add-to-cart" ProductId="${item.id}" type="submit" id="addedToCart">Add to cart</button>

                                                    </form>
                                                </div>
                                                <div class="product-additional-info pt-25">
                                                    <a class="wishlist-btn" href="/wishlist"><i class="fa fa-heart-o"></i>Go to wishlist</a>
                                                    <div class="product-social-sharing pt-25">
                                                        <ul>
                                                            <li class="facebook"><a href="#"><i class="fa fa-facebook"></i>Facebook</a></li>
                                                            <li class="twitter"><a href="#"><i class="fa fa-twitter"></i>Twitter</a></li>
                                                            <li class="instagram"><a href="#"><i class="fa fa-instagram"></i>Instagram</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                 

              
          `;

        modalviews.push(modalview);
      }

      modalviews.forEach((modalview, index) => {
        parentModal.appendChild(modalview);

        const addCartBtns = modalview.querySelectorAll('#addedToCart');

        //// This will disable the button for stop double btn trigger /////
        let clicked = false;

        addCartBtns.forEach((item) => {
          item.addEventListener('click', async (e) => {
            e.preventDefault();

            if (clicked) {
              return;
            }

            clicked = true;
            // /////----- Get the ID ----- /////
            let productId = item.getAttribute('ProductId');
            let container = item.closest('.modal-inner-area');
            let name = container
              .querySelector('.product_names')
              .getAttribute('id');
            let image = container.querySelector('.lg-image').getAttribute('id');
            let qty_avail = container
              .querySelector('.qty_avail')
              .getAttribute('id');
            let price = container
              .querySelector('.price-box')
              .getAttribute('id');

            let qty = item
              .closest('form')
              .querySelector('#cart-plus-minus-box').value;

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
              errMsg.textContent = 'Only numbers is allowed';
              item.closest('form').appendChild(errMsg);
              setTimeout(() => {
                // Reset the form
                item.closest('form').reset();
                errMsg.textContent = '';

                clicked = false;
              }, 3000);
              return;
            }

            let quantity = Number(qty);
            let qty_available = Number(qty_avail);

            if (quantity === 0) {
              let errMsg = document.createElement('div');
              errMsg.classList.add('error-message');
              errMsg.style.color = 'red';
              errMsg.textContent =
                'Quantity cannot be zero (0). Kindly select/enter quantity ';
              item.closest('form').appendChild(errMsg);
              setTimeout(() => {
                // Reset the form
                item.closest('form').reset();
                errMsg.textContent = '';

                clicked = false;
              }, 3000);
              return;
            } else if (qty_available < 1) {
              let errMsg = document.createElement('div');
              errMsg.classList.add('error-message');
              errMsg.style.color = 'red';
              errMsg.textContent = 'This product is cureently not available';
              item.closest('form').appendChild(errMsg);
              setTimeout(() => {
                // Reset the form
                item.closest('form').reset();
                errMsg.textContent = '';

                clicked = false;
              }, 3000);
              return;
            } else if (quantity > qty_available) {
              let errMsg = document.createElement('div');
              errMsg.classList.add('error-message');
              errMsg.style.color = 'red';
              errMsg.textContent =
                'Quantity enter is greater than available quantities';
              item.closest('form').appendChild(errMsg);
              setTimeout(() => {
                // Reset the form
                item.closest('form').reset();
                errMsg.textContent = '';

                clicked = false;
              }, 3000);
              return;
            }

            /////----- Get the ID ----- /////
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

                  clicked = false;
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

                  clicked = false;
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

                  clicked = false;
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

                  clicked = false;
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
                errMsg.textContent = message;
                item.closest('form').appendChild(errMsg);
                setTimeout(() => {
                  errMsg.textContent = '';
                  // Reset the form
                  item.closest('form').reset();

                  clicked = false;
                }, 3000);
                // Reset the form
                item.closest('form').reset();
                return;
              } else if (status === 400 && message) {
                location.assign('/error-page');
              } else {
                location.assign('/error-page');
              }
            }
          });
        });
      });

      // Check if we've reached the total number of pages and remove the listener
      if (currentPage === totalPage) {
        console.log(currentPage === totalPage);
        return;
      }

      window.scrollTo({
        top: document.scrollHeight,
        behavior: 'smooth',
      });
    }
    isLoading = false;
  } catch (err) {
    console.log(err);
    let netWrkErr = err.message;
    let status = err.response.data.status;
    let errMsg = 'Page does not exit';
    errMsg1 = err.response.data.message;

    if ((status === 404) & (errMsg1 === errMsg)) {
      clicked = false;
      return;
    } else if (netWrkErr === 'Network Error') {
      return;
    } else {
      isLoading = false;
      return;
      console.log(err);
    }
  }
});
