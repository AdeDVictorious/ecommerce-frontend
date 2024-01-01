let express = require('express');
let axios = require('axios');

let isAuthenticated;

let serviceRender = (app) => {
  app.get('/services', async (req, res) => {
    try {
      let session = req.sessionID;
      let token = req.session.loginToken;
      let cartQty = req.session.cartQty;

      if (!token && session) {
        isAuthenticated = undefined;
        res.render('services', { isAuthenticated: isAuthenticated, cartQty });
      } else {
        isAuthenticated = true;
        res.render('services', {
          isAuthenticated,
          cartQty,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = serviceRender;
