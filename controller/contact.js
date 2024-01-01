let express = require('express');
let axios = require('axios');
let Services = require('./services');

let contactRoute = express.Router();
let contactUsRoute = express.Router();

let isAuthenticated;

contactRoute.get('/contact', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && sessionID) {
      let isAuthenticated = undefined;
      res.render('contact', { isAuthenticated: isAuthenticated, cartQty });
    } else {
      isAuthenticated = true;

      res.render('contact', {
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

///// ---- Post a ContactUs Message ----- /////
//// --- for authorized users ---- ////
contactUsRoute.post('/sendUsAMessage', async (req, res) => {
  let data1 = { ...req.body, ...req.session };
  let service = new Services();
  response = await service.postMessage(data1);
  res.status(response.status).json(response);
});

module.exports = { contactRoute, contactUsRoute };
