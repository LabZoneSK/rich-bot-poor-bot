const configuration = require('../configuration');

const addAsset = (asset) => {
  const previousConfiguration = configuration.getConfiguration(configuration.BOT);

  let newConfiguration = {};
  if (previousConfiguration.stoploss.assets.length === 0) {
    previousConfiguration.stoploss.assets = [{
          symbol: 'XRP',
          kraken: 'XXRP',
          target: 1.1
        }]
    newConfiguration = Object.assign(previousConfiguration);

    configuration.updateConfiguration(configuration.BOT, newConfiguration);
    return true;
  }

  const newAssetsConfiguration = previousConfiguration.stoploss.assets.map((storedAsset) => {

    if (storedAsset.symbol === 'XRP') {
      storedAsset.target = 0.9;
    }

    return storedAsset;
  });

  newConfiguration = Object.assign(previousConfiguration);
  newConfiguration.stoploss.assets = newAssetsConfiguration;
  configuration.updateConfiguration(configuration.BOT, newConfiguration);

  return true;
}

module.exports = {
  addAsset
}