const fs = require('fs');
const path = require('path');

const Store = require('electron-store');
const store = new Store();

const privateTemplate = {
  environment: 'development',
  defaultPrecision: 2,
  CCApiURL : 'https://min-api.cryptocompare.com/data/',
  APIKey: '',
  APISign: ''
};

const botTemplate = {
  "stoploss": {
    "enabled": true,
    "strategy": "stop-loss",
    "assets": []
  }
};

const PRIVATE = 'private';
const BOT = 'bot';

const getConfiguration = (key, template = '') => {
  if(store.get(key, false)) {
    return store.get(key, false);
  }

  store.set(key, template);
  return template;
}

const resetConfiguration = (key) => {
  store.delete(key);
  updateConfiguration(key, eval(`${key}Template`));
}

const updateConfiguration = (key, configuration) => {
  store.set(key, configuration);
}

const privateConfig = getConfiguration(PRIVATE, privateTemplate);
const botConfig = getConfiguration(BOT, botTemplate);

module.exports = {
  getConfiguration,
  privateConfig,
  botConfig,
  resetConfiguration,
  updateConfiguration,
  PRIVATE,
  BOT
};