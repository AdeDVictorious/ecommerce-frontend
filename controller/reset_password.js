let express = require('express');
let Services = require('./services');

let resetPwdRoute = express.Router();
let reset_pwdRoute = express.Router();

let isAuthenticated;

resetPwdRoute.get('/reset_password/:id', async (req, res) => {
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      let isAuthenticated = undefined;
      res.render('reset_password', {
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

reset_pwdRoute.post('/reset_pwd', async (req, res) => {
  let data = { ...req.body };
  let services = new Services();
  let resp = await services.reset_pwd(data);
  res.status(resp.status).json(resp);
});

module.exports = {
  resetPwdRoute,
  reset_pwdRoute,
};
