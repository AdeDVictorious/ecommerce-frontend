let express = require('express');
let axios = require('axios');

let galleryRoute = express.Router();

let isAuthenticated;

galleryRoute.get('/gallery', async (req, res) => {
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      isAuthenticated = undefined;
      res.render('gallery', { isAuthenticated: isAuthenticated, cartQty });
      return;
    } else {
      isAuthenticated = true;

      res.render('gallery', {
        isAuthenticated,
        cartQty,
      });
    }
  } catch (error) {
    console.log(error);
    isAuthenticated = true;
    res.render('error-page', { isAuthenticated: isAuthenticated });
  }
});

module.exports = galleryRoute;
