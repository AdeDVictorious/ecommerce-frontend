let express = require('express');
let axios = require('axios');

let orderRoute = express.Router();

let isAuthenticated;

orderRoute.get('/order', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;

    if (!token && sessionID) {
      isAuthenticated = undefined;
      res.render('login', { isAuthenticated: isAuthenticated });
      return;
    } else {
      ///// ----- To get all Order  ---- /////
      let response = await axios.get(
        'http://localhost:8080/api/v1/order/getAllOrders',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      //// --- Get All item inside Cart --- ////
      let resp = await axios.get(
        'http://localhost:8080/api/v1/cart/getAllCart',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let cart = resp.data.data;
      let cartQty = cart.length;

      req.session.cartQty = cartQty;

      req.session.save();

      ///// ----- An Array of All Orders ----- /////
      let order = response.data.data.rows;

      isAuthenticated = true;

      res.render('order', {
        isAuthenticated,
        order,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err.response.data);

    res.redirect('/error-page');
  }
});

orderRoute.get('/getOrder/:id', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    let data = { ...req.params };

    if (!token && sessionID) {
      isAuthenticated = undefined;
      res.render('login', { isAuthenticated: isAuthenticated });
      return;
    } else {
      ///// ----- Get One Order By ID
      let response = await axios.get(
        `http://localhost:8080/api/v1/order/getOrder/${data.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      ///// ----- An Array of All Orders ----- /////
      let goodsOrder = response.data.result.goodsOrder;
      let id = response.data.result.id;
      let order = response.data.result;
      let address = order.address;
      let lga = response.data.location.lga;
      let state = response.data.location.state;
      let total_quantities = order.total_quantities;
      let sub_total = order.sub_total;
      let total_shippingFee = order.total_shippingFee;
      let grandTotal = order.grandTotal;
      let paymentStatus = order.paymentStatus;

      isAuthenticated = true;

      res.render('getOrder', {
        isAuthenticated,
        id,
        goodsOrder,
        order,
        address,
        address,
        lga,
        state,
        total_quantities,
        sub_total,
        total_shippingFee,
        grandTotal,
        paymentStatus,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err);

    res.redirect('/error-page');
  }
});

orderRoute.get('/getOrderPaymentStatus/:id', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;

    let data = { ...req.params };

    if (!token && sessionID) {
      isAuthenticated = undefined;
      res.render('login-register', { isAuthenticated: isAuthenticated });
      return;
    } else {
      ///// ----- verify the payment -----/////
      let resp = await axios.get(
        `http://localhost:8080/api/v1/order/paystack_verify/${data.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      req.session.orderID = '';
      req.session.save();

      res.redirect('/order');
    }
  } catch (err) {
    console.log(err.response.data);

    res.redirect('/error-page');
  }
});

module.exports = { orderRoute };
