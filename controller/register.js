let express = require('express');
let Services = require('./services');

let newUserRoute = express.Router();

let isAuthenticated;

newUserRoute.get('/sign_up', async (req, res) => {
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      let isAuthenticated = undefined;
      res.render('register', {
        isAuthenticated: isAuthenticated,
        cartQty,
      });
    } else {
      isAuthenticated = true;
      res.render('index', { isAuthenticated: isAuthenticated });
    }
  } catch (error) {
    console.log(error);
  }
});

newUserRoute.post('/newUser', async (req, res) => {
  let data = { ...req.body, ...req.session };
  let service = new Services();
  response = await service.newUser(data);
  if (response.status === 404) {
    res.status(response.status).json(response);
  } else if (response.status === 400) {
    res.status(response.status).json(response);
  } else {
    req.session.loginToken = response.message.result.loginToken;
    req.session.user_id = response.message.result.userID;
    req.session.cart = [];
    res.status(response.status).json(response);
  }
});

module.exports = {
  newUserRoute,
};
