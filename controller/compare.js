let express = require('express');

let axios = require('axios');

let compare = (app) => {
  app.get('/', async (req, res) => {
    try {
      // let response = await axios.get(
      //   'http://localhost:8080/api/v1/product/dashboard'
      // );
      // console.log(response.data);

      res.render('compare');
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = compare;
