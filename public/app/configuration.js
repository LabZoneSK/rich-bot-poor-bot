const fs = require('fs');
const path = require('path');

const Store = require('electron-store');
const store = new Store();

const templatePrivate = {
  environment: 'development',
  defaultPrecision: 2,
  CCApiURL : 'https://min-api.cryptocompare.com/data/',
  APIKey: '',
  APISign: ''
};

const templateConfig = {
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

const updateConfiguration = (key, configuration) => {
  store.set(key, configuration);
}

const privateConfig = getConfiguration(PRIVATE, templatePrivate);
const botConfig = getConfiguration(BOT, templateConfig);

module.exports = {
  getConfiguration,
  privateConfig,
  botConfig,
  updateConfiguration,
  PRIVATE,
  BOT
};