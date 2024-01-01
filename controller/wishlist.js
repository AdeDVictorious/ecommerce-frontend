let express = require('express');
let axios = require('axios');
let Services = require('./services');

let wishlistRoute = express.Router();
let addToWishlist = express.Router();

wishlistRoute.get('/wishlist', async (req, res) => {
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
      //// --- Get All item inside Wishlist --- ////
      let response = await axios.get(
        'http://localhost:8080/api/v1/wishlist/getAllWishlist',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let wishlistItem = response.data.data;

      isAuthenticated = true;
      res.render('wishlist', {
        isAuthenticated,
        wishlistItem,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err);
    let status = err.response.data.status;

    if (status === 404) {
      res.redirect('/error-page');
    } else {
      res.redirect('/error-page');
    }
  }
});

addToWishlist.post('/add-item-to-wishlist', async (req, res) => {
  let data1 = { ...req.body, ...req.session };
  let service = new Services();
  response = await service.addToWishlist(data1);
  res.status(response.status).json(response);
});

//// --- Route for deleting item inside the wishlist for authorized users ---- ////
wishlistRoute.get('/delete-wishlistItem/:id', async (req, res) => {
  try {
    let token = req.session.loginToken;
    let data = { ...req.params };

    ///// ---- Let get product by ID and delete ----- /////
    let responses = await axios.delete(
      `http://localhost:8080/api/v1/wishlist/deleteWishlist/${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );

    res.redirect('/wishlist');
  } catch (error) {
    console.log(error);
    res.redirect('/error-page');
  }
});

module.exports = { wishlistRoute, addToWishlist };
