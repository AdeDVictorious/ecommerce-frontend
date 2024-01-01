let express = require('express');
let axios = require('axios');

let errorPageRoute = express.Router();

let isAuthenticated;

errorPageRoute.get('/error-page', async (req, res) => {
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      let isAuthenticated = undefined;
      res.render('404', { isAuthenticated: isAuthenticated, cartQty });
    } else {
      isAuthenticated = true;
      res.render('404', { isAuthenticated, cartQty });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = errorPageRoute;
