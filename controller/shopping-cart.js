let express = require('express');
let axios = require('axios');
let Services = require('./services');

let shoppingCartRoute = express.Router();
let shopCartRoute = express.Router();
let addToCartRoute = express.Router();
let deleteCartItemRoute = express.Router();

let isAuthenticated;

// ///// ----- shorpping cart route ----- /////
shoppingCartRoute.get('/shopping-cart', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;

    if (!token && sessionID) {
      let cart = req.session.cart;

      if (!cart || undefined) {
        res.redirect('/');
        return;
      }

      let cartQty = cart.length;

      //// --- Get Location (State) display it inside Cart --- ////
      let resp = await axios.get(
        'http://localhost:8080/api/v1/location/pick-state',
        {
          headers: {
            'Content-Type': 'application/json',
            // authorization: `Bearer ${token}`,
          },
        }
      );

      // get the actual_totals & sum all the row together //
      let paralleTotal = [];

      for (let total of cart) {
        let actualTotal = total.actual_total;
        let actualTotals = Number(actualTotal);
        paralleTotal.push(actualTotals);
      }

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

      req.session.cartQty = cartQty;

      let statelist = resp.data.getAll;

      isAuthenticated = undefined;
      res.render('shopping-cart', {
        isAuthenticated,
        cart,
        columnSum,
        statelist,
        cartQty,
      });
    } else {
      //// --- Get All item inside Cart --- ////
      let response = await axios.get(
        'http://localhost:8080/api/v1/cart/getAllCart',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      //// --- Get Location (State) display it inside Cart --- ////
      let resp = await axios.get(
        'http://localhost:8080/api/v1/location/pick-state',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let cart = response.data.data;
      let cartQty = cart.length;

      // get the actual_totals & sum all the row together //
      let paralleTotal = [];

      for (let total of cart) {
        let actualTotal = total.actual_total;
        let actualTotals = Number(actualTotal);
        paralleTotal.push(actualTotals);
      }
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

      req.session.columnSum = columnSum;
      req.session.cartQty = cartQty;

      let statelist = resp.data.getAll;

      isAuthenticated = true;
      res.render('shopping-cart', {
        isAuthenticated,
        cart,
        columnSum,
        statelist,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response);

    if (err === undefined) {
      res.redirect('/');
      return;
    }

    let status = err.response.data.data.status;
    let message = err.response.data.message;

    // if (err === undefined) {
    //   res.redirect('/');
    // }

    ///----- Still having Issues here -----/////
    if (status === 404 && message) {
      isAuthenticated = undefined;
      res.render('404', {
        isAuthenticated,
        cart,
        statelist,
        columnSum,
        cartQty,
      });
    } else if (status === 400) {
      isAuthenticated = true;
      res.render('404', { isAuthenticated: isAuthenticated });
    }
  }
});

// --- for unauthorized & authorized user only --- //
addToCartRoute.post('/add-item-to-cart', async (req, res) => {
  let token = req.session.loginToken;

  if (!token) {
    ///// ---- for unauthorize users ----- /////
    //// --- Initialize the cart as an empty array if it doesn't exist --- /////
    req.session.cart = req.session.cart || [];
    let data = { ...req.body };

    let qtyValue = 1;
    let quantity = Number(qtyValue);
    let total = quantity * data.price;

    // Check if the product already exists in the cart
    const existingProductIndex = req.session.cart.findIndex(
      (item) => item.id === data.Product_TableId
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, update the quantity and total
      const existingProduct = req.session.cart[existingProductIndex];
      existingProduct.quantity += 1;
      existingProduct.actual_total =
        existingProduct.quantity * existingProduct.price;

      res.sendStatus(200);
    } else {
      // If the product doesn't exist, add it to the cart
      let product = {
        id: data.Product_TableId,
        Product_TableId: data.Product_TableId,
        name: data.name,
        image: data.image,
        price: data.price,
        quantity: quantity,
        actual_total: total,
      };

      req.session.cart.push(product); // Add the product to the cart array
      req.session.save(); // Save the session

      // Get the length of the cart after adding the new product
      const cartLength = req.session.cart.length;
      res.status(201).json({ cartLength }); // Return the cart length in response
    }
  } else {
    ///// ---- for authorize users ----- /////
    let data1 = { ...req.body, ...req.session };
    let service = new Services();
    let response = await service.addToCart(data1);

    if (response.status === 201) {
      req.session.cartQty = response.message.cart_length;
      req.session.save();
      res.status(response.status).json(response);
    } else {
      res.status(response.status).json(response);
    }
  }
});

// --- for unauthorized & authorized user only --- //
addToCartRoute.post('/addQtyCart', async (req, res) => {
  let token = req.session.loginToken;

  if (!token) {
    ///// ---- for unauthorize users ----- /////
    //// --- Initialize the cart as an empty array if it doesn't exist --- /////
    req.session.cart = req.session.cart || [];

    let data = { ...req.body };

    let qtyValue = data.quantity;
    let quantity = Number(qtyValue) || 1;
    let total = quantity * data.price;

    // Check if the product already exists in the cart
    const existingProductIndex = req.session.cart.findIndex(
      (item) => item.id === data.Product_TableId
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, update the quantity and total
      const existingProduct = req.session.cart[existingProductIndex];
      existingProduct.quantity += quantity;
      existingProduct.actual_total =
        existingProduct.quantity * existingProduct.price;

      req.session.save();

      res.sendStatus(200);
    } else {
      // If the product doesn't exist, add it to the cart
      let product = {
        id: data.Product_TableId,
        Product_TableId: data.Product_TableId,
        name: data.name,
        image: data.image,
        price: data.price,
        quantity: quantity,
        actual_total: total,
      };

      req.session.cart.push(product); // Add the product to the cart array
      req.session.save(); // Save the session

      // Get the length of the cart after adding the new product
      const cartLength = req.session.cart.length;
      res.status(201).json({ cartLength }); // Return the cart length in response
    }
  } else {
    ///// ---- for authorize users ----- /////
    let data1 = { ...req.body, ...req.session };
    let service = new Services();
    response = await service.addQtyCart(data1);

    if (response.status === 201) {
      req.session.cartQty = response.message.cart_length;
      req.session.save();
      res.status(response.status).json(response);
    } else {
      res.status(response.status).json(response);
    }
  }
});

// --- for unauthorized & authorized user only --- //
addToCartRoute.post('/reduce_cartQty', async (req, res) => {
  let token = req.session.loginToken;

  if (!token) {
    ///// ---- for unauthorize users ----- /////
    //// --- Initialize the cart as an empty array if it doesn't exist --- /////
    req.session.cart = req.session.cart || [];

    let data = { ...req.body };

    let qtyValue = data.quantity;
    let quantity = Number(qtyValue) || 1;
    let total = quantity * data.price;

    // Check if the product already exists in the cart
    const existingProductIndex = req.session.cart.findIndex(
      (item) => item.id === data.Product_TableId
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, update the quantity and total
      const existingProduct = req.session.cart[existingProductIndex];
      existingProduct.quantity -= quantity;
      existingProduct.actual_total =
        existingProduct.quantity * existingProduct.price;

      req.session.save();

      res.sendStatus(200);
    }
  } else {
    ///// ---- for authorize users ----- /////
    let data1 = { ...req.body, ...req.session };
    let service = new Services();
    response = await service.reduce_cartQty(data1);
    res.status(response.status).json(response);
  }
});

// // --- deleting item in cart for unauthorized & authorized users  --- //
// wishItemRoute.post('/add-item-to-wishlist', async (req, res) => {
//   // console.log(req, req.body, req.session, 'Here at req');
//   let data1 = { ...req.body, ...req.session };
//   let service = new Services();
//   response = await service.addToWishlist(data1);
//   res.status(response.status).json(response);
// });

//// --- for authorized users ---- ////
deleteCartItemRoute.get('/delete-product/:id', async (req, res) => {
  try {
    let token = req.session.loginToken;
    let data = { ...req.params };

    if (!token) {
      ///// ---- for unauthorize users ----- /////
      let carts = req.session.cart;

      // Filter out the item with the specified id
      req.session.cart = carts.filter((item) => item.id !== data.id);

      res.redirect('/shopping-cart');
    } else {
      ///// ---- for authorize users ----- /////
      ///// ---- Let get product by ID and delete ----- /////
      let responses = await axios.delete(
        `http://localhost:8080/api/v1/cart/deleteCart/${data.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      res.redirect('/shopping-cart');
    }
  } catch (error) {
    res.redirect('/error-page');
  }
});

//// --- for unauthorized & authorized users ---- ////
shopCartRoute.get('/chosen-state/:id', async (req, res) => {
  let data1 = { ...req.params, ...req.session };
  let service = new Services();
  response = await service.pickLGA(data1);
  res.status(response.status).json(response);
});

///// ----- example 2 ----- /////
///// --- for authorized users ---- ////
shopCartRoute.get('/get_delivery', async (req, res) => {
  let data1 = { ...req.query, ...req.session };
  let service = new Services();
  response = await service.get_delivery(data1);
  res.status(response.status).json(response);
});

module.exports = {
  shoppingCartRoute,
  shopCartRoute,
  addToCartRoute,
  deleteCartItemRoute,
};
