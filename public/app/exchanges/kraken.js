const KrakenClient = require('kraken-api');
const private = require('../private.config.js');

const kraken = new KrakenClient(private.APIKey, private.APISign, {
  timeout: process.env.Timeout || 50000,
});

const getBalance = () => {
  return new Promise((resolve, reject) => {
    kraken.api('Balance', null, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });
  });
};

const placeOrder = (pair, type, ordertype, price, volume) => {
  return new Promise((resolve, reject) => {
    const options = {
      pair,
      type,
      ordertype,
      price,
      volume,
    }
    kraken.api('AddOrder', options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });
  });
};

module.exports = {
  getBalance,
  placeOrder,
};
