const cc = require('./utils/cc');
const config = require('./config');
const kraken = require('./exchanges/kraken');
const { privateConfig } = require('./configuration');

let botRunning = false;
let botIntervalID;
let balance = null;

const botLog = [];

const sell =  (amount, symbol, price, precision = privateConfig.defaultPrecision) => {
  console.log(amount);
  if (amount && parseFloat(amount).toFixed(3) > 0) {
    console.log(`I am going to sell ${symbol} for ${price}. Amount is ${amount}`);

    //Kraken uses XBT for BTC in tradeable pairs
    if (symbol === 'BTC') {
      symbol = 'XBT';
    }

    //Price precision needs to be fixed based on requirements from Kraken. For example> BTC precision must be 2.
    const sellPrice = Number(price).toFixed(precision) || price;

    if (privateConfig.environment === 'production') {
      kraken.placeOrder(`${symbol}EUR`, 'sell', 'market', sellPrice, amount).then((data) => {
          if (data.descr) {
            return data.descr;
          }
        })
        .catch(error => console.log(error));
    } else {
      console.log(`Selling ${symbol} by market price (${sellPrice}).`);
      botLog.push(`Selling ${symbol} by market price (${sellPrice}).`);
    }
  }
}

const run = () => {
  if(!botRunning) {
    //Bot should not run, it is stopped
    return false;
  }
  
  console.log('Running bot logic.');
  config.stoploss.assets.map((asset) => {
    const assetData = asset;
    cc.getPrice(asset.symbol, 'EUR', 'CCAGG').then((data) => {
        const price = data;
        if (price.EUR) {
          const isBelowTarget = price.EUR < assetData.target;
          if (isBelowTarget) {
            console.log(`${assetData.symbol} is below target.`);
            if (balance === null) {
              const balancePromise = kraken.getBalance();
              balancePromise.then((data) => {
                  sell(data[assetData.kraken], assetData.symbol, price.EUR, assetData.precision);
                })
                .catch(error => console.log(error));
            } else {
              sell(balance[assetData.kraken], assetData.symbol, price.EUR);
            }
          } else if ((Number(price.EUR).toFixed(2) * 1.05) < assetData.target) {
            //Notify user that we are close to target
          }

        } else {
          console.log(`Something went wrong. Cannot get price for ${asset.symbol}`);
        }
      })
      .catch(error => console.log(error));
  });
}

const start = () => {
  console.log('Bot has been started');
  botIntervalID = setInterval(() => run(), 20000);
  botRunning = true;
};

const stop = () => {
  console.log('Bot has been stopped');
  clearInterval(botIntervalID);
  botRunning = false;
};

const clearMessages = () => {
  botLog = [];
};

module.exports = {
  botLog,
  clearMessages,
  start,
  stop
};