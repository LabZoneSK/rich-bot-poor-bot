const fs = require('fs');
const path = require('path');

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

const getConfiguration = (file, template = '') => {
  const filenameWithPath = path.join(__dirname, file);
  if(fs.existsSync(filenameWithPath)) {
    const configuration = JSON.parse(fs.readFileSync(filenameWithPath, 'utf8'));
    return configuration;
  }

  console.log(`Missing configuration file: ${filenameWithPath}. Creating new default configuration.`);
  fs.writeFileSync(filenameWithPath, JSON.stringify(template, null, 2) , 'utf-8');
  return template;
}

const privateConfig = getConfiguration('private.config.json', templatePrivate);
const botConfig = getConfiguration('config.json', templateConfig);

module.exports = {
  getConfiguration,
  privateConfig,
  botConfig
};