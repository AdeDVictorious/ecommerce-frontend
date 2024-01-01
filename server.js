const express = require('express');
let ejs = require('ejs');
let cors = require('cors');
let dotenv = require('dotenv');
let session = require('express-session');
const sqlite = require('better-sqlite3');

const SqliteStore = require('better-sqlite3-session-store')(session);
const db = new sqlite('sessions.db');

let app = express();

dotenv.config({ path: 'config.env' });

app.use(cors());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    store: new SqliteStore({
      client: db,
      expired: {
        clear: true,
        intervalMs: 1000 * 60 * 60, //ms = 15min
      },
    }),
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: false,
    },
  })
);

let { homeRoute } = require('./controller/home');
let serviceRender = require('./controller/servicesRender');

let { loginRoute, UserRoute, logoutRoute } = require('./controller/login');
let { newUserRoute } = require('./controller/register');

let {
  forgetPwdRoute,
  forget_pwdRoute,
} = require('./controller/forget_password');

let { resetPwdRoute, reset_pwdRoute } = require('./controller/reset_password');

let profileRoute = require('./controller/my-profile');

let {
  productRoute,
  searchRoute,
  search_queryRoute,
  singleProdRoute,
  paginationRoute,
  modalWrapperRoute,
} = require('./controller/product');

let {
  shoppingCartRoute,
  addToCartRoute,
  deleteCartItemRoute,
  shopCartRoute,
} = require('./controller/shopping-cart');

let { checkoutRoute, checkoutItemRoute } = require('./controller/checkout');

let { contactRoute, contactUsRoute } = require('./controller/contact');
let aboutUsRoute = require('./controller/about-us');
const { orderRoute } = require('./controller/order');
const galleryRoute = require('./controller/gallery');

let { wishlistRoute, addToWishlist } = require('./controller/wishlist');

let errorPageRoute = require('./controller/404');

app.use(homeRoute);
app.use(loginRoute);
app.use(newUserRoute);
app.use(forgetPwdRoute);
app.use(resetPwdRoute);
app.use(
  '/api/v1',
  newUserRoute,
  UserRoute,
  logoutRoute,
  forget_pwdRoute,
  reset_pwdRoute
);
app.use(profileRoute);
app.use(productRoute);
app.use(singleProdRoute);
app.use(deleteCartItemRoute);

app.use(
  '/api/v1',
  addToCartRoute,
  shopCartRoute,
  search_queryRoute,
  addToWishlist,
  paginationRoute,
  contactUsRoute,
  modalWrapperRoute
);

// app.use(paginationRoute);
app.use(shoppingCartRoute);
app.use('/api/v1', checkoutItemRoute);
app.use(searchRoute);
app.use(checkoutRoute);
app.use(aboutUsRoute);
app.use(logoutRoute);
app.use(wishlistRoute);
app.use(contactRoute);
app.use(orderRoute);
app.use(galleryRoute);
serviceRender(app);
app.use(errorPageRoute);

let PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
  if (err) {
    console.log('Server failed to start');
  } else {
    console.log('app is running on port:', PORT);
  }
});
