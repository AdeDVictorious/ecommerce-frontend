let axios = require('axios');

class Services {
  // --- Route to create a new user only --- //
  async newUser(data) {
    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/signup',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let status = response.data.status;

      if (status == 201) {
        return { status: 201, message: response.data };
      }
    } catch (err) {
      console.log(err);
      return { status: 400, message: err.response.data.message };
    }
  }

  // --- Route to Login & Authorized user only --- //
  async userLogin(data) {
    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let status = response.data.status;

      if (status == 200) {
        return { status: 200, message: response.data };
      }
    } catch (err) {
      console.log(err.response.data);

      return { status: 404, message: err.response.data.message };
    }
  }

  // --- Route for forget & send reset password link --- //
  async forget_pwd(data) {
    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/forgetPassword',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let status = response.data.status;

      if (status === 201) {
        return { status: 200, message: response.data };
      }
    } catch (err) {
      console.log(err);

      return { status: 404, message: err.response.data.message };
    }
  }

  // --- Route to Reset user password --- //
  async reset_pwd(data) {
    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/resetPassword',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let status = response.data.status;

      if (status === 200) {
        return { status: 200, message: response.data };
      }
    } catch (err) {
      console.log(err);

      return { status: 404, message: err.response.data.message };
    }
  }

  // // --- Route to add to cart for Authorized user only e.g 1 --- //
  // async addToCart(data1) {
  // let token = data1.loginToken;

  // if (!token) {
  //   return { status: 404, message: 'invalid login token' };
  // }

  //   let data = {
  //     product_TableId: data1.product_TableId,
  //   };

  //   try {
  //     let response = await axios.post(
  //       'http://localhost:8080/api/v1/cart/addToCart',
  //       data,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.data.status == 200) {
  //       return { status: 200, message: response.data };
  //     } else if (response.data.status == 201) {
  //       return { status: 200, message: response.data };
  //     }
  //   } catch (err) {
  //     console.log(err.response.data);

  //     return { status: 400, message: err.response.data.message };
  //   }
  // }

  // --- Route to add to cart for Authorized user only e.g 2 --- //
  async addToCart(data1) {
    let data = {
      product_TableId: data1.Product_TableId,
    };

    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/cart/addToCart',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${data1.loginToken}`,
          },
        }
      );

      if (response.data.status === 200) {
        return { status: 200, message: response.data };
      } else if (response.data.status === 201) {
        return { status: 201, message: response.data };
      }
    } catch (err) {
      console.log(err.response);

      return { status: 400, message: err.response.data.message };
    }
  }

  // --- Route to add Qty for Authorized user only --- //
  async addQtyCart(data1) {
    let token = data1.loginToken;

    let data = {
      product_TableId: data1.Product_TableId,
      quantity: data1.quantity,
    };

    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/cart/add-quantity-to-cart',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == 200) {
        return { status: 200, message: response.data };
      } else if (response.data.status == 201) {
        return { status: 201, message: response.data };
      }
    } catch (err) {
      console.log(err.response.data);

      return { status: 404, message: err.response.data.message };
    }
  }

  // --- Route to add to reduce_cartQty for Authorized user only e.g 2 --- //
  async reduce_cartQty(data1) {
    let data = {
      product_TableId: data1.Product_TableId,
    };

    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/cart/substract_cartQty',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${data1.loginToken}`,
          },
        }
      );

      if (response.data.status === 200) {
        return { status: 200, message: response.data };
      } else if (response.data.status === 201) {
        return { status: 201, message: response.data };
      }
    } catch (err) {
      console.log(err.response);

      return { status: 400, message: err.response.data.message };
    }
  }

  ///// --- Route to add to wishlist for users only  --- /////
  async addToWishlist(data1) {
    let token = data1.loginToken;

    if (!token) {
      return { status: 404, message: 'invalid login token' };
    }

    let data = {
      product_TableId: data1.product_TableId,
    };

    try {
      let response = await axios.post(
        'http://localhost:8080/api/v1/wishlist/addToWishlist',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.status == 200) {
        return { status: 200, message: response.data };
      } else if (response.data.status == 201) {
        return { status: 200, message: response.data };
      }
    } catch (err) {
      console.log(err.response.data);

      return { status: 400, message: err.response.data.message };
    }
  }

  ///// ----- Route to pick LGA ----- ////
  async getPages(data1) {
    try {
      let pageFig = Number(data1.page);

      let response = await axios.get(
        `http://localhost:8080/api/v1/product/shopping_page`,
        {
          params: {
            page: `${pageFig}`,
          },
        }
      );

      return {
        status: 200,
        message: 'page found successfully',
        data: response.data,
      };
    } catch (err) {
      console.log(err.response.data);

      return { status: 404, message: err.response.data.message };
    }
  }

  ///// ----- Route to pick LGA ----- ////
  async pickLGA(data1) {
    let token = data1.loginToken;

    // if (!token) {
    //   return { status: 404, message: 'invalid login token' };
    // }

    let data = { id: data1.id };

    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/location/get_stateLGA/${data.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let status = response.data.status;
      if (status == 200) {
        return { status: 200, message: response.data.getAll };
      }
    } catch (err) {
      console.log(err.response.data);

      return { status: 400, message: err.response.data.message };
    }
  }

  ///// ----- Route to get delivery fee LGA selected ----- ////
  async get_delivery(data1) {
    try {
      let token = data1.loginToken;

      if (!token) {
        return { status: 404, message: 'invalid login token' };
      }

      let response = await axios.get(
        `http://localhost:8080/api/v1/cart/get_delivery_fee/${data1.locationId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let status = response.data.status;

      if (status === 200) {
        return { status: 200, message: response.data };
      }
    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.data, 'Am with this value');

      return { status: 400, message: err.response.data };
    }
  }

  // ///// ----- Example 1 ----- /////
  // ///// ----- Route to Checkout order ----- ////
  // async checkout(data1, data2) {
  //   try {
  //     let token = data1.loginToken;
  //     let locationId = data1.locationId;
  //     let address = data1.address;

  //     if (!token) {
  //       return { status: 404, message: 'invalid login token' };
  //     }

  //     let data = { locationId: locationId, address: address };

  //     let response = await axios.post(
  //       'http://localhost:8080/api/v1/order/addOrder',
  //       data,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     let orderID = response.data.result.data1.id;

  //     return {
  //       status: 201,
  //       message: 'Carts was posted successfully',
  //       dataValue: orderID,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       status: 400,
  //       message: 'Error posting Cart to Order table',
  //     };
  //   }
  // }

  ///// ----- Example 2 ----- /////
  ///// ----- Route to Checkout order ----- ////
  async checkout(data1) {
    try {
      let token = data1.loginToken;
      let locationId = data1.locationId;
      let sub_total = data1.sub_total;
      let total_shippingFee = data1.total_shippingFee;
      let grand_total = data1.grand_total;
      let address = data1.address;

      if (!token) {
        return { status: 404, message: 'invalid login token' };
      }

      let data = {
        sub_total: sub_total,
        total_shippingFee: total_shippingFee,
        grand_total: grand_total,
        locationId: locationId,
        address: address,
      };

      let response = await axios.post(
        'http://localhost:8080/api/v1/order/add_Order',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let orderID = response.data.result.data1.id;

      return {
        status: 201,
        message: 'Carts was posted successfully',
        dataValue: orderID,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: 'Error posting Cart to Order table',
      };
    }
  }

  ///// ----- Route to Checkout order ----- ////
  async checkPayment(data1, data2) {
    try {
      let token = data1.loginToken;

      if (!token) {
        return { status: 404, message: 'invalid login token' };
      }

      let data = data2;

      // let response = await axios.post(
      //   'https://j611903z-8080.uks1.devtunnels.ms/paystack_hook',
      //   data,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      console.log(response.data);

      return {
        status: 201,
        message: 'Carts was posted successfully',
        dataValue: orderID,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: 'Error posting Cart to Order table',
      };
    }
  }

  ////// --- Route to Modala preview a product for Authorized user only --- /////
  async post_review(data1) {
    try {
      let token = data1.loginToken;

      if (!token) {
        return { status: 404, message: 'invalid login token' };
      }

      let data = {
        custName: data1.custName,
        custEmail: data1.custEmail,
        custRating: data1.custRating,
        custMessage: data1.custMessage,
        product_ID: data1.product_ID,
      };

      let response = await axios.post(
        `http://localhost:8080/api/v1/product/post_review`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      let review = response.data;

      return { status: 200, message: 'review was sent successfully', review };
    } catch (err) {
      console.log(err);

      return { status: 404, message: err.response.data };
    }
  }

  ///// ----- Route to post a ContactUS Message ---- ////
  async postMessage(data1) {
    try {
      let token = data1.loginToken;

      if (token === undefined) {
        ////Send data to the server
        let data = {
          custName: data1.custName,
          custEmail: data1.custEmail,
          custSubject: data1.custSubject,
          custMessage: data1.custMessage,
        };

        let response = await axios.post(
          'http://localhost:8080/api/v1/addMessage',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        return {
          status: 201,
          message: 'Message posted successfully',
          data: response.data,
        };
      } else {
        let token = data1.loginToken;

        ////Send data to the server
        let data = {
          custName: data1.custName,
          custEmail: data1.custEmail,
          custSubject: data1.custSubject,
          custMessage: data1.custMessage,
        };

        let response = await axios.post(
          `http://localhost:8080/api/v1/contactUs`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          }
        );

        return {
          status: 201,
          message: 'posted Successfully',
          data: response.data,
        };
      }
    } catch (err) {
      console.log(err.response.data);

      return { status: 400, message: err.response.data.message };
    }
  }
}

module.exports = Services;
