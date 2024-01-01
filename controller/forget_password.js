let express = require('express');
let Services = require('./services');

let forgetPwdRoute = express.Router();
let forget_pwdRoute = express.Router();

let isAuthenticated;

forgetPwdRoute.get('/forget_password', async (req, res) => {
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      let isAuthenticated = undefined;
      res.render('forget_password', {
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

forget_pwdRoute.post('/forget_pwd', async (req, res) => {
  let data = { ...req.body };
  let services = new Services();
  let resp = await services.forget_pwd(data);
  res.status(resp.status).json(resp);
});

module.exports = {
  forgetPwdRoute,
  forget_pwdRoute,
};
