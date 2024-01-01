let express = require('express');
let Services = require('./services');

let loginRoute = express.Router();
let UserRoute = express.Router();
let logoutRoute = express.Router();

let isAuthenticated;

loginRoute.get('/login', async (req, res) => {
  console.log(req.session);
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      let isAuthenticated = undefined;
      res.render('login', {
        isAuthenticated: isAuthenticated,
        cartQty,
      });
    } else {
      isAuthenticated = true;
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
});

UserRoute.post('/userLogin', async (req, res) => {
  let data = { ...req.body, ...req.session };
  let service = new Services();
  response = await service.userLogin(data);
  if (response.status === 404) {
    res.status(response.status).json(response);
  } else if (response.status === 400) {
    res.status(response.status).json(response);
  } else {
    req.session.loginToken = response.message.loginToken;
    req.session.user_id = response.message.getUser.id;
    req.session.cart = [];
    res.status(response.status).json(response);
  }
});

logoutRoute.get('/logout', async (req, res) => {
  req.sessionID = '';

  req.session.token = '';
  res.redirect('/');
});

module.exports = {
  loginRoute,
  UserRoute,
  logoutRoute,
};
