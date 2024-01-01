let express = require('express');
let axios = require('axios');

let homeRoute = express.Router();

let isAuthenticated;

homeRoute.get('/', async (req, res) => {
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      //// ---- New product ---- /////
      let response = await axios.get(
        'http://localhost:8080/api/v1/product/dashboard?page=0',

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      //// ---- Best selling product ---- /////
      let resp = await axios.get(
        'http://localhost:8080/api/v1/product/bestSelling?page=0',

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      //// ---- varities product ---- /////
      let respon = await axios.get(
        'http://localhost:8080/api/v1/product/varities?page=0',

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let product = response.data.data.rows;
      let bestSelling = resp.data.data.rows;
      let varities = respon.data.data.rows;

      isAuthenticated = undefined;
      res.render('index', {
        isAuthenticated,
        product,
        bestSelling,
        varities,
        cartQty,
      });
    } else {
      //// ---- New Product ---- /////
      let response = await axios.get(
        'http://localhost:8080/api/v1/product/getAllProduct?page=0',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      //// ---- Best selling product ---- /////
      let respo = await axios.get(
        'http://localhost:8080/api/v1/product/getBestSelling?page=0',

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      //// ---- varities product ---- /////
      let respon = await axios.get(
        'http://localhost:8080/api/v1/product/getVarities?page=0',

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

      let product = response.data.data.rows;
      let bestSelling = respo.data.data.rows;
      let varities = respon.data.data.rows;

      req.session.cartQty = cartQty;
      req.session.save();

      isAuthenticated = true;
      res.render('index', {
        isAuthenticated,
        product,
        bestSelling,
        varities,
        cartQty,
      });
    }
  } catch (err) {
    res.redirect('/error-page');
  }
});

module.exports = { homeRoute };
