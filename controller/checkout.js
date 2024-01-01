let express = require('express');
let axios = require('axios');
let Services = require('./services');

let checkoutRoute = express.Router();
let checkoutItemRoute = express.Router();

let isAuthenticated;

///// ----- this route handle the render page of the Frontend checkout page ----- /////
checkoutRoute.get('/checkout', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    let id = req.session.orderID;

    if (!token && sessionID) {
      let isAuthenticated = undefined;
      res.render('login', { isAuthenticated: isAuthenticated });
    } else if (token && !id) {
      ///// ----- Get Pending Order from Order Table Using UserID ----- /////
      let response = await axios.get(
        'http://localhost:8080/api/v1/order/getOrder',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let id = response.data.getOne.id;

      ///// ----- Get paystack URL using the OrderID ----- /////
      let resp = await axios.get(
        `http://localhost:8080/api/v1/payment/getOnePayment/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let user = response.data.userData;
      let locate = response.data.location;
      let address = response.data.getOne.address;
      let paystack_URL = resp.data.getpayment.paystackURL;
      let productID = response.data.getOne.id;
      let productOrder = response.data.getOne.goodsOrder;
      let total_quantities = response.data.getOne.total_quantities;
      let sub_total = response.data.getOne.sub_total;
      let grandTotal = response.data.getOne.grandTotal;
      let total_shippingFee = response.data.getOne.total_shippingFee;

      isAuthenticated = true;
      res.render('checkout', {
        isAuthenticated,
        user,
        locate,
        address,
        paystack_URL,
        productID,
        productOrder,
        total_quantities,
        total_shippingFee,
        sub_total,
        grandTotal,
        cartQty,
      });
    } else {
      ///// ----- Get Order from Order Table Using OrderID ----- /////
      let response = await axios.get(
        `http://localhost:8080/api/v1/order/getOrder/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      ///// ----- Get paystack URL using the OrderID ----- /////
      let resp = await axios.get(
        `http://localhost:8080/api/v1/payment/getOnePayment/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      // let status = response.data.status;
      let user = response.data.userData;
      let locate = response.data.location;
      let address = response.data.result.address;
      let paystack_URL = resp.data.getpayment.paystackURL;
      let productID = response.data.result.id;
      let productOrder = response.data.result.goodsOrder;
      let total_quantities = response.data.result.total_quantities;
      let sub_total = response.data.result.sub_total;
      let grandTotal = response.data.result.grandTotal;
      let total_shippingFee = response.data.result.total_shippingFee;

      isAuthenticated = true;
      res.render('checkout', {
        isAuthenticated,
        user,
        locate,
        address,
        paystack_URL,
        productID,
        productOrder,
        total_quantities,
        total_shippingFee,
        sub_total,
        grandTotal,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err.response);

    let errStatus = err.response.data.status;
    let errMgs = err.response.data.message;

    if (errMgs === 'Payment with ID not found') {
      res.redirect('/shopping-cart');
    } else if (errStatus === 404 && errMgs === 'Order with ID not found') {
      res.redirect('/shopping-cart');
    } else if (errStatus === 400) {
      res.redirect('/error-page');
    } else {
      res.redirect('/error-page');
    }
  }
});

// ///// ----- Example 1 -----/////
// ///// ----- this route handle the request from Frontend ----- /////
// checkoutItemRoute.post('/checkout-cart', async (req, res) => {
//   let data1 = { ...req.session, ...req.body };
//   let service = new Services();
//   let response = await service.checkout(data1);

//   if (response.status === 404) {
//     res.status(response.status).json(response);
//   } else if (response.status === 400) {
//     res.status(response.status).json(response);
//   } else {
//     req.session.orderID = response.dataValue;
//     res.status(response.status).json(response);
//   }
// });

///// ----- Example 2 -----/////
///// ----- this route handle the request from Frontend ----- /////
checkoutItemRoute.post('/checkout_cart', async (req, res) => {
  let data1 = { ...req.session, ...req.body };
  let service = new Services();
  let response = await service.checkout(data1);

  if (response.status === 404) {
    res.status(response.status).json(response);
  } else if (response.status === 400) {
    res.status(response.status).json(response);
  } else {
    req.session.orderID = response.dataValue;
    res.status(response.status).json(response);
  }
});

module.exports = {
  checkoutRoute,
  checkoutItemRoute,
};
