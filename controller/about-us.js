let express = require('express');
let axios = require('axios');

let aboutUsRoute = express.Router();

let isAuthenticated;

aboutUsRoute.get('/about-us', async (req, res) => {
  let sessionID = req.sessionID;
  let token = req.session.loginToken;
  let cartQty = req.session.cartQty;

  if (sessionID && !token) {
    isAuthenticated = undefined;
    res.render('about-us', { isAuthenticated: isAuthenticated, cartQty });
  } else {
    isAuthenticated = true;
    res.render('about-us', {
      isAuthenticated,
      cartQty,
    });
  }
});

module.exports = aboutUsRoute;
