let express = require('express');
let axios = require('axios');

let profileRoute = express.Router();

let isAuthenticated;

profileRoute.get('/my-profile', async (req, res) => {
  try {
    let session = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && session) {
      isAuthenticated = undefined;
      res.render('login', {
        isAuthenticated: isAuthenticated,
        cartQty,
      });
      return;
    } else {
      let response = await axios.get('http://localhost:8080/api/v1/myProfile', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      let profile = response.data.user;

      isAuthenticated = true;

      res.render('my-profile', {
        isAuthenticated,
        profile,
        cartQty,
      });
    }
  } catch (error) {
    console.log(error);
    isAuthenticated = true;
    res.render('error-page', { isAuthenticated: isAuthenticated });
  }
});

module.exports = profileRoute;
