let express = require('express');
let axios = require('axios');
let Services = require('./services');

let singleProdRoute = express.Router();
let productRoute = express.Router();
let paginationRoute = express.Router();
let modalWrapperRoute = express.Router();
let searchRoute = express.Router();
let search_queryRoute = express.Router();

//// --- both for unauthorize and authorized users ---- ////
singleProdRoute.get('/product-preview/:id', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    let data = { ...req.params };

    if (!token && sessionID) {
      let response = await axios.get(
        `http://localhost:8080/api/v1/product/getPreview/${data.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let product = response.data.data;

      isAuthenticated = undefined;
      res.render('single-product', { isAuthenticated, product, cartQty });
    } else {
      ///// ----- TO get one product preview ----- /////
      let response = await axios.get(
        `http://localhost:8080/api/v1/product/getProduct/${data.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let product = response.data.data;

      isAuthenticated = true;
      res.render('single-product', {
        isAuthenticated,
        product,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err.response.data);
    isAuthenticated = undefined;
    res.render('404', { isAuthenticated: isAuthenticated });
  }
});

//// --- both for unauthorize and authorized users ---- ////
productRoute.get('/shop', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    if (!token && sessionID) {
      // ///// ----- All shopping/Product items ----- /////
      let response = await axios.get(
        'http://localhost:8080/api/v1/product/shopping?page=0',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let shopItem = response.data.data.rows;
      let itemLength = response.data.data.rows.length;
      let rowCount = response.data.data.count;
      let totalPage = response.data.totalPage;
      let page = response.data.pageNum;

      isAuthenticated = undefined;
      res.render('shop', {
        isAuthenticated,
        shopItem,
        itemLength,
        rowCount,
        page,
        totalPage,
        cartQty,
      });
    } else {
      // ///// ----- All shopping/Product items ----- /////
      let response = await axios.get(
        'http://localhost:8080/api/v1/product/shopping?page=0',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let shopItem = response.data.data.rows;
      let itemLength = response.data.data.rows.length;
      let rowCount = response.data.data.count;
      let totalPage = response.data.totalPage;
      let page = response.data.pageNum;

      isAuthenticated = true;
      res.render('shop', {
        isAuthenticated,
        shopItem,
        itemLength,
        rowCount,
        page,
        totalPage,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    isAuthenticated = undefined;
    res.render('404', { isAuthenticated: isAuthenticated });
  }
});

///// ----- Pagination of product/shop route ----- /////
paginationRoute.get('/shoppingGoods', async (req, res) => {
  let data1 = { ...req.query, ...req.session };
  let service = new Services();
  response = await service.getPages(data1);
  res.status(response.status).json(response);
});

//// --- both for unauthorize and authorized users ---- ////
searchRoute.get('/search_result', async (req, res) => {
  try {
    let sessionID = req.sessionID;
    let token = req.session.loginToken;
    let cartQty = req.session.cartQty;

    let data = req.session.query;
    if (!token && sessionID) {
      // // ///// ----- All shopping/Product items ----- /////
      let response = await axios.get(
        `http://localhost:8080/api/v1/product/search_query`,
        {
          params: {
            search_query: `${data.search}`,
          },
        }
      );

      let searchItem = response.data.data;
      let itemLength = response.data.dbCount;

      isAuthenticated = undefined;
      res.render('search_result', {
        isAuthenticated,
        searchItem,
        itemLength,
        cartQty,
      });
    } else {
      // // ///// ----- All shopping/Product items ----- /////
      let response = await axios.get(
        `http://localhost:8080/api/v1/product/search_query`,
        {
          params: {
            search_query: `${data.search}`,
          },
        }
      );

      let searchItem = response.data.data;
      let itemLength = response.data.dbCount;

      isAuthenticated = true;
      res.render('search_result', {
        isAuthenticated,
        searchItem,
        itemLength,
        cartQty,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    isAuthenticated = undefined;
    res.render('404', { isAuthenticated: isAuthenticated });
  }
});

search_queryRoute.get('/result', (req, res) => {
  let data1 = { ...req.query };
  req.session.query = data1;
  res.sendStatus(200);
});

///// --- To clear this later on --- /////
modalWrapperRoute.post('/sendReview', async (req, res) => {
  let data = { ...req.body, ...req.session };
  let service = new Services();
  response = await service.post_review(data);
  res.status(response.status).json(response);
});

module.exports = {
  productRoute,
  searchRoute,
  search_queryRoute,
  singleProdRoute,
  paginationRoute,
  modalWrapperRoute,
};
