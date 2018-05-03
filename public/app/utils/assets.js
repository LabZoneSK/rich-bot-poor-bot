const configuration = require('../configuration');

const updateAsset = (asset) => {
  const previousConfiguration = configuration.getConfiguration(configuration.BOT);

  let newConfiguration = {};
  if (previousConfiguration.stoploss.assets.length === 0) {
    previousConfiguration.stoploss.assets = [{
      symbol: asset.symbol,
      kraken: asset.kraken,
      target: asset.target
    }]
    newConfiguration = Object.assign(previousConfiguration);

    configuration.updateConfiguration(configuration.BOT, newConfiguration);
    return true;
  }

  const newAssetsConfiguration = previousConfiguration.stoploss.assets.map((storedAsset) => {

    if (storedAsset.symbol === asset.symbol) {
      storedAsset.target = asset.target;
    }

    return storedAsset;
  });

  newConfiguration = Object.assign(previousConfiguration);
  newConfiguration.stoploss.assets = newAssetsConfiguration;
  configuration.updateConfiguration(configuration.BOT, newConfiguration);

  return true;
}

const addAsset = (asset) => {
  const previousConfiguration = configuration.getConfiguration(configuration.BOT);

  let newConfiguration = {};
  if (previousConfiguration.stoploss.assets.length === 0) {
    previousConfiguration.stoploss.assets = [{
      symbol: asset.symbol,
      kraken: asset.kraken,
      target: asset.target
    }]
    newConfiguration = Object.assign(previousConfiguration);

    configuration.updateConfiguration(configuration.BOT, newConfiguration);
    return true;
  }

  previousConfiguration.stoploss.assets.push({
    symbol: asset.symbol,
    kraken: asset.kraken,
    target: asset.target
  });

  const newAssetsConfiguration = previousConfiguration.stoploss.assets;

  newConfiguration = Object.assign(previousConfiguration);
  newConfiguration.stoploss.assets = newAssetsConfiguration;

  configuration.updateConfiguration(configuration.BOT, newConfiguration);

  return true;
}

const deleteAsset = (asset) => {
  const previousConfiguration = configuration.getConfiguration(configuration.BOT);

  let newConfiguration = {};
  if (previousConfiguration.stoploss.assets.length === 0) {
    return false
  }

  const newAssetsConfiguration = previousConfiguration.stoploss.assets.filter((storedAsset) => {

    if (storedAsset.symbol === asset.symbol) {
      return false;
    }

    return true;
  });

  newConfiguration = Object.assign(previousConfiguration);
  newConfiguration.stoploss.assets = newAssetsConfiguration;

  configuration.updateConfiguration(configuration.BOT, newConfiguration);

  return true;
}

const getAssets = () => {
  return configuration.getConfiguration(configuration.BOT).stoploss.assets;
};

module.exports = {
  addAsset,
  updateAsset,
  deleteAsset,
  getAssets
}